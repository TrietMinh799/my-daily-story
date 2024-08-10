"use client"
import Article from "@/components/Article";
import { createClient } from "@/utils/supabase/client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Skeleton from "@/components/Skeleton";

export default function Index() {

  const supabase = createClient()
  const [_data, _setData] = useState([{}])

  async function getData() {
    const { data, error } = await supabase.from("posts").select("*")

    _setData(data!)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex-1 w-full flex flex-col gap-32 items-center">
      <nav className="w-full flex justify-center border-b border-b-black h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link className="btn btn-active btn-neutral" href="/login">
            <LogIn />
          </Link>
        </div>
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <main className="">
          {_data && _data.map((post: any, index) => {
            return (
              <Suspense key={index} fallback={<Skeleton />}>
                <div className="m-4">
                  <Article user_id="undefined" title={post.title} id={post.id} content={post.content} />
                </div>
              </Suspense>
            )
          })}
        </main>
      </div>
    </div>
  );
}
