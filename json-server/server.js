// server.js
const jsonServer = require('json-server');
const path = require('path');
const mockApi = require('./mock/mock-api.js');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './mock/mock-data.json'));
const middlewares = jsonServer.defaults();

// Default middlewares: logger, CORS, etc.
server.use(middlewares);

// Parse POST, PUT, PATCH as JSON
server.use(jsonServer.bodyParser);

// Attach your custom middleware (login/logout)
server.use(mockApi);

// Use default router (games, categories from mock-data.json)
server.use(router);

const PORT = process.env.SERVER_PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});