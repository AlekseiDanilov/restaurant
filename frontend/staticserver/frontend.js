const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
app.use(express.static(path.join(__dirname, '../build')));

const backendPort = process.env.BACKEND_PORT || 3001;
const backendHost = process.env.BACKEND_HOST || 'http://localhost';
const backendServerProxy = proxy({
    target: backendHost + ':' + backendPort,
    changeOrigin: false,
    pathRewrite: { '^/api' : '/api' },
    autoRewrite: true
  });
app.use( '/api/*', backendServerProxy );
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(80);