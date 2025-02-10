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
    author: author,
    file_url: string,
    preview_url: string,
    comment_count:number,
    score:number,
    width: number,
    height: number
    user: user
}



export type author = {
    id: number,
    url: string,
    subscribers: user[],
    picture: string,
    banner: string,
    user: number
}

export type user = {
    id: number,
    username: string,
    email: string,
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
    user: user,

    owner: string,
    file_url:string,
    preview_url: string
}

export type featuredCategory = {
    imageUrl: string,
    imageWidth: number,
    imageHeight: number,
    url: string,
    name: string
}

export type folder = {
    id: number,
    name: string,
    items: fullPost[],
    private: boolean,
    owner: string
}