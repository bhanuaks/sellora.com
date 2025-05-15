module.exports = {
  apps: [{
    name: 'sellora_seller_script',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/nextjs/sellora.com',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    }
  }]
}
