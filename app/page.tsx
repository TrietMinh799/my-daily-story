import Article from "@/components/Article";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/client";

export default async function Index() {

  const supabase = createClient()

  const { data, error } = await supabase.from("posts").select("*")

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-black h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          {data && data.map((post, index) => {
            return (
              <Article title={post.title} id={post.id} key={index} />
            )
          })}
        </main>
      </div>

    </div>
  );
}
