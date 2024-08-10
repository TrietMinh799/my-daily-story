"use client"

import { createClient } from "@/utils/supabase/client"
import { generateHTML } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Link from "next/link"
import { JSONContent } from "novel"
import Links from '@tiptap/extension-link'
import DOMPurify from "isomorphic-dompurify";
import Image from "@tiptap/extension-image"
import { useEffect, useState } from "react"

export default function Index({ params }: { params: { slug: string } }) {

    const [title, setTitle] = useState<any>()
    const [content, setContent] = useState<JSONContent>({})
    const [_user, _setUser] = useState<any>()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [log, setLog] = useState<any>()


    async function getUsers() {
        const { data: { user } } = await supabase.auth.getUser()
        _setUser(user)
    }

    useEffect(() => {

        async function getData() {
            const { data, error } = await supabase.from('posts').select('*').filter("id", "eq", params.slug).single()
            setContent((_: any) => (JSON.parse(data.content)));
            setLoading(true)
        }
        getData()


    }, [])

    if (!loading) return (
        <>
            <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        </>
    )


    return (
        <div className="artboard phone-3 m-12 self-center">
            <Link href={(_user ? "/protected" : "/")}>
                <svg strokeWidth="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z" fill="#000000">
                    </path>
                </svg></Link>
            <h1 className="font-bold">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateHTML(content, [StarterKit, Links, Image])) }} />
        </div>
    )
}