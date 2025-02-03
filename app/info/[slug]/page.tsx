import { PageProps } from "@/.next/types/app/page";
import Header from "@/app/components/header/header";
import './style.css'

export default async function InfoPage({params, searchParams}:PageProps){
    const slug = (await params).slug
    return(
        <div className="page-config" style={{overflowY:'scroll'}} data-scroll-restoration-id="home">
            <Header/>
              <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="my-10 text-center text-2xl">{slug}</h1>

                <div id="test-div"></div>
              </main>
            </div>
    )
}