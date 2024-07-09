import React from 'react';
import Container from './Container';
import Logo from './navbar/Logo';
import { SafeUser } from '@/app/types';
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='w-full bg-blue-50'>
      <div className="pt-3 bg-blue-400 rounded-t-3xl">
        <Container>
          <div className="flex flex-col md:flex-row items-center text-center justify-center md:justify-between gap-3 md:gap-0 mt-5">
            <Logo
            height={100}
            width={130}
            />
            <div className="md:mr-auto">
            <h1 className='font-semibold'>
                    Fale Conosco
                </h1>
                <ul className='gap-2 flex'>
                    (51) 3434-1422 <br/>
                    (51) 98570-1422
                </ul>
            </div>
            <div className='gap-3'>
                <a target="_blank" href={"mailto:redeexamesfacil@gmail.com"} className='hover:underline font-medium'>
                    redeexames.online@gmail.com
                </a>
                <br/>
                <a target="_blank" href={"https://www.google.com/search?q=Av.%20Bento%20Gon%C3%A7alves%2C%2081%20Viam%C3%A3o%20RS#smwie=1"} className='hover:underline font-medium'>
                    Av. Bento Gonçalves, 81 Viamão RS
                </a>
                <hr className='md:hidden'/>
            </div>
            <div className='md:ml-auto'>
            <h1 className='font-semibold'>
                Nos Siga Nas Redes Socias
                </h1>
                <ul className="gap-4 flex justify-center align-center p-1">
                    <a target="_blank" href={"https://wa.me/5551981859157"}>
                      <FaWhatsapp className='hover:scale-150 hover:text-green-700' size={20}/>
                    </a>
                    <a target="_blank" href={"https://t.me/redeexames?start=+55051981859157"}>
                      <FaTelegram className='hover:scale-150 hover:text-blue-900' size={20}/>
                    </a>
                    <a target="_blank" href={"https://facebook.com"}>
                      <FaFacebook className='hover:scale-150 hover:text-blue-600' size={20}/>
                    </a>
                    <a target="_blank" href={"https://instagram.com/_redesaude?igshid=OGQ5ZDc2ODk2ZA=="}>
                      <FaInstagram className='hover:scale-150 hover:text-pink-700' size={20}/>
                    </a>
                </ul>
            </div>
          </div>
        </Container>
        <div className="text-center text-xs">
        <a target="_blank" href={"https://redeexames.online/"}
        className='hover:underline font-thin'>
        © 2024 Rede Exames Online
        </a> | Há mais de 16 anos no mercado 
        <br/> Todos os direitos reservados
      </div>
      </div>
    </div>
  );
};

export default Navbar;
