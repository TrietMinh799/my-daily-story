"use client";

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/editor/advanced-editor';
import { JSONContent } from 'novel';
import "../prosemirror.css";

export default function Add() {
    const supabase = createClient()
    const [authentication, setAuthentication]: any = useState({})
    const [content, setContent] = useState<JSONContent>()
    const [title, setTitle] = useState("")
    const [msg, setMsg] = useState("")
    const router = useRouter()

    async function _getUser() {
        const { data: { user } } = await supabase.auth.getUser()

        setAuthentication(user!)
    }

    useEffect(() => {
        _getUser()

    }, [])

    async function handleClick() {

        if (title.length == 0)
            router.push("/add?message=Please set the title name")

        const { data } = await supabase.from('posts').insert({
            title, content, user_id: authentication.id, user_email: authentication.email
        }).select().single()

        router.push(`/blog/${data.id}`)
    }

    if (!authentication) {
        router.push('/')
    }
    return (
        <div className='m-4'>
            <form action="#">
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleClick}>Add a new story</button>
                <input
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    type="text"
                    placeholder="Story name"
                    className="input input-bordered w-full max-w-xs"
                    required />
                <Editor onChange={setContent} />
            </form>
        </div>
    )
}
