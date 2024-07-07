import React from 'react';
import Container from './Container';
import Logo from './navbar/Logo';
import { SafeUser } from '@/app/types';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='w-full z-10 bg-blue-50'>
      <div className="py-4 bg-blue-400 rounded-t-3xl">
        <Container>
          <div className="flex flex-row items-center text-center justify-center md:justify-between gap-3 md:gap-0 pt-3">
            <Logo
            height={100}
            width={130}
            />
            <div>
            <h1 className='font-semibold'>
                    Fale Conosco
                </h1>
                <ul className='gap-2 flex'>
                    3434-1422 <br/>
                    98570-1422
                </ul>
            </div>
            <div className='gap-3'>
                <a target="_blank" href={"mailto:redeexamesfacil@gmail.com"} className='hover:underline'>
                    Redeexames.online@gmail. 
                </a>
                <br/>
                <a target="_blank" href={"https://www.google.com/search?q=Av.%20Bento%20Gon%C3%A7alves%2C%2081%20Viam%C3%A3o%20RS#smwie=1"} className='hover:underline'>
                    Av. Bento Gonçalves, 81 Viamão RS
                </a>
            </div>
            <div>
            <h1 className='font-semibold'>
                Nos Siga Nas Redes Socias
                </h1>
                <ul className="gap-4 flex justify-center align-center p-1">
                    <a target="_blank" href={"https://wa.me/5551981859157"}>
                      <FaWhatsapp className='hover:scale-150 hover:text-green-800'/>
                    </a>
                    <a target="_blank" href={"https://t.me/redeexames?start=+55051981859157"}>
                      <FaTelegram className='hover:scale-150 hover:text-blue-800' />
                    </a>
                    <a target="_blank" href={"https://instagram.com/_redesaude?igshid=OGQ5ZDc2ODk2ZA=="}>
                      <FaInstagram className='hover:scale-150 hover:text-pink-800' />
                    </a>
                </ul>
            </div>
          </div>
        </Container>
        <div className="text-center text-xs">
        © 2024 Rede Exames Online. | Todos os direitos reservados
      </div>
      </div>
    </div>
  );
};

export default Navbar;
