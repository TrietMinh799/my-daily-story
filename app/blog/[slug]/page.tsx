import { createClient } from "@/utils/supabase/server"
import { generateHTML } from "@tiptap/html"
import Link from "next/link"
import DOMPurify from "isomorphic-dompurify";
import { Container, Heading, Text } from "@radix-ui/themes"
import { ArrowLeftToLine } from "lucide-react"
import Footer from "@/components/Footer"
import { Metadata } from "next"
import { defaultExtensions } from "@/lib/utils";

export default async function Index({ params }: Readonly<{ params: { slug: string } }>) {

  const supabase = createClient()
  const { data: post, error } = await supabase.from('posts').select('*').filter("id", "eq", params.slug).single()
  const { data: { user } } = await supabase.auth.getUser()

  const data = { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Have you ever wanted to create your own interactive tools using just HTML, CSS, and JavaScript? In this article, we'll create a fun and straightforward project: a color picker tool." }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "This handy little tool will let users select any color they like and instantly see its HEX and RGB values." }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "So, grab your favorite code editor, and let's get started!" }] }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "Step 1: Set Up Your Project" }] }, { "type": "orderedList", "attrs": { "start": 1 }, "content": [{ "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "Create a New Folder" }, { "type": "text", "text": ": Start by creating a new folder on your computer for this project. You can name it " }, { "type": "text", "marks": [{ "type": "bold" }], "text": "color-picker-tool" }, { "type": "text", "text": "." }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "Create Files" }, { "type": "text", "text": ": Inside the folder, create three files:" }] }, { "type": "bulletList", "content": [{ "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "index.html" }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "styles.css" }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "script.js" }] }] }] }] }] }, { "type": "paragraph" }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "Step 2: Build the HTML Structure" }] }, { "type": "orderedList", "attrs": { "start": 1 }, "content": [{ "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Open the " }, { "type": "text", "marks": [{ "type": "bold" }], "text": "index.html" }, { "type": "text", "text": " file in your code editor." }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "bold" }], "text": "Add Basic HTML Structure" }, { "type": "text", "text": ": Add the following code into " }, { "type": "text", "marks": [{ "type": "bold" }], "text": "index.html" }, { "type": "text", "text": ": or press " }, { "type": "text", "marks": [{ "type": "code" }], "text": "SHIFT+!" }, { "type": "text", "text": " then press " }, { "type": "text", "marks": [{ "type": "code" }], "text": "Enter" }, { "type": "text", "text": " to set the Emmet structure, then change the document title to " }, { "type": "text", "marks": [{ "type": "code" }], "text": "\"Color Picker Tool\"." }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Link your " }, { "type": "text", "marks": [{ "type": "bold" }], "text": "styles.css" }, { "type": "text", "text": " and " }, { "type": "text", "marks": [{ "type": "bold" }], "text": "script.js" }, { "type": "text", "text": " files too." }] }] }] }] };

  if (!post) return (
    <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  )

  return (
    <Container>
      <main className="pt-8 lg:pt-16 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
          <article className="mx-auto w-full max-w-2xl">
            <Link href={(user ? "/protected" : "/")}>
              <ArrowLeftToLine />
            </Link>
            <Heading align="center" size="8">{post.title}</Heading>
            <Text as="span">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(generateHTML(JSON.parse(post.content), defaultExtensions)) }} />
            </Text>
          </article>
        </div>
        <Footer />
      </main>
    </Container>
  )
}

export async function generateMetadata({ params }: { params: Metadata }) {
  return {
    title: ''
  }
}
