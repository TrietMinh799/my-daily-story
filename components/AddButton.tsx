import Link from "next/link";

export default function AddButton() {
  return (
    <Link
      className="py-2 px-3 flex rounded-md no-underline border-black hover:bg-slate-600 border"
      href="/add"
    >
      Thêm Câu Chuyện Mới
    </Link>
  );
}
