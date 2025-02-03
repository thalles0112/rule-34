import axios from "axios";
import FeaturedCategories from "./components/featured-categories";
import Footer from "./components/footer";
import Header from "./components/header/header";
import ListPosts from "./components/listpost";
import { featuredCategory, post } from "./types";
import type { Metadata } from "next";
import Script from "next/script";
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: "NSFW HUB",
  description: "Explore NSFW images at NSFWHUB online for free. Create, comment and save your favorite arts",
};


export default async function Home() {
  let imageUrl = '/img/hugeass.jpeg'
  //imageUrl = '/img/super-choque.jpg'
  
  


  
  
      let resp =  await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=ai_generated+ass+1girls&limit=25&pid=1&json=1')
      let posts = resp.data
      
    
  

  /*
  let posts:post[] =  [
    {
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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
      imageUrl: imageUrl,
      previewImageUrl:  imageUrl,
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

  
  const categories:featuredCategory[] = [
    {
      name:'Explore 3D posts',
      imageUrl: '/img/3d.jpg',
      imageWidth:397,
      imageHeight:256,
      url: '/search/?q=3d'
    },
    {
      name:'Explore 2D posts',
      imageUrl: '/img/2d.png',
      imageWidth:397,
      imageHeight:256,
      url: '/search/?q=2d'
    },
    {
      name:'Explore Dragon Ball posts',
      imageUrl: '/img/dragonball.png',
      imageWidth:397,
      imageHeight:256,
      url: '/search/?q=dragon_ball'
    },
    {
      name:'Explore posts with Ass tag',
      imageUrl: '/img/ass.jpg',
      imageWidth:397,
      imageHeight:256,
      url: '/search/?q=ass'
    },
    {
      name:'EXplore posts with Anime tag',
      imageUrl: '/img/anime.png',
      imageWidth:397,
      imageHeight:256,
      url: '/search/?q=anime'
    }

  ]

  
    

  
  
  return (
    <div className="page-config" style={{overflowY:'scroll'}} data-scroll-restoration-id="home">
      <Header/>
      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
        <section className="h-32 flex justify-center items-center">
          <h1 className="text-xl bg-black text-white dark:bg-white dark:text-black rounded-md w-full p-2 font-bold text-center title">Welcome to NSFW HUB! The biggest gallery of NSFW images</h1>
        </section>

        <section className="border flex justify-center items-center ad-banner" id='banner-billboard'>
          <Script type="text/javascript" data-cfasync="false" async src="https://poweredby.jads.co/js/jads.js"></Script>
          <ins id="1079708" data-width="908" data-height="258"></ins>
          <Script type="text/javascript" data-cfasync="false" async src="/scripts/juicyads.js">
            
          </Script>
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle">Featured tags</h2>
          <FeaturedCategories categories={categories}/>
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle" >For you</h2>
          <ListPosts posts={posts}/>
        </section>


       

     
      </main>
      
      <Footer/>
    </div>
  );
}
