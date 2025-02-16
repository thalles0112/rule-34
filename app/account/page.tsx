import Header from "@/app/components/ui/header/header";
import Footer from "../components/ui/footer";
import LoginForm from "../components/ui/login-form";
import { author, post, user } from "../types";
import { IoPersonOutline } from "react-icons/io5";
import type { Metadata } from "next";
import AccountSections from "../components/ui/account-sections";
import axios from "axios";
import { cookies } from "next/headers"; // Import para acessar cookies server-side
import Nav from '../components/ui/mobile-nav'

export const metadata: Metadata = {
  title: "Account | NSFW Hub",
  description:
    "Sign up and start posting your porn art in the largest community of nsfw content.",
  keywords: "nsfwhub nsfw hub rule34 signin sign in sign up login register",
  applicationName: "NSFW Hub",
  publisher: "NSFW Hub",
  other: {
    rating: "RTA-5042-1996-1400-1577-RTA",
    canonical: "/",
  },
  twitter: {
    title: "Account | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
  },
  openGraph: {
    title: "Account | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
    type: "website",
    siteName: "NSFW Hub",
    url: "https://nsfwhub.net",
  },
};

export default async function Account() {
  // Obtém os cookies do Next.js
  const accessToken = (await cookies()).get("access")?.value;

  // Verifica se o usuário está autenticado (se o token existe)
  let isAuthenticated = !!accessToken;

  

  const icon_size = 18;
  // Busca os posts da API
  const resp = await axios.get(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=yorha_2b&limit=25&pid=1&json=1`
  );

  
  const access = (await cookies()).get('access')?.value

  async function getUserData() {
    try{
      const response = await axios.get<{author:author, user:user}>(`${process.env.BACKEND_URL}/api/user`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      if(!response.data){
        isAuthenticated = false
      }
    
      const data:{user:user, author:author} = response.data
        return data
    }
    catch(e){
      isAuthenticated = false

    }
      
    }
    


  
  const userData = await getUserData()
  
  
  
  
  
  
  function formatSubscribers() {
    if(userData){
    if(userData.author){
      if (userData.author.subscribers.length < 1000) return userData.author.subscribers.length.toString();
      if (userData.author.subscribers.length < 1000000)
        return (userData.author.subscribers.length / 1000).toFixed(0) + "k";
      return (userData.author.subscribers.length / 1000000)
        .toFixed(1)
        .replace(/\.0$/, "") + "mi";
    }
  }
    
  }

  const data: post[] = resp.data;

  
  return (
    <div className="page-config">
      <Header />

      <main className="lg:px-24 flex flex-col ">
        {isAuthenticated ? (
          // Exibir painel de conta se estiver autenticado
          
          <div className="max-sm:px-2">
            <section className="flex justify-center items-center h-40 relative">
              <img
                className="max-h-full rounded-md overflow-hidden object-cover w-full"
                src={userData && userData.author.banner?userData.author.banner:"/img/anime.webp"}
              />

              <div
                className="w-20 h-20 text-black rounded-full mb-2 flex 
                                    justify-center items-center overflow-hidden 
                                    bg-white shadow-md absolute z-10 left-10 -bottom-10"
              >
                {userData && userData.author && userData.author.picture ? (
                  <img
                    className="min-h-full w-full object-cover"
                    width={40}
                    height={40}
                    alt={userData.user.username}
                    src={userData.author.picture}
                  />
                ) : (
                  <IoPersonOutline size={icon_size} />
                )}
              </div>
            </section>
            <div className="mt-10">
              <span>{userData && userData.user&&userData.user.username?userData.user.username:''}</span> -{" "}
              <span>{formatSubscribers()} Subscribers</span>
            </div>
            <AccountSections posts={data} />
          </div>
        ) : (
          // Exibir formulário de login se não estiver autenticado
          <LoginForm />
        )}
      </main>
        <Nav/>
      <Footer />
    </div>
  );
}
