/**
 * SIMON-TECH-bot2 Configuration File
 * Central configuration for WhatsApp and GitHub automation bot
 * Version: 2.1.0
 */

module.exports = {
  // Bot Identity & Metadata
  bot: {
    name: 'SIMON-TECH-bot2',
    version: '2.1.0',
    description: 'SIMON-TECH WhatsApp Bot - Upgraded Edition with GitHub Automation',
    author: 'Simon Tech',
    maintainer: 'bigitzfrank-lgtm',
    repository: 'https://github.com/bigitzfrank-lgtm/SIMON-TECH-bot2',
    license: 'MIT',
  },

  // Environment Settings
  environment: process.env.NODE_ENV || 'production',
  debug: process.env.DEBUG === 'true' || false,
  port: process.env.PORT || 3000,

  // WhatsApp Configuration
  whatsapp: {
    enabled: true,
    sessionPath: process.env.SESSION_PATH || './session',
    qrCodeTimeout: 60000,
    autoReconnect: true,
    reconnectInterval: 5000,
    maxRetries: 5,
  },

  // GitHub Configuration
  github: {
    enabled: true,
    apiVersion: 'v3',
    baseUrl: 'https://api.github.com',
    token: process.env.GITHUB_TOKEN,
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Webhook Configuration
  webhook: {
    enabled: true,
    path: '/webhook',
    github: {
      secret: process.env.GITHUB_WEBHOOK_SECRET || 'your-secret-here',
      events: ['issues', 'pull_request', 'push', 'release'],
    },
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    directory: './logs',
    maxFileSize: '10m',
    maxFiles: 14,
    timestamps: true,
    console: true,
  },

  // Message Processing
  messages: {
    maxLength: 4096,
    encoding: 'utf-8',
    supportedMediaTypes: ['image', 'video', 'audio', 'document'],
    mediaDownloadPath: './media',
    mediaRetentionDays: 7,
  },

  // Session Management
  session: {
    enabled: true,
    storePath: process.env.SESSION_STORE_PATH || './session',
    autoSave: true,
    saveInterval: 30000,
  },

  // Features Configuration
  features: {
    messageAutoReply: true,
    groupManagement: true,
    contactManagement: true,
    mediaHandling: true,
    githubNotifications: true,
    automatedTasks: true,
    errorNotifications: true,
    statusMonitoring: true,
  },

  // Automation Rules
  automation: {
    enabled: true,
    maxConcurrentTasks: 10,
    taskTimeout: 60000,
    retryPolicy: {
      maxAttempts: 3,
      backoffMultiplier: 2,
      initialDelay: 1000,
    },
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    messagesPerMinute: 20,
    messagesPerHour: 1000,
    requestsPerMinute: 60,
    requestsPerHour: 3600,
  },

  // Notifications
  notifications: {
    enabled: true,
    channels: {
      whatsapp: process.env.WHATSAPP_NOTIFY_NUMBER || null,
      discord: process.env.DISCORD_WEBHOOK_URL || null,
      telegram: process.env.TELEGRAM_BOT_TOKEN || null,
    },
    events: ['error', 'alert', 'success', 'info'],
  },

  // API Keys and Secrets (use environment variables)
  secrets: {
    githubToken: process.env.GITHUB_TOKEN,
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
    discordToken: process.env.DISCORD_TOKEN,
    telegramToken: process.env.TELEGRAM_TOKEN,
  },

  // Monitoring and Analytics
  monitoring: {
    enabled: true,
    metricsInterval: 60000,
    healthCheckInterval: 30000,
    performanceTracking: true,
    errorTracking: true,
    uptimeTracking: true,
  },

  // Database Configuration (optional)
  database: {
    enabled: false,
    type: 'mongodb',
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/simon-tech-bot',
  },

  // Development Configuration
  development: {
    hotReload: true,
    verboseLogging: true,
    mockWhatsApp: false,
    mockGithub: false,
  },

  // Permissions
  permissions: {
    github: [
      'read:repo_hook',
      'write:repo_hook',
      'read:user',
      'write:discussion',
      'read:org',
      'write:packages',
    ],
    whatsapp: [
      'read:messages',
      'write:messages',
      'read:contacts',
      'read:groups',
    ],
  },
};
