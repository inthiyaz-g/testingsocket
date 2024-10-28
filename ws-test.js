const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const app = express();
let allMessages;
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
  ws.send(JSON.stringify({ msg: 'Online' }));
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // ws.send(JSON.stringify({ msg: `${message}` }));

    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      // console.log(client)
      if (client.readyState === WebSocket.OPEN) {
        // client.send(`Echo: ${message}`);
        // ws.send(JSON.stringify({ msg:message }));
        client.send(JSON.stringify({ msg: `${message}` }));

      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 8080
server.listen(PORT, () => {
  console.log(process.env.url || "url running")
  console.log(`Server running on http://localhost:${PORT}`);
});
