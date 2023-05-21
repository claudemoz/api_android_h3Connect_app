require('module-alias/register')
require('colors');
const express = require('express');
// const expressOasGenerator = require('express-oas-generator');
const logger = process.env.NODE_ENV === 'development' ? require('morgan') : null;
const cors = require('cors');
const app = express();
// expressOasGenerator.init(app, {});
const path = require("path");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "ressources/images")));

if (logger) app.use(logger('dev'));

app.use('/api/v1', require('@routes/_index.js'));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}...  http://localhost:${process.env.PORT || 5000}`.red)
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}...`.green)
  });
}