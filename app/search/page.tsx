import axios from "axios";
import ListPosts from "../components/listpost-infinite-scroll";
import Header from "../components/header/header";
import type { PageProps } from "@/.next/types/app/page";
import type { Metadata, ResolvingMetadata } from 'next'
import Script from "next/script";


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
   
    
   
    return {
      title: `Images with ${kw} tags`,
      description: `Immerse yourself in ${kw} fresh adult content. Find the hottest images and tags to fap to.`,
      openGraph: {
        images: ['/some-specific-page-image.jpg',],
      },
    }
  }

export default async function SearchPage({ params, searchParams }: PageProps ) {
    const search = (await searchParams).q;

    let className = 'static'

 
    

    // Primeira requisição via SSR
    const resp = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${search}&limit=25&pid=1&json=1`);
    const initialPosts = resp.data || [];

    return (
        <div className="page-config" data-scroll-restoration-id="search">
          <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8 justify-center items-center">
                {initialPosts.length ? <ListPosts search={search} initialPosts={initialPosts} /> : <span>Nothing found</span>}
            </main>
            
        </div>
    );
}