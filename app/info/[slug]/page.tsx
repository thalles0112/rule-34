import { PageProps } from "@/.next/types/app/page";
import Header from "@/app/components/ui/header/header";
import './style.css'
import type { Metadata, ResolvingMetadata } from 'next'
import Script from "next/script";
import AdComponent from "@/app/components/services/adloader";

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  
 
  // optionally access and extend (rather than replace) parent metadata
  
 
  return {
    title: `${slug} | NSFW Hub`,
    applicationName: 'NSFW Hub',
    other:{
      rating: 'RTA-5042-1996-1400-1577-RTA',
    },
    openGraph:{
      title:"NSFW Hub",
      description:"🔥 Dive into the ultimate collection of free adult content! Rule 34, insane hentai, cartoon XXX, sizzling hot images, and whatever your fantasies crave—all in one place! 😈💦",
      type: "website",
      siteName: "NSFW Hub",
      url: "https://nsfwhub.net",
      images: ["https://nsfwhub.net/img/anime.png"]
      
    }
  }
}

export default async function InfoPage({params, searchParams}:PageProps){
    const slug = (await params).slug
    return(
        <div className="page-config" style={{overflowY:'scroll'}} data-scroll-restoration-id="home">
            <Header/>
              <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="my-10 text-center text-2xl">{slug.replace('%20', ' ').replace('%20', ' ')}</h1>

                <section className="flex justify-center items-center ad-banner" id='banner-billboard'>
                <AdComponent type="billboard"/>
              </section>

              <section>
                {slug=="About"?"NSFW Hub does not host and does not own the content in this site, it only indexes. We use ads to mantain the site online. No data is collected":'< Page still in construction, come later. :D/> '}
              </section>

              

              </main>
            </div>
    )
}