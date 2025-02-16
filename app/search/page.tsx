import axios from "axios";
import ListPosts from "../components/ui/listpost-infinite-scroll";
import Header from "../components/ui/header/header";
import type { PageProps } from "@/.next/types/app/page";
import type { Metadata, ResolvingMetadata } from 'next'
import Script from "next/script";
import { post } from "../types";
import Head from "next/head";
import AdComponent from "../components/services/adloader";
import Nav from '../components/ui/mobile-nav'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   
  export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const kw = (await searchParams).q
    const resp = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${kw}&limit=25&pid=1&json=1`);
    const data:post = resp.data[0]

    const regex = /score:\s*[<>=]=?\s*\d+/g;
    const readyToTitle = kw.replace(regex, "").trim().replace(/\s+,/g, ",");
    


    if(data){
      return {
        title: `NSFW Hub | Porn Images tagged with ${readyToTitle}`,
        description: `Explore a growing gallery of hot images tagged with ${readyToTitle} at NSFWHub.net 
                      Here you can find the biggest variety of the hottest XXX posts containing on the internet. 
                      If it exists, there's porn of it`,
        keywords: data.tags,
        twitter:{
          title: `NSFW Hub | Images tagged ${readyToTitle}`,
          images: [data.preview_url?data.preview_url:'img/anime.png.']
        },
        openGraph:{
          title: `NSFW Hub | Porn Images tagged with ${readyToTitle}`,
          description: `Explore a growing gallery of hot images tagged with ${readyToTitle} at NSFWHub.net 
                      Here you can find the biggest variety of the hottest XXX posts containing on the internet. 
                      If it exists, there's porn of it`,
          
          type: "website",
          siteName: "NSFW Hub",
          url: "https://nsfwhub.net",
          images: [data.preview_url?data.preview_url:'img/anime.png.']
          
        }
      }
    }

    else{
      return {
        title: `NSFW Hub | Porn Images tagged with ${readyToTitle}`,
        description: `Explore a growing gallery of hot images tagged with ${readyToTitle} at NSFWHub.net 
                      Here you can find the biggest variety of the hottest XXX posts containing on the internet. 
                      If it exists, there's porn of it`,
        applicationName: 'NSFW Hub',
        keywords: readyToTitle,
        other:{
          rating: 'RTA-5042-1996-1400-1577-RTA',
        },
        twitter:{
          title: `NSFW Hub | Porn Images tagged with ${readyToTitle}`,
          images: ['img/anime.png.']
        },
        openGraph:{
          title: `NSFW Hub | Porn Images tagged with ${readyToTitle}`,
          description: `Explore a growing gallery of hot images tagged with ${readyToTitle} at NSFWHub.net 
                      Here you can find the biggest variety of the hottest XXX posts containing on the internet. 
                      If it exists, there's porn of it`,
          
          type: "website",
          siteName: "NSFW Hub",
          url: "https://nsfwhub.net",
          images: ['img/anime.png.']
          
        }
      }
    }
   
    
  }

export default async function SearchPage({ params, searchParams }: PageProps ) {
    const search = (await searchParams).q;


    const regex = /score:\s*[<>=]=?\s*\d+/g;
    const readyToTitle = search.replace(regex, "").trim().replace(/\s+,/g, ",");
 
    

    // Primeira requisição via SSR
    const resp = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${search}&limit=25&pid=1&json=1`);
    const initialPosts = resp.data || [];

    return (
        <div className="page-config" data-scroll-restoration-id="search">
          
                  
          <Header/>
          

            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8 justify-center items-center">
              {
                readyToTitle.length > 2
                ?<h1 className="title mt-8">Images tagged with {readyToTitle}</h1>
                :<h1>Search on NSFHUB</h1>
              }
              
              <section className="flex justify-center items-center ad-banner" id='banner-billboard'>
                <AdComponent zoneId="1079708" type="billboard"/>

              </section>
                {initialPosts.length ? <ListPosts search={search} initialPosts={initialPosts} /> : <span>Nothing found</span>}

                
            </main>
            <Nav/>
            
        </div>
    );
}