const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const app = express();

// Serve static files or other Express functionality
app.get('/', (req, res) => {
  res.send('Hello from Express Server');
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 8080
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
