module.exports = {
  apps: [
    {
      name: 'd3rpla41',
      port: 3000,
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: './',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
