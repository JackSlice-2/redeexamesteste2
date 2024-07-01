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
        const citiesList = [
          'Porto Alegre',
          'Canoas',
          'Viamão',
          'Alvorada'
        ];

        // Hardcoded data
        const hardcodedCitiesData: FormattedCityData[] = [
          {
            value: 'Porto Alegre',
            label: 'Porto Alegre, RS',
            latlng: [-51.223611, -30.033333], // Example coordinates
            region: 'RS'
          },
          {
            value: 'Canoas',
            label: 'Canoas, RS',
            latlng: [-48.791944, -29.966667], // Example coordinates
            region: 'RS'
          },
          {
            value: 'Viamão',
            label: 'Viamão, RS',
            latlng: [-43.783333, -31.933333], // Example coordinates
            region: 'RS'
          },
          {
            value: 'Alvorada',
            label: 'Alvorada, RS',
            latlng: [-43.783333, -31.933333], // Example coordinates
            region: 'RS'
          }
        ];

        setCities(hardcodedCitiesData);
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
