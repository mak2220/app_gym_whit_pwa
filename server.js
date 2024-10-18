const { createServer } = require('https');
const { readFileSync } = require('fs');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: readFileSync('./localhost-key.pem'),
    cert: readFileSync('./localhost.pem'),
};

const port = process.env.PORT || 3000;

app.prepare().then(() => {
    const server = express();

  // Maneja todas las rutas Next.js
server.all('*', (req, res) => {
    return handle(req, res);
});

  // Crea servidor HTTPS
createServer(httpsOptions, server).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server running on https://localhost:${port}`);
});
});
