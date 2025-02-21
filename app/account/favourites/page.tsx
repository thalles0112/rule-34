import Header from "@/app/components/ui/header/header";
import ListPosts from "@/app/components/ui/listpost";

export default function FavouritesPage(){
    return(
        <div className="page-config" data-scroll-restoration-id="account">
            <Header/>
            
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                <h1 className="my-10 text-center">My Favourites</h1>
                <ListPosts canDelete={false} posts={[]}/>
            </main>
        </div>
    )
}