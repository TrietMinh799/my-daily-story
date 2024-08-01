"use client";

import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, CreateLink, InsertImage, imagePlugin, linkPlugin, tablePlugin, headingsPlugin, quotePlugin, listsPlugin, thematicBreakPlugin, diffSourcePlugin, DiffSourceToggleWrapper, AdmonitionDirectiveDescriptor, directivesPlugin, markdownShortcutPlugin } from '@mdxeditor/editor'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



export default function Add() {
    const supabase = createClient()
    const [authentication, setAuthentication]: any = useState({})
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const router = useRouter()

    async function _getUser() {
        const { data: { user } } = await supabase.auth.getUser()

        setAuthentication(user!)
    }

    useEffect(() => {
        _getUser()
    }, [])

    async function handleClick() {
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
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleClick}>Add a new story</button>
            <input
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                type="text"
                placeholder="Story name"
                className="input input-bordered w-full max-w-xs" />
            <MDXEditor
                onChange={(markdown) => {
                    setContent(markdown)
                }}
                markdown={content}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    linkPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    tablePlugin(),
                    imagePlugin({
                        imageUploadHandler: () => {
                            return Promise.resolve("")
                        }
                    }),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                {' '}
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <CreateLink />
                                <InsertImage />
                                <DiffSourceToggleWrapper>
                                    <UndoRedo />
                                </DiffSourceToggleWrapper>
                            </>
                        )
                    }),
                    diffSourcePlugin({
                        diffMarkdown: content
                    }),
                    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                    markdownShortcutPlugin()
                ]}
                contentEditableClassName="prose"
            />
        </div>
    )
}
