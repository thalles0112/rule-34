import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ScrollRestoration } from "next-scroll-restoration";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400']
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="juicyads-site-verification" content="bf40bfba1605fa392b157c2c22a110b8" />
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <ScrollRestoration/>
          
        
      </body>
    </html>
  );
}
