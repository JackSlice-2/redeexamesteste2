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
    // List of cities in Rio Grande do Sul
    const citiesList = [
      'Porto Alegre',
      'Canoas',
      'Viamão',
      'Alvorada'
    ];
 

const fetchCityGeocode = async (city: string): Promise<FormattedCityData[]> => {
 console.log(`Fetching geocode for city: ${city}`); // Log the city being fetched
 try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=c92e696b860e4606aae09466c9f055b5`);
    console.log('Response:', response); // Log the response
    const formattedCities: FormattedCityData[] = response.data.results.map((cityData: CityData) => ({
      value: cityData.components.city,
      label: `${cityData.components.city}, RS`,
      latlng: [cityData.geometry.lat, cityData.geometry.lng],
      region: cityData.components.country,
    }));
    return formattedCities;
 } catch (error) {
    console.error('Error fetching city geocode:', error); // Log any errors
    throw error; // Rethrow the error to be handled by the calling function
 }
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