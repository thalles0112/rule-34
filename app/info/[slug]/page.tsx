import { PageProps } from "@/.next/types/app/page";
import Header from "@/app/components/ui/header/header";
import './style.css'
import type { Metadata, ResolvingMetadata } from 'next'
import Script from "next/script";
import AdComponent from "@/app/components/services/adloader";
import Footer from "@/app/components/ui/footer";

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  
 
  // optionally access and extend (rather than replace) parent metadata
  
 
  return {
    title: `${slug.replace("%20", " ")} | NSFW Hub`,
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

    
    
  
    
  function RenderComponent(){
    switch(slug) {  
      case 'support-me':
      return <span>Wanna support the development of this site? Click in the ads and navigate a little bit on the sponsor's site or
        simply donate:
        <ul className="bg-zinc-700 rounded-md flex gap-4 p-2 w-fit mx-auto mt-10">
          <li className="bg-green-600 p-2 rounded-md">
            <a href="https://buy.stripe.com/6oE14udXp9jueGY4gg">Donate $5.00</a>
          </li>

          <li className="bg-green-600 p-2 rounded-md">
            <a href="https://buy.stripe.com/aEU5kK3iL3Za42k6op">Donate $10.00</a>
          </li>
          
          <li className="bg-green-600 p-2 rounded-md">
            <a href="https://buy.stripe.com/bIYfZo5qT7bm7ew28a">Donate $15.00</a>
          </li>
        </ul>
      </span>

      case 'about':
        return <span>NSFW Hub does not host and does not own the content in this site, it only indexes. We use ads to mantain the site online.</span>

      case 'terms-of-service':
        return <p>NSFW Hub is completely free to use, you can create an account and delete it any time you want. Once you delete your account all your data will be lost too.</p>
      
      case 'privacy-policy':
        return <p>NSFW Hub does not share any information you provide with anyone. We use your email just for functional purposes like recovering password</p>
      
      case 'help-center':
        return <p>Need help? send me an <a className="underline" href="mailto:nsfwhub@gmail.com">email</a></p>

      case 'contact':
        return <p>Need any information? Ask <a href="mailto:nsfwhub@gmail.com">here</a></p>
      
      case 'advertise':
          return <p>This site shows ads provided by JuicyAds. wanna advertise your site/product? <br/><a className="underline" href="mailto:nsfwhub@gmail.com">email me</a></p>

      default:
        return <span>Page still in development</span>
  }

  }
    
    return(
        <div className="page-config" style={{overflowY:'scroll'}} >
            <Header/>
              <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="my-10 text-center text-2xl">{slug.replace('-', ' ').replace('-', ' ')}</h1>

                <section className="flex justify-center items-center ad-banner" id='banner-billboard'>
                <AdComponent zoneId="1079708" type="billboard"/>
              </section>

              <section className="flex justify-center text-center">
                <RenderComponent/>
              </section>

              

              </main>
              <Footer/>
            </div>
    )
}