import { FormEvent } from "react"

export default function NameForm({active, closer}:{active:boolean, closer:(v:boolean)=>void}){

    function submitHandler(e:FormEvent){
        e.preventDefault()
    }
   
    return(
        <div className={active?"w-full h-full fixed top-0 left-0 z-10 flex justify-center items-center":'hidden'}>
            <div onClick={()=>{closer(false)}} className={`fixed transition duration-100 ${active?'bg-opacity-50':'bg-opacity-0'}  w-full h-full top-0 left-0 bg-black`}>
                
            </div>
            <form onSubmit={submitHandler} className="border dark:bg-gray-900 rounded-md bg-white flex flex-col w-72 h-44 p-4  z-20 opacity-100">
                <label className="text-sm">New user name</label>
                <input className="bg-transparent border-b outline-none"/>

                <button type="submit" className="border rounded-md mt-10 p-4">Save</button>
            </form>
        </div>
        
    )
}