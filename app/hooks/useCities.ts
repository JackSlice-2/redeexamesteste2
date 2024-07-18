import { useState, useEffect } from 'react';

interface FormattedCityData {
  value: string;
  label: string;
  latlng: [number, number];
  region: string;
  address: string;
  phoneNumber: string;
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
          'Alvorada',
          'Gravataí',
          'Esteio',
          'São Jerônimo',
          'São Leopoldo',
          'Novo Hamburgo',
          'Guaíba',
          'Tramandaí',
          'Capão da Canoas',
          'São Gabriel'
        ];

        const hardcodedCitiesData: FormattedCityData[] = [
          {
            value: 'Porto Alegre',
            label: 'Porto Alegre, RS',
            latlng: [-51.223611, -30.033333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Canoas',
            label: 'Canoas, RS',
            latlng: [-48.791944, -29.966667],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Viamão',
            label: 'Viamão, RS',
            latlng: [-43.783333, -31.933333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Alvorada',
            label: 'Alvorada, RS',
            latlng: [-43.783333, -31.933333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Gravataí',
            label: 'Gravataí, RS',
            latlng: [-51.633889, -29.466389],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Esteio',
            label: 'Esteio, RS',
            latlng: [-51.316111, -29.355556],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'São Jerônimo',
            label: 'São Jerônimo, RS',
            latlng: [-52.416667, -29.483333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'São Leopoldo',
            label: 'São Leopoldo, RS',
            latlng: [-51.133056, -29.639444],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Novo Hamburgo',
            label: 'Novo Hamburgo, RS',
            latlng: [-51.220278, -29.335833],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Guaíba',
            label: 'Guaíba, RS',
            latlng: [-51.283333, -29.433333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Tramandaí',
            label: 'Tramandaí, RS',
            latlng: [-51.066667, -29.383333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'Capão da Canoas',
            label: 'Capão da Canoas, RS',
            latlng: [-51.093056, -29.448056],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
          {
            value: 'São Gabriel',
            label: 'São Gabriel, RS',
            latlng: [-53.666667, -28.533333],
            region: 'RS',
            address: '',
            phoneNumber: ''
          },
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
