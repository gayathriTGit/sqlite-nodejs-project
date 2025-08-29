const path = require('path');
const express = require('express');
const students = require('./StudentRoutes');

const app = express();
const PORT = process.env.PORT || 9005;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const spec = YAML.load(path.join(__dirname, 'openapi.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
// also expose raw JSON if you like:
app.get('/swagger.json', (_, res) => res.json(spec));

// Middleware to parse JSON requests
app.use(express.json());


//health
app.get('/health', (_,res)=>res.json({ok:true}));

app.get('/', (req, res) => res.json({ message: 'welcome to Students API' }));

//routes
app.use('/students', students);

//404
app.use((req,res)=> res.status(404).json({error: 'route not found'}));

//error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
