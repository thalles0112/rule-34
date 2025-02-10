import Header from "@/app/components/ui/header/header";
import Footer from "../components/ui/footer";
import LoginForm from "../components/ui/login-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login | NSFW Hub",
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
    title: "Login | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
  },
  openGraph: {
    title: "Login | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
    type: "website",
    siteName: "NSFW Hub",
    url: "https://nsfwhub.net",
  },
};

export default async function LoginPage() {
  // Obtém os cookies do Next.js


  // Verifica se o usuário está autenticado (se o token existe)
 


  return (
    <div className="page-config">
      <Header />

      <main className="lg:px-24">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}
