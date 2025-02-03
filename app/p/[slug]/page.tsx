import { fullPost } from "@/app/types";
import Header from "../../components/header/header";
import PostInteractions from "@/app/components/post-interactions";
import axios from "axios";
import {parseStringPromise} from 'xml2js'
import './style.css'
import type { Metadata, ResolvingMetadata } from 'next'
import type { PageProps } from "@/.next/types/app/page";
import CustomImage from "@/app/components/Image";

 


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
    title: post.data[0].tags,
    openGraph: {
      images: [post.data.file_url,],
      
    },
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
      comments: [
        
        
      ],
      title: '',
      url: '',
      author: {
        name: '',
        id: 1,
        url: '',
        subscriptions: 1,
        picture: ''
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
                    alt="Imagem personalizada"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-contain post-image-max-height"
                  />
                  
                  }
                    
                  </div>
                  
                </section>

                <PostInteractions post={post}/>
              </main>

              
        </div>
    )
}