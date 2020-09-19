const generateCountryInfoObject = (attributes, values) => {
    let countryInfo = {};
    values.map((item, index) => {
        countryInfo[attributes[index]] = item.res[0].res['-'];
    });
    return countryInfo;
}

module.exports = generateCountryInfoObject;