import Header from "./Header";

export default function Main({ children }: { children: any }) {
    return (
        <div className="flex-1 w-full flex flex-col gap-32">
            <Header />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}