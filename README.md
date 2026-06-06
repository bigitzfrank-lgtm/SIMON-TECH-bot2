# 🐺 SIMON TECH - WhatsApp Bot

> "The moon watches..." 🌙

[![GitHub stars](https://img.shields.io/github/stars/bigitzfrank-lgtm/SIMON-TECH-bot2?style=social)](https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2)
[![GitHub forks](https://img.shields.io/github/forks/bigitzfrank-lgtm/SIMON-TECH-bot2?style=social)](https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2/fork)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A powerful, fully-featured WhatsApp automation bot built with Node.js and Baileys v7. Fast, intelligent, and always watching.

## 🚀 Quick Start

### One-Click Deploy
- [![Railway](https://railway.app/button.svg)](https://railway.app/new/template)
- [![Heroku](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy)

### Local Installation

```bash
# Clone repository
git clone https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2.git
cd SIMON-TECH-bot2

# Install dependencies
npm install

# Generate WhatsApp session
npm run session

# Configure bot
cp .env.example .env
# Edit .env with your settings

# Start bot
npm start
```

**Access Admin Panel:** http://localhost:3000/panel

## ✨ Features

### 🤖 AI Integration
- ChatGPT & Gemini Integration
- Code Generation & Analysis
- Image Analysis & Understanding
- Multiple AI Models Support

### 👥 Group Management
- Add/Kick Members
- Promote/Demote Admins
- Mute/Unmute Groups
- Warning System
- Ban Management
- Anti-link Protection
- Welcome/Goodbye Messages

### 📥 Media Downloads
- TikTok Videos
- Instagram Content
- Facebook Videos
- YouTube (MP3/MP4)
- Spotify Tracks
- Snapchat Stories

### 🎮 Entertainment & Games
- TicTacToe Game
- Snake Game
- Tetris Game
- Quiz Games
- Truth or Dare
- Rock Paper Scissors
- Meme Generator

### 🛡️ Security & Auto Features
- Anti-Spam Protection
- Auto-Read Messages
- Auto-Typing Indicator
- Auto-Recording
- Auto-React to Stories
- Profile Picture Privacy
- Last Seen Control

### 🎨 Media Tools
- Sticker Creator
- Image Converter
- Audio Converter
- Text to Speech
- QR Code Generator
- Image Editor
- Logo Designer

### 📊 Admin Dashboard
- Real-time Statistics
- Bot Status Monitor
- Bot Controls (Restart, Pause, Shutdown)
- Message Broadcasting System
- System Logs Viewer
- Settings Configuration
- Live Performance Metrics

## 📋 Core Commands

| Category | Commands |
|----------|----------|
| **System** | `.ping` `.alive` `.menu` `.uptime` `.owner` `.status` |
| **Group** | `.kick` `.add` `.promote` `.demote` `.tagall` `.mute` `.antilink` |
| **Media** | `.play` `.ytmp3` `.ytmp4` `.tiktok` `.instagram` `.facebook` |
| **AI** | `.ai` `.gpt` `.imagine` `.code` `.translate` |
| **Fun** | `.joke` `.meme` `.truth` `.dare` `.rps` `.dice` |
| **Utility** | `.weather` `.wiki` `.define` `.news` `.qr` `.timer` |

## 🔧 Configuration

Edit `.env`:

```env
# Bot Settings
BOT_NAME=SIMON
BOT_PREFIX=.
BOT_VERSION=2.0.0

# Owner Information
OWNER_NUMBER=2349166265317
OWNER_NAME=SIMON TECH

# Features Toggle
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_SECURITY=true
ENABLE_ECONOMY=true
AUTO_READ=false
AUTO_TYPING=false

# API Keys (Optional)
OPENAI_API_KEY=your_key_here
RAPIDAPI_KEY=your_key_here

# Server
PORT=3000
NODE_ENV=production
```

## 📦 Requirements

- **Node.js** v18+
- **npm** v9+
- **WhatsApp Account**
- **Internet Connection**

## 🌐 Deployment Platforms

| Platform | Setup | Status |
|----------|-------|--------|
| Railway | ✅ 1-Click | ✅ Recommended |
| Heroku | ✅ Easy | ✅ Supported |
| Docker | ✅ Ready | ✅ Supported |
| VPS/Ubuntu | ✅ Guide | ✅ Supported |
| Termux | ✅ Possible | ✅ Supported |

## 🐳 Docker Deployment

```bash
# Build image
docker build -t simon-tech-bot .

# Run container
docker run -e PORT=3000 \
  -e BOT_NAME=SIMON \
  -e OWNER_NUMBER=2349166265317 \
  simon-tech-bot
```

## 📱 Admin Panel Features

Access your admin dashboard at `/panel`:

### 📊 Dashboard
- Real-time bot status
- Uptime tracking
- Message statistics
- Active users count
- Connected groups
- Commands executed

### 📈 Statistics
- Total messages processed
- Total connected users
- Active groups count
- Commands executed count
- Error tracking
- Average response time

### 🎮 Controls
- Restart Bot
- Reconnect to WhatsApp
- Pause Bot
- Resume Bot
- Shutdown Bot
- Clear Cache

### 📢 Broadcasting
- Send to all users
- Target specific groups
- Send to private chats
- Message composition

### 📋 Logs
- Real-time event logging
- Timestamped entries
- Searchable logs
- Clear logs option

### ⚙️ Settings
- Configure bot name
- Change command prefix
- Update owner number
- Toggle features
- Security settings

## 📁 Project Structure

```
SIMON-TECH-bot2/
├── index.js                # Main bot with panel
├── admin-panel.js          # Admin dashboard
├── session-generator-v2.js # Session setup
├── commands.js             # Command definitions
├── menu.js                 # Bot menu
├── botProfile.js           # Bot config
├── package.json            # Dependencies
├── Dockerfile              # Docker config
├── app.json                # Deployment config
├── .env.example            # Environment template
├── README.md               # Documentation
└── SETUP_GUIDE.md          # Setup instructions
```

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page with bot info |
| `/status` | GET | Bot status and statistics API |
| `/panel` | GET | Admin dashboard |
| `/panel/api/stats` | GET | Detailed statistics |
| `/panel/api/broadcast` | POST | Send broadcast message |
| `/panel/api/restart` | POST | Restart bot |

## 🎓 Getting Started

### Step 1: Setup
```bash
git clone https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2.git
cd SIMON-TECH-bot2
npm install
```

### Step 2: Generate Session
```bash
npm run session
# Scan QR code with WhatsApp
```

### Step 3: Configure
```bash
cp .env.example .env
# Edit settings
```

### Step 4: Run
```bash
npm start
```

### Step 5: Access Panel
Open: `http://localhost:3000/panel`

## ⚠️ Troubleshooting

### QR Code Not Showing?
Open `http://localhost:3000` in your browser

### Bot Won't Connect?
```bash
rm -rf sessions/
npm run session
```

### Port Already in Use?
```bash
PORT=3001 npm start
```

### Commands Not Working?
- Check bot prefix (default: `.`)
- Ensure bot has group permissions
- Verify command syntax in commands.js

### Session Expired?
```bash
npm run session
# Generate and copy new SESSION_ID
```

## 🔐 Security

⚠️ **Important Notes:**
- Never share your `.env` file
- Don't commit session data to git
- Use strong passwords for owner
- Enable security features in .env
- Monitor logs regularly
- Regenerate session if compromised

## 📄 NPM Scripts

```bash
npm start          # Start bot
npm run dev        # Development mode with auto-reload
npm run session    # Generate WhatsApp session
npm run logs       # View bot logs
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit Pull Request

## 📞 Support

- 📧 **Email:** support@simontech.dev
- 💬 **WhatsApp:** +2349166265317
- 🐙 **GitHub Issues:** [Report Bug](https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2/issues)
- 📖 **Documentation:** [Setup Guide](SETUP_GUIDE.md)

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

## 👨‍💻 Author

**SIMON TECH** - [@bigitzfrank-lgtm](https://github.com/bigitzfrank-lgtm)

## 🌟 Show Support

Give us a ⭐ if this project helped you!

---

<div align="center">

**POWERED BY SIMON TECH**

*The moon watches... 🌙*

© 2026 SIMON TECH Bot. All Rights Reserved.

[Deploy Now](#-quick-start) • [Documentation](#-quick-start) • [Support](#-support)

</div>
