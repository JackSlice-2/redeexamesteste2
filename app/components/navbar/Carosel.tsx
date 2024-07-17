import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const caroselItems = [
    { 
        description: "Ha Mais de 16 anos Proporcionando saude a voce e sua familia."
    },
    { 
        description: "E Hoje Estamos em um Periodo de Renovaçao de Nossa Historia"
    },
    { 
        description: "Sua Familia Pode confiar! Somos uma empresa com 16 anos no mercado de saude!"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % caroselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='w-2/3 rounded-full p-2 hidden md:block capitalize shadow-2xl text-sky-800 font-medium'>
        <h2 className='font-semibold p-2 text-lg'>
            Rede Exames Online
        </h2>
        <p className='carousel-container max-h-12 h-12'>  
            {caroselItems[activeIndex].description}
        </p>
        <p>
        (51) 985594539
        </p>
    </div>
  );
};

export default Carousel;
