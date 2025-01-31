export type post = {
    id:number,
    previewImageUrl: string,
    imageUrl: string,
    tags: string,
    likes: number,
    saves: number,
    favorites: number,
    comments: number,
    title: string,
    url: string,
    author: string,
    authorpicture: string,
    
    preview_url: string,
    comment_count:number,
    score:number,
    owner: string
}



export type author = {
    name: string,
    id: number,
    url: string,
    subscriptions: number
}

export type comment = {
    content: string,
    id: number,
    username: string,
    userpicture: string,
    likes: number,
    
    $:{
        id: number,
        creator:string,
        body:string
    }
}

export type fullPost = {
    id: number,
    previewImageUrl: string,
    imageUrl: string,
    tags: string,
    likes: number,
    saves: number,
    favorites: number,
    comments: comment[],
    title: string,
    url: string,
    author: author,
    authorpicture: string,
    createdAt: string,
    liked: boolean,
    saved: boolean,
    favorited: boolean,

    owner: string,
    file_url:string
}

export type featuredCategory = {
    imageUrl: string,
    imageWidth: number,
    imageHeight: number,
    url: string,
    name: string
}