import Image from 'next/image'
import './style.css'
import { IoLogoInstagram, IoLogoTwitch, IoLogoTwitter } from 'react-icons/io5'
import Link from 'next/link'


export default function Footer(){
    const categories = [
        [
            {
                name:'About',
                slug:'about'
            },
            {
                name:'Contact',
                slug:'contact'
            },
            {
                name:'Support me',
                slug:'support-me'
            },
        ],

        [
            {
                name:'Advertise',
                slug:'advertise'
            },
            {
                name:'Terms of service',
                slug:'terms-of-service'
            }
        ],
        [
            {
                name:'Privacy Policy',
                slug:'privacy-policy',
            },
            {
                name:'Copyright Policy',
                slug:'copyright-policy',
            },
            {
                name:'Help Center',
                slug:'help-center'
            }
            
            
            
        ]
        

    ]
    return (
        <footer className="flex p-4 mt-10 footer-bg ">
            <div className='flex flex-wrap justify-start gap-y-10 mx-auto'>
                
                <section className='category'>
                    <img width={200} height={200} className='max-w-20' alt='site logo' src={'/img/sitelogo.png'}/>
                    <div className='flex gap-2 justify-center'>
                    <a aria-label='Visit NSFW Hub Twitter (x.com)' href='https://x.com/nsfwhub_net' target='_blank'>
                        <IoLogoTwitter/>          
                    </a>
                    
                            
                    </div>
                </section>
                {
                    categories.map((pages, idx)=>{
                        return(
                            <section className='category' key={idx} >
                                <ul>
                                    {
                                        pages.map((page,idx)=>{
                                            return(
                                                <li key={idx} className='text-sm font-bold mb-6 page-item'>
                                                    <Link href={`/info/${page.slug}`}>
                                                        {page.name}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    
                                </ul>
                            </section>
                        )
                    })
                }
               
            </div>
        </footer>
    )
}