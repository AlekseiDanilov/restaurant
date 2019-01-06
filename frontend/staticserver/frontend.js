module.exports = {
  apps : [
    {
      name: "frontend",
      script: "./index.js",
      watch: true,
      env: {
        "ENABLE_HTTPS": true
      }
    }
  ]
};