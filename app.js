require('module-alias/register')
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app =  express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', require('@routes/_index.js'));

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}...  http://localhost:${process.env.PORT || 5000}`)
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}...`)
  });
}