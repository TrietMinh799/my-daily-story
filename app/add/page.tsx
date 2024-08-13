"use client";

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/editor/advanced-editor';
import { JSONContent } from 'novel';
import "../prosemirror.css";
import { Box, Container } from '@radix-ui/themes';
import { Button, Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';

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
        <Box style={{}}>
            <Container size="2">
                <form action="#">
                    <Box py="3">
                        <Button className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white' onClick={handleClick}>Add a new story</Button>
                    </Box>
                    <Box py="3">
                        <Field>
                            <Input
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                className={clsx(
                                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                type="text"
                                placeholder="Story name..."
                                data-invalid
                                required />
                        </Field>

                    </Box>
                    <Box p="3" maxWidth="800px" maxHeight="500px">
                        <Editor onChange={setContent} />
                    </Box>
                </form>
            </Container>
        </Box>
    )
}
