import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function AddButton() {
  return (
    <Link
      className="py-2 px-3 flex no-underline"
      href="/add"
    >
      <CirclePlus />
    </Link>
  );
}
