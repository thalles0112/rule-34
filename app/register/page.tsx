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
import RegisterForm from "../components/ui/register-form";

export const metadata: Metadata = {
  title: "Register | NSFW Hub",
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
    title: "Register | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
  },
  openGraph: {
    title: "Register | NSFW Hub",
    description:
      "Sign up and start posting your porn art in the largest community of nsfw content.",
    type: "website",
    siteName: "NSFW Hub",
    url: "https://nsfwhub.net",
  },
};

export default async function RegisterPage() {
  // Obtém os cookies do Next.js

  return (
    <div className="page-config" data-scroll-restoration-id="account">
      <Header />

      <main className="lg:px-24 max-sm:px-4 flex flex-col gap-y-8">
       
          <RegisterForm />
       
      </main>

      <Footer />
    </div>
  );
}
