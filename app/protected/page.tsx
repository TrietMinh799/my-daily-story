import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Main from "@/components/main";
import News from "@/components/news-section";
import Footer from "@/components/Footer";

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
    <div>
      <Main>
        <News data={data} length={data?.length!} />
      </Main>
      <Footer />
    </div>
  );
}
