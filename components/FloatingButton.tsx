import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"
import { Dispatch } from "react"

export default function FloatingButton({ setTheme }: { setTheme: Dispatch<string> }) {
    return (
        <div className="fixed bottom-4 right-4">
            <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                <label className="swap swap-rotate">
                    <Menu>
                        <MenuButton>Theme</MenuButton>
                        <MenuItems anchor="bottom">
                            <MenuItem>
                                <a className="block data-[focus]:bg-blue-100" href="/settings">
                                    Settings
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a className="block data-[focus]:bg-blue-100" href="/support">
                                    Support
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a className="block data-[focus]:bg-blue-100" href="/license">
                                    License
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                </label>
            </div>
        </div>
    )
}