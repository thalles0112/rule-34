import axios from "axios";
import FeaturedCategories from "./components/ui/featured-categories";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header/header";
import ListPosts from "./components/ui/listpost-infinite-scroll";
import { featuredCategory, post } from "./types";
import type { Metadata } from "next";
import Script from "next/script";
import AdComponent from "./components/services/adloader";
import Nav from './components/ui/mobile-nav/index'
export const dynamic = 'force-dynamic'

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


export default async function Home() {






  const tag = process.env.TAG || ''




  return (
    <div className="page-config">
      <Header />
      <main data-scroll-restoration-id="home" className="lg:px-24 max-sm:px-4 flex flex-col gap-y-4">
        
        <section className="flex justify-center items-center">
          <h1 className="text-xl w-full p-2 font-bold text-center title">Hot <span className="accent-color">Porn</span> Images in NSFWHUB</h1>
        </section>
 {/**
        <section className="flex justify-center w-full  mx-auto items-center ad ad-banner overflow-hidden" id='banner-billboard'>
          <AdComponent zoneId="1079708" type="billboard"/>  
        </section>
**/}

      

        <section className="flex flex-col gap-y-4 justify-center items-center section-bg p-4">
          <h2 className="subtitle" >For <span className="accent-color">you</span></h2>
          
          <ListPosts search={tag}  />
          
          
          
        </section>
{/**
        <section className="flex justify-center w-full overflow-hidden mx-auto items-center ad-banner" id='banner-billboard'>
           <AdComponent zoneId="1079708" type="billboard"/> 
        </section>
**/}    


        <section id="site-description" className="flex flex-col justify-center items-center section-bg p-4 rounded-md text-sm dark:text-gray-400 text-gray-500  max-sm:w-11/12 sm:w-10/12 mx-auto">
          <div className="" translate="no">
            <h1 className="title dark:text-white text-black mb-12">NSFWHUB.net the NSFW Artwork's home</h1>
            <h2 className="subtitle">Welcome to the Future of Rule34.xxx</h2>
            <p>NSFWHUB.net is the new rule34.xxx but with better user interface, navigability, AI-based search engine 
              and much more customization. NSFW Hub has the objective to show you what you really wanna see based in
              what you really enjoy, not a bunch of random posts! With a upcoming feed ai your night fap will be much more
              satisfying.
            </p>

            <h2 className="subtitle">All the rule34.xxx content and more!</h2>
            <p>Find whatever you want to see in porn version here.
              If it exists, there will be porn of it. From anime-inspired illustrations 
              to hyper-realistic 3D renders, 
              NSFWHUB.net brings together artists and creators from rule34 and you are also
              able to post your arts here. Exclusive NSFWHUB posts will have more priority to
              be show to users! 
            </p>
            
            <h2 className="subtitle">The Largest NSFW Image Gallery on the Web</h2>
            <p>With more than 10 millions of high-resolution porn images and porn videos, 
              featuring hentai, games, cartoon, 3D animations and whatever can be we offer
              it all fast, secure and private. We use the most new and secure technologies
              to give you the best porn site you will ever use to fap to. No distractions, 
              no popups, no malware, just you and the porn you deserve to jerk off.
            </p>
              
            <h2 className="subtitle">Fast, Private & Easy to Use</h2>
              <ul data-spread="false" className=" list-disc pl-4">
                <li><p>Super Fast Loading: No lag, no waiting, just instant access.</p></li>
                <li><p>Total Privacy: No annoying ads, no tracking, just pure browsing freedom.</p></li>
                <li><p>Works on Any Device: Desktop, phone, tablet—whatever you’re using, it looks and runs smooth.</p></li>
                <li><p>Save Your Favorites: No more losing that one pic you liked.</p></li>
                <li><p>Community Vibes: See whats trending and join the conversation.</p></li>
              </ul>
                  
              <h2 className="subtitle">Exclusive 3D & AI-Enhanced Art</h2>
              <p>
                NSFWHub isn’t just about 2D. We’ve got next-level 3D models and AI-enhanced 
                artwork that push digital erotica to new heights. More detail, more realism, more wow.
                No Pop-ups, No Sketchy Stuff—Just Art
              </p>
                
              <h2 className="subtitle">Safe, Secure, and Always Accessible</h2>
              <p>
                We understand the importance of a safe and discreet 
                browsing experience. We offer a clean, smooth experience 
                where you can enjoy the art without distractions.
                Join the Community & Start Browsing
              </p>
              
              <h2 className="subtitle">Why you should create an account at NSFHUB.net?</h2>
                  
              <p>
                Alhtough you do not need an account to navigate and find the best posts, there are
                some benefits for you when you sign up: When the website is completely developed you will gain a seal
                of first user that is unique, there will be an algorithm that filters the posts that you wanna see, you will
                be able to filter manually tags that you do not wanna see, create folders and save your favorite posts, like
                and favorite posts. We will never send emails unless it's needed, no spam, no boring marketing.
              </p>
              
              <p className="font-bold"><br/>Liked the project? Support it just clicking the ads! You don't even have to pay anything, just click and navigate a little bit on sponsor's website</p>
                  

          </div>
        </section>

      
      </main>
      <Nav/>

      <Footer />
    </div>
  );
}
