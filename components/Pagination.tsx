import { Container } from "@radix-ui/themes";
import Link from "next/link";

export default function Pagination({ size, currentPage, pageSize, onPageChange }: { size: number, currentPage: number, pageSize: number, onPageChange: any }) {

  const pagesCount = Math.ceil(size / pageSize)
  if (pagesCount == 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <Container>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center h-16 text-sm">
          <li>
            {currentPage > 1 &&
              <Link scroll={false} onClick={() => {
                onPageChange(currentPage - 1)
              }} href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
              </Link>
            }
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <Link onClick={() => {
                onPageChange(page)
              }} href="#" scroll={false} className="flex items-center justify-center px-3 h-8 leading-tight">{page}</Link>
            </li>
          ))}
          <li>
            {currentPage + 1 <= pagesCount &&
              <Link onClick={() => {
                onPageChange(currentPage + 1)
              }} scroll={false} href="#" className="flex items-center justify-center px-3 h-8 leading-tight">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
              </Link>
            }
          </li>
        </ul>
      </nav>
    </Container>
  )
}
