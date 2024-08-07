import { Nunito } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Modals/CreateServiceModal";
import Head from "next/head";
import PartnerModal from "./components/Modals/CreatePartnerModal";
import Footer from "./components/Footer";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RedeExames.Online",
  description: "Um App para Marcaçao de Serviços Medicos",
  icons: "./favicon.ico"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <PartnerModal />
          <LoginModal />
          <RegisterModal />
        <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
          <footer>
            <Footer />
          </footer>
        </body>
    </html>
  );
}
