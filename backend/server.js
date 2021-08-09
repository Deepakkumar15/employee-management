const express = require('express');
const bodyParser = require('body-parser');

const abc = require('./mongo');


const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
  });
  

app.get('/employees', abc.getEmployees);

app.post('/employees', abc.createEmployees);

app.patch('/employees/:id', abc.updateEmployees) ;

app.get('/employees/:id', abc.getEmployeesById) ;

app.delete('/:id', abc.router) ;


app.listen(PORT);