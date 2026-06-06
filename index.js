require('dotenv').config();
const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const commands = require('./commands');
const menu = require('./menu');
const adminPanel = require('./admin-panel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(adminPanel); // Mount admin panel routes

// Bot Configuration
const BOT_NAME = process.env.BOT_NAME || 'SIMON';
const BOT_PREFIX = process.env.BOT_PREFIX || '.';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '2349166265317';

let sock;
let botStartTime = Date.now();
let qrCode = null;
let isConnected = false;
let stats = {
  messages: 0,
  users: new Set(),
  groups: new Set(),
  commands: 0,
  errors: 0
};

console.log(chalk.cyan(`
╔══❖ SIMON TECH ❖══╗
┃ 🤖 Bot Name: ${BOT_NAME}
┃ 📞 Owner: ${OWNER_NUMBER}
┃ ⚙️  Prefix: ${BOT_PREFIX}
╚══════════════════╝
`));

// Ensure sessions directory exists
const sessionsDir = path.join(__dirname, 'sessions');
if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir, { recursive: true });
}

// Initialize Bot
async function initBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(sessionsDir, 'SIMON'));

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Handle QR Code
      if (qr) {
        qrCode = qr;
        console.log(chalk.yellow('📱 Scan QR code to connect:'));
        try {
          const qrImage = await QRCode.toDataURL(qr);
          console.log(chalk.green('✅ QR Code generated for web interface'));
        } catch (err) {
          console.error(chalk.red('Error generating QR code:'), err.message);
        }
      }

      if (connection === 'open') {
        console.log(chalk.green('✅ Bot Connected to WhatsApp!'));
        console.log(chalk.green('✅ Bot is ready to receive messages'));
        botStartTime = Date.now();
        isConnected = true;
        qrCode = null;
      }

      if (connection === 'close') {
        isConnected = false;
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          console.log(chalk.yellow('🔄 Reconnecting...'));
          setTimeout(initBot, 3000);
        } else {
          console.log(chalk.red('❌ Bot logged out'));
        }
      }
    });

    // Handle incoming messages
    sock.ev.on('messages.upsert', async (m) => {
      const message = m.messages[0];
      if (!message.message) return;

      const text = message.message.conversation || message.message.extendedTextMessage?.text || '';
      const sender = message.key.remoteJid;
      const isGroup = sender.includes('@g.us');

      // Update stats
      stats.messages++;
      if (isGroup) {
        stats.groups.add(sender);
      } else {
        stats.users.add(sender);
      }

      console.log(chalk.blue(`📨 Message from ${sender}: ${text}`));

      // Command handling
      if (text.startsWith(BOT_PREFIX)) {
        const cmd = text.slice(BOT_PREFIX.length).split(' ')[0].toLowerCase();
        const args = text.slice(BOT_PREFIX.length + cmd.length).trim().split(' ');

        stats.commands++;

        try {
          // Handle menu command
          if (cmd === 'menu' || cmd === 'help') {
            await sock.sendMessage(sender, { text: menu });
          }
          // Handle ping command
          else if (cmd === 'ping' || cmd === 'p') {
            const delay = Date.now() - (message.messageTimestamp * 1000);
            await sock.sendMessage(sender, { text: `🏓 Pong! (${delay}ms)` });
          }
          // Handle alive command
          else if (cmd === 'alive' || cmd === 'bot' || cmd === 'check') {
            const uptime = Math.floor((Date.now() - botStartTime) / 1000);
            const uptimeText = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;
            await sock.sendMessage(sender, {
              text: `🤖 Bot is alive!\n⏱️ Uptime: ${uptimeText}\n👑 Owner: ${OWNER_NUMBER}`
            });
          }
          // Handle uptime command
          else if (cmd === 'uptime') {
            const uptime = Math.floor((Date.now() - botStartTime) / 1000);
            const uptimeText = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;
            await sock.sendMessage(sender, { text: `⏱️ Bot Uptime: ${uptimeText}` });
          }
          // Handle owner command
          else if (cmd === 'owner') {
            await sock.sendMessage(sender, {
              text: `👑 Bot Owner: ${OWNER_NUMBER}\n🤖 Bot Name: ${BOT_NAME}\n📱 Platform: WhatsApp`
            });
          }
          // Default response
          else {
            await sock.sendMessage(sender, {
              text: `❓ Command not implemented yet.\nType ${BOT_PREFIX}menu to see all commands.`
            });
          }
        } catch (error) {
          stats.errors++;
          console.error(chalk.red('Command error:'), error);
        }
      }
    });

    sock.ev.on('creds.update', saveCreds);

  } catch (error) {
    console.error(chalk.red('Error initializing bot:'), error);
  }
}

// Web Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${BOT_NAME} - WhatsApp Bot</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 600px;
          width: 100%;
          padding: 40px;
          text-align: center;
        }
        h1 { color: #333; margin-bottom: 10px; font-size: 28px; }
        .subtitle { color: #666; margin-bottom: 20px; font-size: 14px; }
        .status { 
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          font-weight: bold;
          font-size: 16px;
        }
        .status.online {
          background: #d4edda;
          color: #155724;
        }
        .status.offline {
          background: #f8d7da;
          color: #721c24;
        }
        .info {
          background: #e7f3ff;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 14px;
          color: #004085;
          border-left: 4px solid #004085;
          text-align: left;
        }
        .button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin: 10px 5px;
          transition: transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .button:hover { transform: translateY(-2px); }
        .button-secondary {
          background: #17a2b8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🤖 ${BOT_NAME}</h1>
        <p class="subtitle">WhatsApp Bot v2.0</p>
        
        <div id="statusDiv" class="status online">✅ Bot is Online and Running</div>
        
        <div class="info">
          <strong>📱 Features:</strong><br>
          • 200+ Commands<br>
          • AI System<br>
          • Game System<br>
          • Economy System<br>
          • Media Tools<br>
          • And Much More!
        </div>
        
        <a href="/panel" class="button button-secondary">📊 Admin Panel</a>
        <a href="https://github.com/simontech-maxb/SIMON-TECH-Bot2" class="button" target="_blank">
          📚 View on GitHub
        </a>
      </div>
    </body>
    </html>
  `);
});

app.get('/status', async (req, res) => {
  const uptime = Math.floor((Date.now() - botStartTime) / 1000);
  
  let qrCodeData = null;
  if (qrCode) {
    try {
      qrCodeData = await QRCode.toDataURL(qrCode);
    } catch (err) {
      console.error('Error generating QR code:', err.message);
    }
  }

  res.json({
    status: isConnected ? 'online' : 'offline',
    connected: isConnected,
    bot_name: BOT_NAME,
    owner: OWNER_NUMBER,
    uptime: uptime,
    version: '2.0.0',
    qrCode: qrCodeData,
    stats: {
      messages: stats.messages,
      users: stats.users.size,
      groups: stats.groups.size,
      commands: stats.commands,
      errors: stats.errors
    }
  });
});

// Start Server and Bot
app.listen(PORT, () => {
  console.log(chalk.cyan(`\n🚀 Server running on http://localhost:${PORT}`));
  console.log(chalk.magenta(`📊 Admin Panel: http://localhost:${PORT}/panel`));
  console.log(chalk.yellow(`📞 Owner: ${OWNER_NUMBER}`));
  console.log(chalk.yellow(`⚙️  Prefix: ${BOT_PREFIX}\n`));
  
  initBot();
});

module.exports = app;
