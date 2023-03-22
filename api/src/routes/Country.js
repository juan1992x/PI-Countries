const { Router } =require("express");
const { Country, Activity,cache} =require("../db");

const axios =require("axios");
const apiallurl="https://restcountries.com/v3.1/all"

const countryRoute = Router();

const getAllCountries = async () => {
    const { data } = await axios.get(apiallurl);

    if (!cache.allCountries) { // Si el cache está vacio, significa que la base de datos esta vacia, entonces la lleno
        cache.allCountries = {};
        const countriesProps = data.map((element) => {
            return {
                id: element.cca3,
                name: element.name.common,
                capital: element.capital ? element.capital[0] : 'This country doesn\'t have capital.',
                flag: element.flags[0],
                continent: element.continents[0],
                subregion: element.subregion,
                area: element.area,
                population: element.population,
            }
        });
        try {
            await Country.bulkCreate(countriesProps);
        } catch (error) {
            console.log(error)
        }
    }
    // Guardo en caché todos los paises con las nuevas actividades
    const countriesWithActivities = await Country.findAll({ include: Activity });
    cache.allCountries = countriesWithActivities;
    
}

countryRoute.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        // se ingresa un await por que cache espera que lo llene 
        if (!cache.allCountries) await getAllCountries();

        let countries;
        if (name) {
            const filterCountries = cache.allCountries.filter(country => {
                const regex = new RegExp(name, "gmi");
                const isCountry = regex.exec(country.name);
                if (isCountry) {
                    country.index = isCountry.index
                    return country;
                }
            })
            filterCountries.sort((a, b) => a.index - b.index);
            
            return res.status(200).send(filterCountries);
        }
        countries = await Country.findAll({ include: Activity });
        res.status(200).send(countries);
        
    } catch (error) {
        next(error);
    }
});

countryRoute.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new Error('El ID es requerido'));
    try {
        if (!cache.allCountries) await getAllCountries();
        const country = await Country.findByPk(id, { include: Activity });
        if (!country) return res.status(404).send({ error: 'El id es invalido' });
        res.status(200).send(country);

    } catch (error) {
        next(error);
    }
});

module.exports = { countryRoute, getAllCountries };
