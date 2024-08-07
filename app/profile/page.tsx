import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Profile() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/")
    }

    return (
        <div className="min-h-screen dark:bg-slate-800 gap-6 flex items-center justify-center">
            <div
                className="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                <div className="flex items-center gap-4">
                    <Image alt="Profile" src="https://images.stockcake.com/public/4/d/5/4d515f6d-79ea-475c-b7ae-112f8f03361b/palm-trees-skyward-stockcake.jpg"
                        width={200} height={200} className="rounded-full transition-all duration-500 delay-500 transform"
                    />
                    <div className="w-fit transition-all transform duration-500">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                            In process...
                        </h1>
                        <p className="text-gray-400">{user.role}</p>
                        <a
                            className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                            {user.email}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}