import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Modules/Header/Header";
import Footer from "@/components/Modules/Footer/Footer";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Music Melody",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kumbh.className} flex flex-col min-h-screen bg-black/80 text-white`}
      >
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
