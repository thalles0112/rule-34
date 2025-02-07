export default function Settings(){
    return(
        <section>
            <ul className="space-y-2">                            
                <li className="relative p-2 border-l hover:border-main-color">
                    <label className="cursor-pointer">Change profile name</label>
                    <input placeholder="Change profile picture" type="file" className="cursor-pointer h-full opacity-0 absolute top-0 left-0"/>
                </li>

                
                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Change profile picture</label>
                    <input placeholder="Change profile picture" type="file" className="cursor-pointer h-full opacity-0 absolute top-0 left-0"/>
                </li>
                
                
                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Change profile banner</label>
                    <input placeholder="Change profile picture" type="file" className="cursor-pointer h-full opacity-0 absolute top-0 left-0"/>
                </li>

                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Custom filters</label>
                </li>
                
                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">Liked posts</label>
                </li>

                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">My favourites</label>
                </li>

                <li className="relative p-2 border-l">
                    <label className="cursor-pointer">My comments</label>
                </li>
            </ul>
        </section>
    )
}