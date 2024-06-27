const express = require('express');
const app = express();
const port = 3000;

const locationRoutes = require('./routes/location.js');

app.use(express.json());
app.use('/api/location', locationRoutes)

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})