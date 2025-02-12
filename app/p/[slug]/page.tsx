import { fullPost } from "@/app/types";
import Header from "../../components/ui/header/header";
import PostInteractions from "@/app/components/ui/post-interactions";
import axios from "axios";
import {parseStringPromise} from 'xml2js'
import './style.css'
import type { Metadata, ResolvingMetadata } from 'next'
import type { PageProps } from "@/.next/types/app/page";
import CustomImage from "@/app/components/ui/Image";
import AdComponent from "@/app/components/services/adloader";

 


type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  const post = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${slug}&json=1`)
 
  // optionally access and extend (rather than replace) parent metadata
  
 
  return {
    title: `NSFW Hub | ${post.data[0].tags}`,
    description:"🔥 Dive into the ultimate collection of free adult content! Rule 34, insane hentai, cartoon XXX, sizzling hot images, and whatever your fantasies crave—all in one place! 😈💦",
    keywords: post.data[0].tags,
    classification: "Adult",
    applicationName: 'NSFW Hub',
    other:{
      rating: 'RTA-5042-1996-1400-1577-RTA',
    },
  
    
    twitter:{
      title: `NSFW Hub | ${post.data[0].tags}`,
      images: [post.data.file_url],
      
    },
    openGraph:{
      title:`NSFW Hub | ${post.data[0].tags}`,
      description:"🔥 Dive into the ultimate collection of free adult content! Rule 34, insane hentai, cartoon XXX, sizzling hot images, and whatever your fantasies crave—all in one place! 😈💦",
      type: "website",
      siteName: "NSFW Hub",
      url: "https://nsfwhub.net",
      images: [post.data.file_url]
      
    }
  }
}

export default async function PostPage({params, searchParams}: PageProps){
    
    const slug = (await params).slug

    let post:fullPost = {
      id: 0,
      previewImageUrl: '',
      imageUrl: '',
      tags: '',
      likes: 1,
      saves: 1,
      favorites: 1,
      user: {
        email:'',
        id: 0,
        username: ''
      },
      comments: [
        
        
      ],
      title: '',
      url: '',
      author: {
        id: 1,
        url: '',
        subscribers: [],
        picture: '',
        banner: '',
        user: 0
      },
      authorpicture: '',
      createdAt: '',
      liked: false,
      saved: false,
      favorited: false,

      owner: '',
      file_url:'',
      preview_url: '',
      }

   
      function sanitizeXML(input:string) {
        return input.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, '&amp;');
 
      }

    async function parseXMLtoJSON(xml:string) {
        try {
          const jsonResult = await parseStringPromise(xml, { explicitArray: false });
          return jsonResult
          
        } catch (error) {
          
        }
      }


      async function getPost(){
        let res = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${slug}&json=1`)
        if(res.data[0].comment_count > 0){
          
          let comments = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=comment&q=index&post_id=${slug}&json=1`)
          let jsonResult = await parseXMLtoJSON(sanitizeXML(comments.data))
          return {...post, ...res.data[0], comments:jsonResult.comments.comment}

        }
        else{
      
          return {...post, ...res.data[0]}
        }
        
        
      }
      
      post = await getPost()
      


    

    return(
         <div className="page-config">
              <Header/>
              <main className="lg:px-24 sm:items-center max-sm:px-4 flex max-sm:flex-col md:flex-row sm:flex-col gap-y-8 page-config--header">
                <section id="post-image" className="relative h-full sm:w-full lg:w-8/12 flex items-center justify-center gap-2">
                  <div className="lg:w-10/12 h-full flex items-center md:w-10/12" >
                  {
                    post.file_url.includes('mp4')
                    ?<video className="w-full h-full object-contain post-image-max-height" controls src={post.file_url} />
                    :<CustomImage
                    src={post.file_url}
                    placeholderSrc={post.preview_url}
                    alt={post.tags}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-contain post-image-max-height"
                  />
                  
                  }
                    
                  </div>
                  
                </section>

                <PostInteractions post={post}/>
                <section id="mobile-ad" title="ad" className="fixed overflow-x-hidden items-center bottom-0 left-0 w-full h-14 overflow-hidden flex justify-center">
                        
                        <div className="max-md:visible md:hidden">
                          <AdComponent zoneId="1080526" type="mobile"/>
                        </div>
                        
                        <div className="flex md:visible max-md:hidden ">
                          <AdComponent zoneId="1080537" type="banner"/>
                          <AdComponent zoneId="1080526" type="mobile"/>
                          <AdComponent zoneId="1080537" type="banner"/>
                        </div>
                      </section>

              </main>
             
        </div>
    )
}