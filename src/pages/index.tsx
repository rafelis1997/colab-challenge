import { useState, useRef, useEffect, FormEvent } from "react"
import { ListCard } from "@/components/listCard"
import { UserDataResponse } from "@/dtos/UserDto"
import { GetServerSideProps } from "next"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Pagination } from "@/components/pagination"
import { toast } from "react-toastify"

interface userListResponse {
  results: UserDataResponse[]
  pagination: {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/user/')
    
    const dataResponse: userListResponse = await response.json()
    
    return {
      props: {
        data: dataResponse
      }
    }
  } catch (error) {
    return {
      props: {
        data: {
          results: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false
          }
        }
      }
    }
  }
} 

export default function Home({data}: {data:userListResponse}) {
  const [userList, setUserList] = useState<userListResponse>(data)
  const [search, setSearch] = useState<string | null>(null)
  const [animationParent] = useAutoAnimate()

  async function handlePageChange(page: number) {
    try {  
      const response = await fetch(`http://localhost:3000/api/user/?${search ? 'search='+ search : ''}&page=${page}`)
    
      const data: userListResponse = await response.json()
      
      setUserList(data)
    } catch (error) {
      toast('Erro ao carregar dados')
      setUserList({
        results: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false
        }
      })
    }
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)

    const searchData = data.get('search') as string

    try {
      if (searchData.length > 0) {
        const response = await fetch(`http://localhost:3000/api/user/?page=1&search=${searchData.toLowerCase()}`)
      
        const dataResponse: userListResponse = await response.json()
        
        setSearch(searchData)
        return setUserList(dataResponse)
      } 
      
      const response = await fetch(`http://localhost:3000/api/user/`)
  
      const dataResponse: userListResponse = await response.json()
  
      setUserList(dataResponse)
      setSearch(null)
    } catch (error) {
      toast('Erro ao carregar dados')
      setUserList({
        results: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false
        }
      })
      setSearch(null)
    }
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
          {userList.results && userList.results.length > 0 ? userList.results.map((user, index) => (
            <ListCard
              key={user.login.uuid}
              userDetails={{
                email: user.email,
                name: `${user.name.first} ${user.name.last}`,
                thumbnailUrl: user.picture.medium,
                uuid: user.login.uuid
              }}
            />
          )) : (
            <p>Nenhum usuário encontrado...</p>
          )}
        </ul>

        <Pagination pagination={userList.pagination} pageChangeFn={handlePageChange}/>
      </section>
    </div>
  )
}