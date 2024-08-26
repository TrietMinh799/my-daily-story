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
import GetStartedButton from "./animata/gettingstarted-button";
import AnimatedBorderTrail from "./animata/AnimatedBorderTrail";

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
            <AnimatedBorderTrail>
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
                        <GetStartedButton text={"Read more"} path={`/blog/${id}`} />
                    </div>
                </Card>
            </AnimatedBorderTrail>
        </Box>
    )
}
