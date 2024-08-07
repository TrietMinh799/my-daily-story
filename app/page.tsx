"use client"
import Article from "@/components/Article";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Index() {

  const supabase = createClient()
  const [_data, _setData] = useState([{}])
  const [theme, setTheme] = useState("winter")

  async function getData() {
    const { data, error } = await supabase.from("posts").select("*")

    _setData(data!)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const savedThemes = window.localStorage.getItem("theme")
    if (savedThemes) {
      document.documentElement.setAttribute("data-theme", savedThemes)
      setTheme(savedThemes)
    }
  }, [theme])

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-black h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link className="btn btn-active btn-neutral" href="/login">
            <LogIn />
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          {_data && _data.map((post: any, index) => {
            return (
              <Article user_id="undefined" title={post.title} id={post.id} key={index} />
            )
          })}
        </main>
      </div>
    </div>
  );
}
