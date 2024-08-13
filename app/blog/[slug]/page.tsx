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
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { Heading, Text } from "@radix-ui/themes"
import { ArrowLeftToLine } from "lucide-react"

export default function Index({ params }: { params: { slug: string } }) {

    const [title, setTitle] = useState<any>()
    const [content, setContent] = useState<JSONContent>({})
    const [_user, _setUser] = useState<any>()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    async function getUsers() {
        const { data: { user } } = await supabase.auth.getUser()
        _setUser(user)
    }

    useEffect(() => {

        async function getData() {
            const { data, error } = await supabase.from('posts').select('*').filter("id", "eq", params.slug).single()
            setContent((_: any) => (JSON.parse(data.content)));
            setTitle(data.title)
            setLoading(true)
        }
        getData()

        getUsers()

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
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                <article className="mx-auto w-full max-w-2xl">
                    <Link href={(_user ? "/protected" : "/")}>
                        <ArrowLeftToLine />
                    </Link>
                    <Heading align="center" size="8">{title}</Heading>
                    <Text>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateHTML(content, [StarterKit, Links, Image])) }} />
                    </Text>
                </article>
            </div>
            <ScrollToTopButton />
        </main>
    )
}