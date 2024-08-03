"use client"

import Link from "next/link";
import ShareButton from "./ShareButton";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Article({ user_id, id, title }: any) {

    const supabase = createClient()
    const [_user, _setUser] = useState<User>()

    async function getAuthenticated() {
        const { data: { user }, error } = await supabase.auth.getUser()

        _setUser(user!)
    }

    async function deleteArticle() {
        const response = await supabase.from('posts').delete().eq('id', id)

    }

    useEffect(() => {
        try {
            getAuthenticated()
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <div className="card-actions justify-end">
                    {_user?.id == user_id &&
                        <button onClick={() => {
                            deleteArticle();
                        }} className="btn btn-square btn-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    }
                </div>
                <Link href={`/blog/${id}`}>
                    <h1 className="">{title}</h1>
                </Link>
                <ShareButton id={id} />
            </div>
        </div>
    )
}
