import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ScrollRestoration } from "next-scroll-restoration";
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Home | NSFW Hub: Free Porn Images & Videos - Porn, XXX, Rule34, NSFW ",
  description: "Browse the best and growing collection of free porn images and videos! The best Rule 34, hentai, anal, cartoon and whatever you can imagine in one place!",
  keywords: "anal porn hentai anime adult rule34 naked sex hardcore pornography nude breasts tits pussy asshole nsfwhub nsfw",
  applicationName: 'NSFW Hub',
  publisher: 'NSFW Hub',
  other:{
    rating: 'RTA-5042-1996-1400-1577-RTA',
    canonical: '/'
  },
  twitter:{
    title: "NSFW Hub",
    images: ["https://nsfwhub.net/img/anime.png"],
    description: "Browse the best and growing collection of free porn images and videos! The best Rule 34, hentai, anal, cartoon and whatever you can imagine in one place!",
  },
  openGraph:{
    title:"NSFW Hub",
    description: "Browse the best and growing collection of free porn images and videos! The best Rule 34, hentai, anal, cartoon and whatever you can imagine in one place!",
    type: "website",
    siteName: "NSFW Hub",
    url: "https://nsfwhub.net",
    images: ["https://nsfwhub.net/img/anime.png"]
    
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <meta name="juicyads-site-verification" content="bf40bfba1605fa392b157c2c22a110b8" />
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      
      
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <ScrollRestoration/>
          
        
      <Analytics/>
      </body>
      
    </html>
  );
}
