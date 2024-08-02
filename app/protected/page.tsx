import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddButton from "@/components/AddButton";
import Article from "@/components/Article";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("posts").select("*")

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-black h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AddButton />
            <AuthButton />
          </div>
        </nav>
      </div>

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
