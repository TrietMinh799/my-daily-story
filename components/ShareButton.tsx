import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function ShareButton({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false)
    const url = window.location.href + `blog/${id}`

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <svg fill="#000000" width="45px" height="45px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" >
                    <title>share</title>
                    <path d="M385 464Q357 464 339 445 320 426 320 399 320 390 321 388L171 303Q154 320 129 320 102 320 83 301 64 282 64 255 64 229 83 211 102 192 129 192 154 192 171 209L321 125Q320 122 320 111 320 85 339 67 357 48 384 48 410 48 429 67 447 85 448 111 448 138 429 157 410 176 384 176 361 176 341 159L191 244Q192 246 192 255 192 265 191 268L341 353Q361 336 385 336 415 336 431 355 447 374 447 400 447 426 431 445 415 464 385 464Z" />
                </svg>
            </button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
            >
                <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
                    <DialogTitle className="font-bold">Sharing your story!</DialogTitle>
                    <Description>Currently support copy the url link.</Description>
                    <p>{url}</p>
                    <div className="flex gap-4">
                        <button onClick={async () => {
                            setIsOpen(false);
                            try {
                                await navigator.clipboard.writeText(url)
                            } catch (error) {
                                console.error(error)
                            }
                        }}>Copy it!</button>
                        <button onClick={() => setIsOpen(false)}>Cancel and exit!</button>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    )
}