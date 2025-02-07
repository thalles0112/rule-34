import { produce } from "immer";
import { FormEvent, useState } from "react"


export default function CustomFiltersForm({active, closer}:{active:boolean, closer:(v:boolean)=>void}){
    const [tags, setTags] = useState<string[]>([])
    
    function submitHandler(e:FormEvent){
        e.preventDefault()
    }

    const removeTag=(idx:number)=>{
        const nextState = produce(tags, draft=>{
            draft.splice(idx,1)
        })
    
        setTags(nextState)
      }



    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    

        if (e.key === "Enter" && e.currentTarget.value) {
          e.preventDefault()
          const nextState = produce(tags, draft=>{
            draft.push(e.currentTarget.value || '')
          })
          setTags(nextState)
          e.currentTarget.value = "";
          e.preventDefault();
        }
      };
   
    return(
        <div className={active?"w-full h-full fixed top-0 left-0 z-10 flex justify-center items-center":'hidden'}>
            <div onClick={()=>{closer(false)}} className={`fixed transition duration-100 ${active?'bg-opacity-50':'bg-opacity-0'}  w-full h-full top-0 left-0 bg-black`}>
                
            </div>
            <form onSubmit={submitHandler} className="border dark:bg-gray-900 rounded-md bg-white flex flex-col w-72 min-h-44 p-4  z-20 opacity-100">
                <label className="text-sm">Type tags you don't wanna see:</label>
                <input
                    type="text"
                    placeholder="Add tag and press Enter"
                    onKeyDown={(e)=>handleTagKeyDown(e)}
                    className="w-full p-2 border bg-transparent mt-1 rounded outline-none"
                />
                
                <div className="flex gap-1 mt-1 flex-wrap">
                {tags.map((tag,idx)=>{
                    return(
                        <div onClick={()=>{removeTag(idx)}} className="px-2 py-1 border hover:bg-red-400 rounded">
                            {tag}
                        </div>
                    )
                })}
                </div>
                <button type="submit" className="border rounded-md mt-10 p-4">Save</button>
            </form>
        </div>
        
    )
}