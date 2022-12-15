module.exports = {
  apps: [
    {
      name: 'inkjq',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/inkjq/',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
