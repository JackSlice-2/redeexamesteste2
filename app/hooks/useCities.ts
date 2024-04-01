import axios from 'axios';
import { useState, useEffect } from 'react';

interface CityData {
 components: {
    city: string;
    country: string;
 };
 formatted: string;
 geometry: {
    lat: number;
    lng: number;
 };
}

interface FormattedCityData {
 value: string;
 label: string;
 latlng: [number, number];
 region: string;
}

const useCities = () => {
 const [cities, setCities] = useState<FormattedCityData[]>([]);

 useEffect(() => {
    const fetchCities = async () => {
      try {
    // List of cities in Rio Grande do Sul, ordered from closest to Porto Alegre to the farthest
    const citiesList = [
      'Porto Alegre', // Assuming this is the starting point
      'Pelotas', // Closest city to Porto Alegre
      'Caxias do Sul', // Second closest
      'Santa Maria', // Third closest
      'Canoas', // Fourth closest
      'Gravataí', // Fifth closest
      'Viamão', // Sixth closest
      'Novo Hamburgo', // Seventh closest
      'São Leopoldo', // Eighth closest
      'Rio Grande', // Ninth closest
      'Alvorada', // Tenth closest
      'Passo Fundo', // Eleventh closest
      'Sapucaia do Sul', // Twelfth closest
      'Uruguaiana', // Thirteenth closest
      'Santa Cruz do Sul', // Fourteenth closest
      'Cachoeirinha', // Fifteenth closest
      'Bagé', // Sixteenth closest
      'Bento Gonçalves', // Seventeenth closest
      'Erechim', // Eighteenth closest
      'Guaíba', // Nineteenth closest
      'Santana do Livramento', // Twentieth closest
      'Ijuí', // Twenty-first closest
      'Alegrete', // Twenty-second closest
      'São Borja', // Twenty-third closest
      'Vacaria', // Twenty-fourth closest
      'Sapiranga', // Twenty-fifth closest
      'Esteio', // Twenty-sixth closest
      'Camaquã', // Twenty-seventh closest
      'São Gabriel', // Twenty-eighth closest
      'Farroupilha', // Twenty-ninth closest
      'Torres', // Thirtieth closest
      'Taquara', // Thirty-first closest
      'Montenegro', // Thirty-second closest
      'São Sebastião do Caí', // Thirty-third closest
      'São Lourenço do Sul', // Thirty-fourth closest
      'Santo Ângelo', // Farthest from Porto Alegre
    ];
 

    const fetchCityGeocode = async (city: string): Promise<FormattedCityData[]> => {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=c92e696b860e4606aae09466c9f055b5`);
      const formattedCities: FormattedCityData[] = response.data.results.map((cityData: CityData) => ({
        value: cityData.components.city,
        label: `${cityData.components.city}, RS`,
        latlng: [cityData.geometry.lat, cityData.geometry.lng],
        region: cityData.components.country,
      }));
      return formattedCities;
    };

    // Fetch geocoding information for each city concurrently
    const allCitiesData = await Promise.all(citiesList.map(fetchCityGeocode));
    // Flatten the array, filter out duplicates based on city name, and ensure only cities in Brazil are included
    const formattedCities = allCitiesData.flat().filter((city, index, self) =>
      index === self.findIndex((t) => (
        t.value === city.value
      )) && city.region === 'Brazil'
    );
    setCities(formattedCities);
  } catch (error) {
    console.error('Failed to fetch cities:', error);
  }
};

fetchCities();
}, []);

return {
getAll: () => cities,
};
};

export default useCities;