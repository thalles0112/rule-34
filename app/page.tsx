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






  let resp = await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=score:>100 anime&limit=40&pid=1&json=1')
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
      imageUrl: '/img/2d.webp',
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
      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
        <section className="h-32 flex justify-center items-center">
          <h1 className="text-xl rounded-md w-full p-2 font-bold text-center accent-color title">NSFW HUB</h1>
        </section>

        <section className="flex justify-center items-center ad-banner" id='banner-billboard'>
          <AdComponent type="billboard"/>
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle"><span className="accent-color">Featured </span>tags</h2>
          <FeaturedCategories categories={categories} />
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle" >For <span className="accent-color">you</span></h2>
          <ListPosts posts={posts} />
        </section>


        <section id="site-description" className="flex flex-col justify-center items-center section-bg p-4 rounded-md text-sm dark:text-gray-400 text-gray-500  max-sm:w-11/12 sm:w-10/12 mx-auto">
          <div className="" translate="no">
            <h1 className="title dark:text-white text-black mb-12"><span>NSFWHUB.net the NSFW Artwork's home</span></h1>
            <h2 className="subtitle"><span>Welcome to the Future of NSFW Content</span></h2>
            <p><span>NSFWHUB.net is the </span>
              <span><strong>leading platform</strong></span>
              <span> for high-quality </span>
              <span><strong>NSFW artwork</strong></span>
              <span>, featuring the most extensive and diverse collection of </span>
              <span><strong>drawn and 3D-rendered adult images</strong></span>
              <span> on the internet. Whether you're an enthusiast of </span>
              <span><strong>digital erotica, fantasy illustrations, or ultra-detailed 3D models</strong></span>
              <span>, we provide a seamless and private browsing experience designed for true connoisseurs.</span>
            </p>

            <h2 className="subtitle"><span>Unmatched Variety &amp; Diversity</span></h2>
            <p>
              <span>Our extensive </span>
              <span><strong>gallery</strong></span>
              <span> spans across multiple genres, themes, and styles, ensuring that every visitor finds something that suits their unique tastes. From </span>
              <span><strong>anime-inspired illustrations to hyper-realistic 3D renders</strong></span>
              <span>, NSFWHUB.net brings together artists and creators from all over the world, celebrating the beauty of artistic expression in all its forms. We proudly support </span>
              <span><strong>diverse kinks, niche preferences, and unconventional aesthetics</strong></span>
              <span>, making sure everyone feels represented and excited.</span></p>
              
              <h2 className="subtitle"><span>The Largest NSFW Image Gallery on the Web</span></h2>
              <p>
                <span>With </span><span><strong>millions of high-resolution images</strong></span>
                <span>, NSFWHUB.net houses the most </span>
                <span><strong>comprehensive collection</strong></span>
                <span> of digital adult artwork. Our intuitive </span>
                <span><strong>tagging system</strong></span>
                <span> and </span>
                <span><strong>smart search algorithms</strong></span>
                <span> ensure that you can find precisely what you're looking for with minimal effort. Whether you crave </span>
                <span><strong>cyberpunk fantasies, gothic aesthetics, or futuristic AI-generated erotica</strong></span>
                <span>, it's all here at your fingertips.</span></p><h2 className="subtitle"><span>A Seamless, Fast &amp; Private Browsing Experience</span>
                
                </h2>
                  <ul data-spread="false"><li><p><span><strong>Lightning-Fast Performance</strong></span>
                    <span> – Optimized servers ensure smooth and quick navigation, even for high-resolution media.</span></p></li>
                    <li><p><span><strong>Robust Privacy</strong></span><span> – We prioritize </span><span><strong>user anonymity</strong></span>
                    <span> with encrypted browsing and zero intrusive tracking.</span></p></li>
                    <li><p><span><strong>Mobile-Friendly Design</strong></span>
                    <span> – Fully responsive and </span><span><strong>easy to navigate</strong></span><span> on any device, from desktops to smartphones.</span></p></li>
                    <li><p><span><strong>Bookmark &amp; Save Features</strong></span><span> – Easily organize and revisit your favorite galleries.</span></p></li>
                    <li><p><span><strong>Community-Driven Ratings &amp; Reviews</strong></span><span> – Engage with other enthusiasts by leaving feedback and sharing recommendations.</span></p></li>
                  </ul>
                  
                  <h2 className="subtitle"><span>Exclusive 3D Renders &amp; AI-Generated NSFW Content</span></h2>
                  <p>
                    <span>NSFWHUB.net pushes the boundaries of digital erotica by offering exclusive </span>
                    <span><strong>3D-modeled adult content</strong></span><span> and </span><span><strong>AI-enhanced creations</strong></span>
                    <span>. Our </span><span><strong>cutting-edge AI technology</strong></span><span> refines every image to ensure </span>
                    <span><strong>unmatched realism, detail, and artistic perfection</strong></span><span>. As digital artistry continues to evolve, our platform remains at the forefront, bringing you the latest advancements in </span>
                    <span><strong>adult digital media</strong></span><span>.</span>
                  </p>
                    
                  <h2 className="subtitle"><span>Safe, Secure, and Always Accessible</span></h2>
                  <p>
                    <span>We understand the importance of a </span>
                    <span><strong>safe</strong></span><span> and </span>
                    <span><strong>discreet</strong></span><span> browsing experience. NSFWHUB.net guarantees </span>
                    <span>navigation with </span>
                    <span><strong>no pop-ups</strong></span><span> or annoying distractions. Your data and preferences remain completely private, ensuring a worry-free journey into the world of NSFW digital art.</span>
                  </p>
                  
                  <h2 className="subtitle"><span>Join the Largest NSFW Art Community Today</span></h2>
                  
                  <p><span>Become part of a </span>
                    <span><strong>thriving community</strong></span>
                    <span> that values high-quality </span>
                    <span><strong>NSFW artwork</strong></span>
                    <span>, respectful engagement, and artistic appreciation. Whether you're here to explore, collect, or create, NSFWHUB.net is the ultimate hub for digital adult content.</span>
                  </p>
                  
                  <p><span><strong>Start browsing today and unlock a new dimension of NSFW creativity!</strong></span></p><p>
              </p>

          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
