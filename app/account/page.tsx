import Header from "@/app/components/ui/header/header";
import Footer from "../components/ui/footer";
import LoginForm from "../components/ui/login-form";
import Link from "next/link";
import { author, post } from "../types";
import { IoPersonOutline } from "react-icons/io5";
import type { Metadata } from "next";
import AccountSections from "../components/ui/account-sections";
import axios from "axios";
import { cookies } from "next/headers"; // Import para acessar cookies server-side

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
  const isAuthenticated = !!accessToken;

  const author: author = {
    picture: "/img/2b.webp",
    name: "2B addicted",
    subscriptions: 12000,
    id: 1,
    url: "",
  };

  function formatSubscribers() {
    if (author.subscriptions < 1000) return author.subscriptions.toString();
    if (author.subscriptions < 1000000)
      return (author.subscriptions / 1000).toFixed(0) + "k";
    return (author.subscriptions / 1000000)
      .toFixed(1)
      .replace(/\.0$/, "") + "mi";
  }

  const icon_size = 18;

  // Busca os posts da API
  const resp = await axios.get(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=yorha_2b&limit=25&pid=1&json=1`
  );
  const data: post[] = resp.data;


  return (
    <div className="page-config" data-scroll-restoration-id="account">
      <Header />

      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
        {isAuthenticated ? (
          // Exibir painel de conta se estiver autenticado
          <>
            <section className="flex justify-center items-center h-40 relative">
              <img
                className="max-h-full rounded-md overflow-hidden object-cover w-full"
                src="/img/anime.webp"
              />

              <div
                className="w-20 h-20 text-black rounded-full mb-2 flex 
                                    justify-center items-center overflow-hidden 
                                    bg-white shadow-md absolute z-10 left-10 -bottom-10"
              >
                {author && author.picture ? (
                  <img
                    className="min-h-full w-full object-cover"
                    width={40}
                    height={40}
                    alt={author.name}
                    src={author.picture}
                  />
                ) : (
                  <IoPersonOutline size={icon_size} />
                )}
              </div>
            </section>
            <div className="mt-4">
              <span>{author.name}</span> -{" "}
              <span>{formatSubscribers()} Subscribers</span>
            </div>
            <AccountSections posts={data} />
          </>
        ) : (
          // Exibir formulário de login se não estiver autenticado
          <LoginForm />
        )}
      </main>

      <Footer />
    </div>
  );
}
