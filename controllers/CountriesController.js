const axios = require('axios');
const countriesService = require('../services/countriesService');

const filterImages = require('../utils/filterImages');
const generateCountryInfoObject = require('../utils/generateCountryInfoObject');

class CountriesController {
    async index(req, res){
        const { countryName } = req.params;
        try {
          const countriesFound = (countryName ? countriesService.findOne(countryName) : countriesService.findAll());
          res.json({ countries: countriesFound} );
        } catch (error) {
          res.json({ message: 'Ocorreu um erro ao realizar a operação no banco'} );
        }
        // countriesService.find(countryName).then((data) =>{
        //   res.json({ countries: data});
        // })
        // .catch(() => {
        //   res.json({ message: 'Ocorreu um erro ao realizar a operação no banco'});
        // })
    }
    async create(req, res){
        const { name, ptName, abbreviation } = req.body;
        try {
          const message = ((name && ptName && abbreviation) ? countriesService.create(req.body) : 'Nenhum dos campos pode estar vazio');
          res.json({ message });
        } catch (error) {
          res.json({ message: 'Ocorreu um erro ao realizar a operação no banco'});
        }
    }
    async update(req, res){

    }
    async delete(req, res){

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