"use client"

import Link from "next/link";
import ShareButton from "./ShareButton";
import { generateHTML } from '@tiptap/core'
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import StarterKit from "@tiptap/starter-kit";
import { Box, Card, Heading, Inset } from "@radix-ui/themes";

export default function Article({ user_id, id, title, content }: any) {

    const supabase = createClient()
    const [_user, _setUser] = useState<User>()

    async function getAuthenticated() {
        const { data: { user }, error } = await supabase.auth.getUser()

        _setUser(user!)
    }

    async function deleteArticle() {
        const response = await supabase.from('posts').delete().eq('id', id)
    }

    function reduceContent(str: string) {
        const sizes = str.length

        if (sizes >= 100)
            str = str.substring(0, 100)
        return str;
    }

    function randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        try {
            getAuthenticated()
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <Box maxWidth="400px" ml="120px" mt="9">
            <Card size="3">
                <Inset clip="padding-box" side="top" pb="current">
                    <Link href={`/blog/${id}`}>
                        <Image width={1500} height={700} src={`https://picsum.photos/1200/500?img=${randomIntFromInterval(1, 100)}`} alt={"Article image"} />
                    </Link>
                </Inset>
                <div className="p-5">
                    <Link href={`/blog/${id}`}>
                        <Heading as="h4">{title}</Heading>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    </p>
                    <Link href={`/blog/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </Card>
        </Box>
    )
}
