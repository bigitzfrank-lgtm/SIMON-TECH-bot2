# SIMON TECH Bot - Setup Guide

## 🎯 Quick Setup

### For Beginners

**Step 1: Open Terminal**
```bash
git clone https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2.git
cd SIMON-TECH-bot2
npm install
```

**Step 2: Generate WhatsApp Session**
```bash
npm run session
```
Scan the QR code with your WhatsApp phone camera.

**Step 3: Configure Bot**
```bash
cp .env.example .env
# Edit .env with your preferences
```

**Step 4: Start Bot**
```bash
npm start
```

**Step 5: Access Admin Panel**
Open browser: `http://localhost:3000/panel`

---

## 📦 NPM Scripts

```bash
npm start          # Start the bot
npm run dev        # Development mode with auto-reload
npm run session    # Generate WhatsApp session
npm run logs       # View bot logs
```

---

## 🌐 Deployment

### Railway (Recommended)
1. Push code to GitHub
2. Connect Railway to your repo
3. Set environment variables
4. Deploy

### Docker
```bash
docker build -t simon-tech .
docker run -e PORT=3000 simon-tech
```

### Linux VPS
```bash
sudo apt update && sudo apt install nodejs npm
git clone repo
npm install
npm start
```

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| BOT_NAME | SIMON | Bot display name |
| BOT_PREFIX | . | Command prefix |
| OWNER_NUMBER | 2349... | Your WhatsApp number |
| PORT | 3000 | Server port |
| NODE_ENV | production | Environment mode |

---

## ⚠️ Common Issues

### Issue: QR Code Not Showing
**Solution:** Open `http://localhost:3000` in browser

### Issue: Bot Won't Connect
**Solution:** Delete `sessions/` folder and run `npm run session` again

### Issue: Port Already in Use
**Solution:** `PORT=3001 npm start`

---

## 📞 Support

Need help? Contact:
- **Email:** support@simontech.dev
- **WhatsApp:** +2349166265317
- **GitHub Issues:** [Report Bug](https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2/issues)

---

*SIMON TECH - The moon watches 🌙*
