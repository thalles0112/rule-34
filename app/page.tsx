import axios from "axios";
import FeaturedCategories from "./components/ui/featured-categories";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header/header";
import ListPosts from "./components/ui/listpost";
import { featuredCategory, post } from "./types";
import type { Metadata } from "next";
import Script from "next/script";
import AdComponent from "./components/services/adloader";
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: "Home | NSFW Hub",
  description: "🔥 Dive into the ultimate collection of free adult content! Rule 34, insane hentai, cartoon XXX, sizzling hot images, and whatever your fantasies crave—all in one place! 😈💦",
  applicationName: 'NSFW Hub',
  other:{
    rating: 'RTA-5042-1996-1400-1577-RTA',
  },
  twitter:{
    title: "NSFW Hub",
    images: ["https://nsfwhub.net/img/anime.png"]
  },
  openGraph:{
    title:"NSFW Hub",
    description:"🔥 Dive into the ultimate collection of free adult content! Rule 34, insane hentai, cartoon XXX, sizzling hot images, and whatever your fantasies crave—all in one place! 😈💦",
    type: "website",
    siteName: "NSFW Hub",
    url: "https://nsfwhub.net",
    images: ["https://nsfwhub.net/img/anime.png"]
    
  }
};


export default async function Home() {
  let imageUrl = '/img/hugeass.webpg'
  //imageUrl = '/img/super-choquewebpg'






  let resp = await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=score:>50 anime&limit=20&pid=1&json=1')
  let posts = resp.data




  /*
  let posts:post[] =  [
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    {
      imageUrl: imagwebpl,
      previewImageUrl:  imagwebpl,
      title: 'super choque',
      tags: 'umatag,outratag,maisoutratag',
      saves:3,
      likes:20,
      comments: 4,
      favorites: 1,
      url: '/p/superchoque-voano',
      author: 'goku',
      authorpicture: '/img/profile.jpeg'
    },
    

  ]
  */


  const categories: featuredCategory[] = [
    {
      name: 'Juicy ass',
      imageUrl: '/img/juicy-ass.webp',
      imageWidth: 397,
      imageHeight: 256,
      url: '/search/?q=juicy_ass'
    },
    {
      name: 'Cute',
      imageUrl: '/img/cute.webp',
      imageWidth: 397,
      imageHeight: 256,
      url: '/search/?q=cute score:>100'
    },
    {
      name: 'Anal',
      imageUrl: '/img/anal.webp',
      imageWidth: 397,
      imageHeight: 256,
      url: '/search/?q=anal'
    },
    {
      name: '2B',
      imageUrl: '/img/2b.webp',
      imageWidth: 397,
      imageHeight: 256,
      url: '/search/?q=yorha_2b score:>100'
    },
    {
      name: 'Anime',
      imageUrl: '/img/anime.webp',
      imageWidth: 397,
      imageHeight: 256,
      url: '/search/?q=anime'
    }

  ]






  return (
    <div className="page-config" style={{ overflowY: 'scroll' }} data-scroll-restoration-id="home">
      <Header />
      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-4">
        
        <section className="flex justify-center items-center">
          <h1 className="text-xl w-full p-2 font-bold text-center title">NSFW <span className="accent-color">HUB</span></h1>
        </section>

        <section className="flex justify-center items-center ad-banner" id='banner-billboard'>
          <AdComponent type="billboard"/>
        </section>


        <section className="flex flex-col p-4 gap-y-4 justify-center items-center section-bg">
          <h2 className="subtitle"><span className="accent-color">Featured</span> tags</h2>
          <FeaturedCategories categories={categories} />
        </section>


        <section className="flex flex-col gap-y-4 justify-center items-center section-bg p-4">
          <h2 className="subtitle" >For <span className="accent-color">you</span></h2>
          <ListPosts posts={posts} />
        </section>


        <section id="site-description" className="flex flex-col justify-center items-center section-bg p-4 rounded-md text-sm dark:text-gray-400 text-gray-500  max-sm:w-11/12 sm:w-10/12 mx-auto">
          <div className="" translate="no">
            <h1 className="title dark:text-white text-black mb-12">NSFWHUB.net the NSFW Artwork's home</h1>
            <h2 className="subtitle">Welcome to the Future of NSFW Content</h2>
            <p>NSFWHUB.net is the new leading platform for high-qualityNSFW artwork, 
              featuring the most extensive and diverse collection of drawn and 
              3D-rendered adult images on the internet. Whether you're an 
              enthusiast of digital erotica, fantasy illustrations, or ultra-detailed 3D 
              models, we provide a seamless and private browsing experience designed 
              for true connoisseurs.
            </p>

            <h2 className="subtitle">Unmatched Variety &amp; Diversity</h2>
            <p>Find whatever you want to see in porn version here.
              If it exists, there will be porn of it. From anime-inspired illustrations 
              to hyper-realistic 3D renders, 
              NSFWHUB.net brings together artists and creators from all over the world, 
              celebrating the beauty of artistic expression in all its forms. We proudly 
              support diverse kinks, niche preferences, and unconventional aesthetics, 
              making sure everyone feels represented and excited.
            </p>
            
            <h2 className="subtitle">The Largest NSFW Image Gallery on the Web</h2>
            <p>With millions of high-resolution images, we house the most comprehensive 
              collection of digital adult artwork. Our intuitive tagging system and smart search 
              algorithms ensure that you can find precisely what you're looking for with minimal effort. 
              Whether you crave cyberpunk fantasies, gothic aesthetics, or futuristic AI-generated 
              erotica, it's all here at your fingertips.
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
              
                  <h2 className="subtitle">Join the Largest NSFW Art Community Today</h2>
                  
                  <p>Become part of a thriving community that values high-quality 
                    NSFW artwork, respectful engagement, and artistic appreciation. 
                    Whether you're here to explore, collect, or create, NSFWHUB.net 
                    is the ultimate hub for digital adult content.
                  </p>
                  
                  <p>Start browsing now and unlock a new dimension of NSFW creativity!</p><p>
              </p>

          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
