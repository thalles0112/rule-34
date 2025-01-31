import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ScrollRestoration,
          experimental_ScrollRestorationBeforeHydration as ScrollRestorationBeforeHydration
 } from "next-scroll-restoration";


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
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <ScrollRestoration/>
          
        
      </body>
    </html>
  );
}
