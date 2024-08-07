import { createClient } from "@/utils/supabase/server"
import { generateHTML } from "@tiptap/html"
import StarterKit from "@tiptap/starter-kit"
import Link from "next/link"
import { JSONContent } from "novel"
import Links from '@tiptap/extension-link'
import DOMPurify from "isomorphic-dompurify";

const _ = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [{ "type": "text", "text": "Tài công Châu Trọng Lực cho biết khi nhìn thấy tàu hàng đến gần anh đã kéo hết ga đề lùi phà nhưng do trớn tàu chạy và nước chảy mạnh nên không tránh được." }]
        }, { "type": "paragraph", "content": [{ "type": "text", "text": "\"Lúc đó tàu đã đến quá gần nên tôi không thể bẻ lái quay đầu bởi lực chảy của nước và sức hút của tàu siêu trường sẽ làm phà chìm\", tài công Châu Trọng Lực, 39 tuổi, người cầm lái phà khách bị tàu chở dầu quốc tịch Thái Lan, trọng tải hơn 4.500 tấn " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://vnexpress.net/tau-hang-dam-pha-cho-khach-tren-song-vam-nao-4778468.html", "target": "_blank", "rel": "dofollow", "class": "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" } }], "text": "đâm" }, { "type": "text", "text": " trên sông Vàm Nao chiều 6/8, kể." }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "Anh Lực cho biết bản thân có kinh nghiệm hàng chục năm lái phà và có chứng chỉ lái tàu hạng 3 (phà chở đến 50 khách và đến 250 tấn hàng hóa). Hôm qua, như mọi ngày, anh chở 10 hành khách cùng hai ôtô, 6 xe máy và một xe ba gác từ huyện Phú Tân sang huyện Chợ Mới theo dòng nước ngược. Thời điểm trước khi xảy ra tai nạn, trời chuyển mây đen, sắp mưa song không có sương mù." }] }]
}

export default async function Index({ params }: { params: { slug: string } }) {

    const supabase = createClient()

    const { data, error } = await supabase.from('posts').select('*').filter("id", "eq", params.slug).single()
    const { data: { user } } = await supabase.auth.getUser()
    const content: JSONContent = data.content;

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
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateHTML(_, [StarterKit, Links])) }} />
        </div>
    )
}