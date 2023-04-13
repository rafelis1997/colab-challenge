import { useEffect, useState } from "react"

interface Props {
  pagination: {
    currentPage: number
    hasNextPage: boolean
  }
  pageChangeFn: (page: number) => void
}

export function Pagination({ pageChangeFn, pagination }: Props) {
  const [displayedPagesButtons, setDisplayedPagesButtons] = useState([1, 2, 3])

  useEffect(() => {
    if (pagination.hasNextPage && pagination.currentPage <= 3) {
      setDisplayedPagesButtons([pagination.currentPage + 1, pagination.currentPage + 2, pagination.currentPage + 3])
    }

    if (pagination.hasNextPage && pagination.currentPage > 3) {
       setDisplayedPagesButtons([pagination.currentPage - 1, pagination.currentPage, pagination.currentPage + 1])
    }

    if (!pagination.hasNextPage) {
       setDisplayedPagesButtons([pagination.currentPage - 2, pagination.currentPage - 1, pagination.currentPage ])
    }
  }, [pagination.currentPage, pagination.hasNextPage])

  return (
    <div className="flex gap-2 justify-end items-center">
      <span className="text-brand-500 font-semibold">Páginas:</span>
      <ul className="flex gap-2 px-2">
        {displayedPagesButtons.map(page => (
          <li key={page} >
            <button
              className="bg-brand-500 hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-25 transition-all ease-in flex justify-center items-center w-8 h-8 text-neutral-200 font-bold rounded "
              onClick={() => pageChangeFn(page)}
              disabled={pagination.currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}