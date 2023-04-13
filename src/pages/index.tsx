import { useState, useRef, useEffect, FormEvent } from "react"
import { ListCard } from "@/components/listCard"
import { UserDataResponse } from "@/dtos/UserDto"
import { GetServerSideProps } from "next"
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const getServerSideProps: GetServerSideProps = async ({query}) => {

  const response = await fetch('https://randomuser.me/api/?page=1&results=10&seed=colab')
  
  const { results } : { results : UserDataResponse[] } = await response.json()
  return {
    props: {
      results
    }
  }
} 

const pages = [1, 2, 3]

export default function Home({ results }: { results: UserDataResponse[] }) {
  const [userList, setUserList] = useState<UserDataResponse[]>(results)
  const [currentPage, setCurrentPage] = useState<number | null>(1)
  const [animationParent] = useAutoAnimate()

  async function handlePageChange(page: number) {
    const response = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=colab`)
  
    const { results }: { results: UserDataResponse[] } = await response.json()
    
    setUserList(results)
    setCurrentPage(page)
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)

    const search = data.get('search') as string

    if (search.length > 0) {
      const response = await fetch(`https://randomuser.me/api/?results=1000&seed=colab`)
    
      const { results }: { results: UserDataResponse[] } = await response.json()
  
      const filteredResults = results.filter(result => result.name.first.includes(search)
        || result.name.first.includes(search) || result.email.includes(search))
      
      setCurrentPage(null)
      return setUserList(filteredResults)
    } 
    
    const response = await fetch(`https://randomuser.me/api/?page=1&results=10&seed=colab`)

    const { results }: { results: UserDataResponse[] } = await response.json()

    setUserList(results)
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 items-center">
      <section className="flex flex-col w-full max-w-5xl gap-4">
        <h1 className="text-brand-title font-semibold text-xl leading-5 md:text-3xl">Lista de Usuários</h1>

        <form className="flex flex-col w-full md:flex-row gap-4 md:gap-8" onSubmit={handleSearch}>
          <input type="text" className="rounded-lg bg-neutral-400 px-4 py-3 flex-1 drop-shadow-sm" placeholder="Buscar usuários..." name="search"/>
          <button className="py-3 px-6 bg-brand-500 hover:bg-brand-400 rounded-lg text-neutral-200 font-bold filter drop-shadow-sm">
            Buscar
          </button>
        </form>

        <ul className="flex flex-col rounded-2xl bg-neutral-400 p-7 gap-3" ref={animationParent}>
          {userList.map((user, index) => (
            <ListCard
              key={user.login.uuid}
              userDetails={{
                email: user.email,
                name: `${user.name.first} ${user.name.last}`,
                thumbnailUrl: user.picture.medium,
                uuid: user.login.uuid
              }}
              currentPage={currentPage}
            />
          ))}
        </ul>

        <div className="flex gap-2 justify-end items-center">
          <span className="text-brand-500 font-semibold">Páginas:</span>
          <ul className="flex gap-2 px-2">
            {pages.map(page => (
              <li key={page} >
                <button
                  className="bg-brand-500 hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-25 transition-all ease-in flex justify-center items-center w-8 h-8 text-neutral-200 font-bold rounded "
                  onClick={() => handlePageChange(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}