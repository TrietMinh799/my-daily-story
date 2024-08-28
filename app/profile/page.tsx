import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import * as Avatar from '@radix-ui/react-avatar';

const handleFormUpdate = async (formData: FormData) => {
  "use server"
  const userName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const supabase = createClient()

  await supabase.auth.updateUser({ data: { userName: userName, lastName: lastName } })
}

export default async function Profile() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/")
  }

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <Link href="#" className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
            Pubic Profile
          </Link>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
            <form action={handleFormUpdate}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                    {user.user_metadata.urlAvatar && <Avatar.Image src={user.user_metadata.urlAvatar} />}
                    <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                      {user.user_metadata.userName.substr(0, 2)}
                    </Avatar.Fallback>
                  </Avatar.Root>

                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                      Change picture
                    </button>
                    <button type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                      Delete picture
                    </button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div
                    className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                        first name</label>
                      <input type="text" id="first_name" name="firstName"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name" defaultValue={user.user_metadata.userName} />
                    </div>

                    <div className="w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your last name</label>
                      <input type="text" id="last_name" name="lastName"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your last name" defaultValue={user.user_metadata.lastName} />
                    </div>

                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                      email</label>
                    <input type="email" id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com" />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                    <textarea id="message" rows={4}
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      placeholder="Write something about yourself here..."></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                  </div>

                </div>
              </div>


            </form>
          </div>
        </div>
      </main>
    </div>)
}
