import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default async function Index({ params }: { params: { slug: string } }) {

    const supabase = createClient()

    const { data, error } = await supabase.from('posts').select('*').filter("id", "eq", params.slug).single()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="artboard phone-3 m-12 self-center">
            <Link href={(user ? "/protected" : "/")}>
                <svg strokeWidth="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z" fill="#000000">
                    </path>
                </svg></Link>
            <h1 className="font-bold">{data.title}</h1>
            <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
        </div>
    )
}