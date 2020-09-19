const axios = require('axios');
const filterImages = require('../utils/filterImages');

class CountriesController {
    async getImages(req, res){
        const { countryName } = req.params;
        const apikey = process.env.APIKEY;

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
}

module.exports = CountriesController;