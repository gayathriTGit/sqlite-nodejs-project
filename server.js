const express = require('express');
const students = require('./StudentRoutes');

const app = express();
const PORT = process.env.PORT || 9005;

// remove the fingerprint:
app.disable('x-powered-by');

// Middleware to parse JSON requests
app.use(express.json());

//health
app.get('/health', (_,res)=>res.json({ok:true}));

//routes
app.use('/students', students);

//404
app.use((req,res)=> res.status(404).json({error: 'route not found'}));

//error handler
app.use((err, req, res) =>{
    console.error(err);
    res.status(500).json({error: 'server error'});
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
