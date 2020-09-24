const express = require('express');
const routes = express.Router();

const AboutController = require('./controllers/AboutController');
const aboutController = new AboutController();

const CountriesController = require('./controllers/CountriesController');
const countriesController = new CountriesController();

routes.get('/about', aboutController.getProjectInfo);

routes.post('/country', countriesController.create);
routes.put('/country', countriesController.update);
routes.delete('/country/:countryName', countriesController.delete);
routes.get('/country', countriesController.index);
routes.get('/country/images/:countryName', countriesController.getImages);
routes.get('/country/info/:countryInitials', countriesController.getInfo);

module.exports = routes;