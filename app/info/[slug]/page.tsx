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
     

      case 'updates':

        return <section>
                <h2>Latest updates will be displayed here :D</h2>
                <ul className="text-left font-mono">
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">19/02/2024</span> - Removed recaptcha from login form as it is not working yet</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">19/02/2024</span> - Better scroll restauration on home and search page</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">18/02/2024</span> - Publishing posts is now working, but they can't be visible to public yet</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">17/02/2024</span> - Removed popunder banner and added bottom navigator on mobile</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">13/02/2024</span> - Quickies added, now you can watch short videos just like in instagram's reels</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">11/02/2024</span> - You can change your picture and profile banner</li>
                  <li className="my-2"><span className="p-1 bg-slate-200 rounded-md dark:bg-gray-800">08/02/2024</span> - Login and registration working</li>

                </ul>
              </section> 
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
            <div className="page-config">
              <Header />
              <main  className="lg:px-24 max-sm:px-4 flex flex-col gap-y-4">
                <h1 className="my-10 text-center text-2xl">{slug.replace('-', ' ').replace('-', ' ')}</h1>

                <p>Support-me, click in the ad {'<3'}</p>
                <section className="flex flex-col justify-center items-center ad ad-banner overflow-hidden" id='banner-billboard'>
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