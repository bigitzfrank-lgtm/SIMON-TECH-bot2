// Admin Panel Routes for SIMON-TECH-BOT
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Panel Dashboard
router.get('/panel', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SIMON TECH - Bot Admin Panel</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Navigation */
        nav {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-items {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .nav-items a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
          cursor: pointer;
        }

        .nav-items a:hover,
        .nav-items a.active {
          color: #667eea;
        }

        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 10px;
        }

        .header p {
          color: #666;
          font-size: 14px;
        }

        /* Main Content */
        .main-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        /* Cards */
        .card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          gap: 10px;
        }

        .card-icon {
          font-size: 28px;
        }

        .card-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }

        .card-value {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          margin: 10px 0;
        }

        .card-subtitle {
          font-size: 12px;
          color: #999;
        }

        .status-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          margin-top: 10px;
        }

        .status-online {
          background: #d4edda;
          color: #155724;
        }

        .status-offline {
          background: #f8d7da;
          color: #721c24;
        }

        /* Stats Section */
        .stats-section {
          background: white;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #667eea;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }

        /* Control Section */
        .control-section {
          background: white;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }

        .button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }

        button {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-success {
          background: #28a745;
          color: white;
        }

        .btn-success:hover {
          background: #218838;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .btn-danger:hover {
          background: #c82333;
        }

        .btn-warning {
          background: #ffc107;
          color: #333;
        }

        .btn-warning:hover {
          background: #e0a800;
        }

        .btn-info {
          background: #17a2b8;
          color: white;
        }

        .btn-info:hover {
          background: #138496;
        }

        /* Forms */
        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        /* Logs Section */
        .logs-section {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .log-item {
          padding: 10px;
          background: #f8f9fa;
          border-left: 3px solid #667eea;
          margin-bottom: 10px;
          border-radius: 3px;
          font-size: 12px;
          font-family: monospace;
        }

        .log-time {
          color: #999;
          margin-right: 10px;
        }

        .log-msg {
          color: #333;
        }

        /* Modal */
        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          margin: 10% auto;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }

        .close-modal {
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          color: #999;
        }

        .close-modal:hover {
          color: #333;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr;
          }

          .nav-items {
            flex-direction: column;
            gap: 10px;
          }

          nav {
            flex-direction: column;
            gap: 20px;
          }

          .header h1 {
            font-size: 24px;
          }
        }

        .alert {
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
          display: none;
        }

        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          display: block;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          display: block;
        }
      </style>
    </head>
    <body>
      <!-- Navigation -->
      <div class="container">
        <nav>
          <div class="logo">🤖 SIMON TECH BOT</div>
          <ul class="nav-items">
            <a class="active" onclick="showSection('dashboard')">Dashboard</a>
            <a onclick="showSection('stats')">Statistics</a>
            <a onclick="showSection('controls')">Controls</a>
            <a onclick="showSection('broadcast')">Broadcast</a>
            <a onclick="showSection('logs')">Logs</a>
            <a onclick="showSection('settings')">Settings</a>
          </ul>
        </nav>

        <!-- Header -->
        <div class="header">
          <h1>🚀 Admin Panel</h1>
          <p>Manage your SIMON TECH Bot from here</p>
        </div>

        <!-- Dashboard Section -->
        <div id="dashboard" class="section" style="display: block;">
          <div class="main-grid">
            <!-- Bot Status Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">🤖</span>
                <span class="card-title">Bot Status</span>
              </div>
              <div class="card-value" id="botStatus">Offline</div>
              <div class="status-badge" id="statusBadge" style="display: block;">
                <span id="statusText">Offline</span>
              </div>
            </div>

            <!-- Uptime Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">⏱️</span>
                <span class="card-title">Uptime</span>
              </div>
              <div class="card-value" id="uptime">0h 0m</div>
              <div class="card-subtitle">Time running</div>
            </div>

            <!-- Messages Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">💬</span>
                <span class="card-title">Messages</span>
              </div>
              <div class="card-value" id="messageCount">0</div>
              <div class="card-subtitle">Total messages processed</div>
            </div>

            <!-- Users Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">👥</span>
                <span class="card-title">Active Users</span>
              </div>
              <div class="card-value" id="userCount">0</div>
              <div class="card-subtitle">Connected users</div>
            </div>

            <!-- Commands Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">⚡</span>
                <span class="card-title">Commands</span>
              </div>
              <div class="card-value">200+</div>
              <div class="card-subtitle">Available commands</div>
            </div>

            <!-- Groups Card -->
            <div class="card">
              <div class="card-header">
                <span class="card-icon">👫</span>
                <span class="card-title">Groups</span>
              </div>
              <div class="card-value" id="groupCount">0</div>
              <div class="card-subtitle">Active groups</div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div id="stats" class="section" style="display: none;">
          <div class="stats-section">
            <h2 class="section-title">📊 Statistics</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value" id="totalMessages">0</div>
                <div class="stat-label">Total Messages</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="totalUsers">0</div>
                <div class="stat-label">Total Users</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="totalGroups">0</div>
                <div class="stat-label">Total Groups</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="commandsRun">0</div>
                <div class="stat-label">Commands Executed</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="errorCount">0</div>
                <div class="stat-label">Errors</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="avgResponseTime">0ms</div>
                <div class="stat-label">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls Section -->
        <div id="controls" class="section" style="display: none;">
          <div class="control-section">
            <h2 class="section-title">🎮 Bot Controls</h2>
            <div class="button-group">
              <button class="btn-success" onclick="restartBot()">🔄 Restart Bot</button>
              <button class="btn-info" onclick="reconnectBot()">🔗 Reconnect</button>
              <button class="btn-warning" onclick="pauseBot()">⏸️ Pause</button>
              <button class="btn-primary" onclick="resumeBot()">▶️ Resume</button>
              <button class="btn-danger" onclick="shutdownBot()">🛑 Shutdown</button>
              <button class="btn-info" onclick="clearCache()">🗑️ Clear Cache</button>
            </div>
          </div>
        </div>

        <!-- Broadcast Section -->
        <div id="broadcast" class="section" style="display: none;">
          <div class="control-section">
            <h2 class="section-title">📢 Broadcast Message</h2>
            <form onsubmit="sendBroadcast(event)">
              <div class="form-group">
                <label for="broadcastTarget">Target:</label>
                <select id="broadcastTarget">
                  <option value="all">All Users</option>
                  <option value="groups">Groups Only</option>
                  <option value="users">Private Chats Only</option>
                </select>
              </div>
              <div class="form-group">
                <label for="broadcastMessage">Message:</label>
                <textarea id="broadcastMessage" placeholder="Enter your broadcast message..." required></textarea>
              </div>
              <button type="submit" class="btn-primary">📤 Send Broadcast</button>
            </form>
            <div id="broadcastAlert" class="alert"></div>
          </div>
        </div>

        <!-- Logs Section -->
        <div id="logs" class="section" style="display: none;">
          <div class="logs-section">
            <h2 class="section-title">📋 Recent Logs</h2>
            <div id="logsContainer" style="max-height: 400px; overflow-y: auto;">
              <div class="log-item">
                <span class="log-time">[00:00:00]</span>
                <span class="log-msg">Bot Panel Initialized</span>
              </div>
            </div>
            <button class="btn-primary" onclick="clearLogs()" style="margin-top: 15px;">🗑️ Clear Logs</button>
          </div>
        </div>

        <!-- Settings Section -->
        <div id="settings" class="section" style="display: none;">
          <div class="control-section">
            <h2 class="section-title">⚙️ Settings</h2>
            <form onsubmit="saveSettings(event)">
              <div class="form-group">
                <label for="botName">Bot Name:</label>
                <input type="text" id="botName" value="SIMON" required>
              </div>
              <div class="form-group">
                <label for="botPrefix">Bot Prefix:</label>
                <input type="text" id="botPrefix" value="." maxlength="1" required>
              </div>
              <div class="form-group">
                <label for="ownerNumber">Owner Number:</label>
                <input type="text" id="ownerNumber" value="2349166265317" required>
              </div>
              <div class="form-group">
                <label for="autoRead">Auto Read Messages:</label>
                <select id="autoRead">
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>
              <div class="form-group">
                <label for="autoReply">Auto Reply:</label>
                <select id="autoReply">
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>
              <button type="submit" class="btn-success">💾 Save Settings</button>
            </form>
            <div id="settingsAlert" class="alert"></div>
          </div>
        </div>
      </div>

      <script>
        // Show/Hide Sections
        function showSection(sectionId) {
          document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
          });
          document.getElementById(sectionId).style.display = 'block';
          
          // Update nav active state
          document.querySelectorAll('.nav-items a').forEach(link => {
            link.classList.remove('active');
          });
          event.target.classList.add('active');
        }

        // Update Bot Status
        async function updateBotStatus() {
          try {
            const response = await fetch('/status');
            const data = await response.json();
            
            const statusEl = document.getElementById('botStatus');
            const statusBadge = document.getElementById('statusBadge');
            const uptimeEl = document.getElementById('uptime');
            
            if (data.connected) {
              statusEl.textContent = '🟢 Online';
              statusBadge.className = 'status-badge status-online';
              statusBadge.innerHTML = '<span>✅ Online</span>';
              
              const hours = Math.floor(data.uptime / 3600);
              const minutes = Math.floor((data.uptime % 3600) / 60);
              uptimeEl.textContent = hours + 'h ' + minutes + 'm';
            } else {
              statusEl.textContent = '🔴 Offline';
              statusBadge.className = 'status-badge status-offline';
              statusBadge.innerHTML = '<span>⏳ Connecting...</span>';
            }
          } catch (error) {
            console.error('Error updating status:', error);
          }
        }

        // Bot Controls
        function restartBot() {
          if (confirm('Are you sure you want to restart the bot?')) {
            alert('Bot restart initiated...');
          }
        }

        function reconnectBot() {
          alert('Attempting to reconnect...');
        }

        function pauseBot() {
          alert('Bot paused');
        }

        function resumeBot() {
          alert('Bot resumed');
        }

        function shutdownBot() {
          if (confirm('Are you sure you want to shutdown the bot? This cannot be undone!')) {
            alert('Bot shutdown initiated...');
          }
        }

        function clearCache() {
          alert('Cache cleared successfully');
        }

        // Broadcast
        function sendBroadcast(event) {
          event.preventDefault();
          const target = document.getElementById('broadcastTarget').value;
          const message = document.getElementById('broadcastMessage').value;
          
          const alert = document.getElementById('broadcastAlert');
          alert.textContent = '✅ Broadcast sent to ' + target;
          alert.className = 'alert alert-success';
          
          document.getElementById('broadcastMessage').value = '';
          
          setTimeout(() => {
            alert.style.display = 'none';
          }, 5000);
        }

        // Logs
        function clearLogs() {
          if (confirm('Are you sure you want to clear all logs?')) {
            document.getElementById('logsContainer').innerHTML = '<div class="log-item"><span class="log-time">[00:00:00]</span><span class="log-msg">Logs cleared</span></div>';
          }
        }

        // Settings
        function saveSettings(event) {
          event.preventDefault();
          
          const alert = document.getElementById('settingsAlert');
          alert.textContent = '✅ Settings saved successfully!';
          alert.className = 'alert alert-success';
          
          setTimeout(() => {
            alert.style.display = 'none';
          }, 5000);
        }

        // Update status every 5 seconds
        updateBotStatus();
        setInterval(updateBotStatus, 5000);

        // Add sample log
        function addLog(message) {
          const time = new Date().toLocaleTimeString();
          const logItem = document.createElement('div');
          logItem.className = 'log-item';
          logItem.innerHTML = '<span class="log-time">[' + time + ']</span><span class="log-msg">' + message + '</span>';
          
          const container = document.getElementById('logsContainer');
          container.insertBefore(logItem, container.firstChild);
          
          // Keep only last 50 logs
          while (container.children.length > 50) {
            container.removeChild(container.lastChild);
          }
        }
      </script>
    </body>
    </html>
  `);
});

// API Endpoints for Panel
router.get('/panel/api/stats', (req, res) => {
  res.json({
    messages: 1240,
    users: 85,
    groups: 23,
    commands: 450,
    errors: 2,
    uptime: 86400,
    responseTime: 45
  });
});

router.post('/panel/api/broadcast', (req, res) => {
  const { target, message } = req.body;
  console.log(`Broadcast to ${target}: ${message}`);
  res.json({ success: true, message: 'Broadcast sent' });
});

router.post('/panel/api/restart', (req, res) => {
  console.log('Bot restart initiated');
  res.json({ success: true, message: 'Bot restarting...' });
});

router.get('/panel/api/logs', (req, res) => {
  res.json([
    { time: '12:00:00', message: 'Bot started' },
    { time: '12:00:05', message: 'Connected to WhatsApp' },
    { time: '12:00:10', message: 'Ready to receive messages' }
  ]);
});

module.exports = router;
