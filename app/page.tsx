import Main from "@/components/main";
import News from "@/components/news-section";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {

  const supabase = createClient()

  const { data, error } = await supabase.from('posts').select('*')
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/protected")
  }

  return (
    <div>
      <Main>
        <News data={data} />
      </Main>
    </div>
  );
}
