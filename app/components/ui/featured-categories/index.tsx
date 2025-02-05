import { featuredCategory } from "@/app/types"
import Link from "next/link"
import './style.css'
import Image from "next/image"

export default function FeaturedCategories({categories}:{categories:featuredCategory[]}){
    return (
    <div className="flex flex-col gap-2 grid-container">
    
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
        <Link href={categories[0].url}>
        <article className="categoria-item">
        <figure>
            <img
            src={categories[0].imageUrl}
            alt={"Explore "+categories[0].name+" tagged posts"}
            width={categories[0].imageWidth}
            height={categories[0].imageHeight}
            
            className="max-h-full max-w-full object-contain"
            />
            <figcaption className="categoria-nome">{categories[0].name}</figcaption>
        </figure>
        </article>
        </Link>

        <Link href={categories[1].url}>
        <article className="categoria-item">
        <figure className="flex justify-center items-center">
            <img
            src={categories[1].imageUrl}
            alt={"Explore "+categories[1].name+" tagged posts"}
            width={categories[1].imageWidth}
            height={categories[2].imageHeight}
            
            className="max-h-full max-w-full object-contain"
            />
            <figcaption className="categoria-nome">{categories[1].name}</figcaption>
        </figure>
        </article>
        </Link>
    </div>
    
    <div className="grid lg:grid-cols-3 gap-2">
        <Link href={categories[2].url}>
            <article className="categoria-item">
            <figure>
                <img
                src={categories[2].imageUrl}
                alt={"Explore "+categories[2].name+" tagged posts"}
                width={categories[2].imageWidth}
                height={categories[2].imageHeight}
                
                />
                <figcaption className="categoria-nome">{categories[2].name}</figcaption>
            </figure>
            </article>
        </Link>
        <Link href={categories[3].url}>
            <article className="categoria-item">
            <figure>
                <img
                src={categories[3].imageUrl}
                alt={"Explore "+categories[3].name+" tagged posts"}
                width={categories[3].imageWidth}
                height={categories[3].imageHeight}
                
                />
                <figcaption className="categoria-nome">{categories[3].name}</figcaption>
            </figure>
            </article>
        </Link>
        <Link href={categories[4].url}>
            <article className="categoria-item">
            <figure>
                <img
                src={categories[4].imageUrl}
                alt={"Explore "+categories[4].name+" tagged posts"}
                width={categories[4].imageWidth}
                height={categories[4].imageHeight}
                
                />
                <figcaption className="categoria-nome">{categories[4].name}</figcaption>
            </figure>
            </article>
        </Link>
    </div>
  </div>
    )
}