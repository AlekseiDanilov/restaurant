const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const https = require('https');
const pem = require('pem');
const enableHttps = process.env.ENABLE_HTTPS;
const commonName = process.env.COMMON_NAME || "localhost";
const http = require('http');
const app = express();

const backendPort = process.env.BACKEND_PORT || 3001;
const backendHost = process.env.BACKEND_HOST || 'http://localhost';
const backendServerProxy = proxy({
  target: backendHost + ':' + backendPort,
  changeOrigin: false,
  pathRewrite: {'^/api': '/api'},
  autoRewrite: true
});

if (enableHttps) {
  console.log('HTTPS enabled!');
  pem.createCertificate({days: 7, selfSigned: true, commonName: commonName}, function (err, opts) {
    if (err) {
      throw err
    }
    https.createServer({key: opts.serviceKey, cert: opts.certificate}, app).listen(443)
  });
} else {
  http.createServer(app).listen(80);
}

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api/*', backendServerProxy);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});