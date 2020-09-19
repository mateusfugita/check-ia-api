const axios = require('axios');
const filterImages = require('../utils/filterImages');
const generateCountryInfoObject = require('../utils/generateCountryInfoObject');

class CountriesController {
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