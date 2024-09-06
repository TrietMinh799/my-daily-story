import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const paginate = (items: any[], pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export const defaultExtensions = [Link, StarterKit]