const express = require('express');
const routes = express.Router();

const CountriesController = require('./controllers/CountriesController');
const countriesController = new CountriesController();

routes.get('/country/images/:countryName', countriesController.getImages);
routes.get('/country/info/:countryInitials', countriesController.getInfo);

module.exports = routes;