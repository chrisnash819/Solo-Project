const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const locationController = require('./controllers/locationController.js')

app.use(cors());
//const locationRoutes = require('./routes/location.js');

app.use(express.json());


app.post('/calculate-taxes', locationController.calculateTaxes , locationController.getStateRanking, (req, res, next) => {
    

    return res.status(200).json(res.locals.taxData);

})

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

//Global Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.log);
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})