"use client"

import Link from "next/link";
import ShareButton from "./ShareButton";

export default function Article({ id, title }: any) {

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <div className="card-actions justify-end">
                    <Link href={`/blog/${id}`} className="btn btn-square btn-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>
                <Link href={`/blog/${id}`}>
                    <h1>{title}</h1>
                </Link>
                <ShareButton id={id} />
            </div>
        </div>
    )
}
