'use client'
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListPosts, { ListPostsFlex } from "../listpost";
import PostForm from "./post-form";
import FolderPage from "@/app/account/folders/[id]/page";
import Folders from "./folders";
import { post } from "@/app/types";

const tabs = [
  { id: "my_posts", label: "My Posts" },
  { id: "create", label: "Create" },
  { id: "folders", label: "Folders" },
  { id: "settings", label: "Settings" },
];
function Sections({posts}:{posts:post[]}) {
  const [activeTab, setActiveTab] = useState("");
  const router = useSearchParams()
  useEffect(()=>{
     const tab = router.get('s') || 'my_posts'
     setActiveTab(tab)
  },[router])

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex space-x-2 border-b pb-2 max-sm:overflow-x-scroll">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/account?s=${tab.id}`}
            className={`block px-4 py-2 min-w-fit text-sm font-medium rounded-t-md transition-all ${
              activeTab === tab.id ? "border-b-2 border-main-color" : "text-gray-500 border-b-2 border-white dark:border-gray-900"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "my_posts" && <ListPosts posts={posts} />}
        {activeTab === "create" && <PostForm/>}
        {activeTab === "folders" && <Folders/>}
        {activeTab === "settings" && <div>Account settings...</div>}
      </div>
    </div>
  );
}

export default function AccountSections({posts}:{posts:post[]}){
    return(
        <Suspense>
            <Sections posts={posts}/>
        </Suspense>
    )
}
