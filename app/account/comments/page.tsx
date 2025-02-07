import Comment from "@/app/components/ui/comment";
import Header from "@/app/components/ui/header/header";
import { comment } from "@/app/types";

export default function CommentsPage(){
    const comments:comment[] = [
        {
            id:1,
            content: 'oi eu sou o content',
            username: 'username',
            likes: 0,
            userpicture: 'stringue',
            $:{
                body:'',
                creator: '',
                id: 1,
            }
        }
    ]
    return(
        <div className="page-config" data-scroll-restoration-id="account">
            <Header/>
            <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
                {comments.map((cmnt, idx)=>{
                    return(
                        <Comment key={idx} comment={cmnt}/>
                    )
                })}
            </main>
        </div>
    )
}