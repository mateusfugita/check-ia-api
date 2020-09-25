const axios = require('axios');
const countriesService = require('../services/countriesService');

const filterImages = require('../utils/filterImages');
const generateCountryInfoObject = require('../utils/generateCountryInfoObject');

class CountriesController {
    async index(req, res){
        const { name } = req.query;
        const result = (name ? await countriesService.findOne(name) : await countriesService.findAll());
        res.json(result);
    }

    async create(req, res){
        const { name, ptName, abbreviation } = req.body;
        const message = ((name && ptName && abbreviation) ? await countriesService.create(req.body) : { erro: 'Nenhum dos campos pode estar vazio' });
        res.json(message);
    }

    async update(req, res){
      const { name, newPtName, newAbbreviation } = req.body;
      const message = ((name && newPtName && newAbbreviation) ? await countriesService.update(name, newPtName, newAbbreviation) : { erro: 'Nenhum dos campos pode estar vazio' });
      res.json(message);
    }

    async delete(req, res){
      const { countryName } = req.params;
      const message = (countryName ? await countriesService.delete(countryName) : { erro: 'É necessário informar o nome do país a ser excluído' });
      res.json(message);
    }

    async getImages(req, res){
        const { countryName } = req.params;
        const apikey = process.env.UNSPLASH_APIKEY;

        if(!countryName) return res.status(400).json({ error: 'Wrong parameter' });
        
        const config = {
          method: 'GET',
          url: `https://api.unsplash.com/search/photos?client_id=${apikey}&page=1&query=${countryName}`,
        };
    
        axios(config).then(function (response) {
          res.json(filterImages(response.data.results));
        })
        .catch(function(err){
          res.json({ error: 'Não foi possível obter as informações' });
        });

    }

    async getInfo(req,res){
      const { countryInitials } = req.params;
      const countryAttributes = ['Capital', 'Área', 'Língua', 'Região', 'Moeda'];        
  
      if(!countryInitials || countryInitials.length !== 2) return res.status(400).json({ error: 'Wrong parameter' });
  
      const config = {
        method: 'GET',
        url: `https://servicodados.ibge.gov.br/api/v1/pesquisas/10090/indicadores/1/resultados/${countryInitials}`,
      };
  
      axios(config).then(function (response) {
          res.json(generateCountryInfoObject(countryAttributes, response.data));
      })
      .catch(function(err){
        res.json({ error: 'Não foi possível obter as informações' });
      });
  }
}

module.exports = CountriesController;