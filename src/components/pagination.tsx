import { useEffect, useState } from "react"

interface Props {
  pagination: {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
  }
  pageChangeFn: (page: number) => void
}

export function Pagination({ pageChangeFn, pagination }: Props) {
  const [displayedPagesButtons, setDisplayedPagesButtons] = useState<number[]>([])

  useEffect(() => {
    if (pagination.hasNextPage && pagination.currentPage === 1) { 
        let pagesArray: number[] = []
        for (let i = 1; i <= 3; i++) {
          if(i <= pagination.totalPages)  
            pagesArray = [...pagesArray, i]
          
          if (pagination.totalPages === 0) {
            pagesArray = [1]
          }
        }
        setDisplayedPagesButtons(pagesArray)    
    }

    if (!pagination.hasNextPage && pagination.currentPage === 1) {
      setDisplayedPagesButtons([1])
    }

    if (pagination.hasNextPage && pagination.currentPage > 1) {
       setDisplayedPagesButtons([pagination.currentPage - 1, pagination.currentPage, pagination.currentPage + 1])
    }

    if (!pagination.hasNextPage && pagination.currentPage > 1) {
        let pagesArray: number[] = []
        for (let i = pagination.currentPage; i >= pagination.currentPage - 2; i--) { 
          pagesArray = [i,...pagesArray]
        }
       setDisplayedPagesButtons(pagesArray)
    }
  }, [pagination.currentPage, pagination.hasNextPage, pagination.totalPages])

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