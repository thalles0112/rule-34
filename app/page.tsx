import axios from "axios";
import FeaturedCategories from "./components/featured-categories";
import Footer from "./components/footer";
import Header from "./components/header/header";
import ListPosts from "./components/listpost";
import { featuredCategory, post } from "./types";
import type { Metadata } from "next";
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: "NSFW HUB",
  description: "Explore NSFW images at your mom's ass online for free. Create, comment and save your favorite arts",
};


export default async function Home() {
  let imageUrl = '/img/hugeass.jpeg'
  //imageUrl = '/img/super-choque.jpg'
  
  


  
  
      let resp = await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=ai_generated&limit=25&pid=1&json=1')
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
      name:'3D',
      imageUrl: imageUrl,
      imageWidth:600,
      imageHeight:400,
      url: '/search/?q=3d'
    },
    {
      name:'2D',
      imageUrl: '/img/2d.png',
      imageWidth:600,
      imageHeight:400,
      url: '/search/?q=2d'
    },
    {
      name:'Dragon Ball',
      imageUrl: '/img/dragonball.png',
      imageWidth:600,
      imageHeight:400,
      url: '/search/?q=dragon_ball'
    },
    {
      name:'Ass',
      imageUrl: '/img/ass.jpg',
      imageWidth:600,
      imageHeight:400,
      url: '/search/?q=ass'
    },
    {
      name:'Anime',
      imageUrl: '/img/anime.png',
      imageWidth:600,
      imageHeight:400,
      url: '/search/?q=anime'
    }

  ]

  
    

  
  
  return (
    <div className="page-config" style={{overflowY:'scroll'}} data-scroll-restoration-id="home">
      <Header/>
      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
        <section className="h-32 flex justify-center items-center">
          <h1 className="text-2xl font-bold">Sitename</h1>
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle">Featured tags</h2>
          <FeaturedCategories categories={categories}/>
        </section>


        <section className="flex flex-col justify-center items-center section-bg p-4 rounded-md">
          <h2 className="subtitle">Recommended posts</h2>
          <ListPosts posts={posts}/>
        </section>


       

     
      </main>
      
      <Footer/>
    </div>
  );
}
