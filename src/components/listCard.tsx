import { CaretRight } from "@phosphor-icons/react"
import Image from "next/image"
import { useRouter } from "next/router"

interface Props {
  userDetails: {
    name: string
    email: string
    thumbnailUrl: string
    uuid: string
  }
  currentPage: number | null
}

export function ListCard({ userDetails, currentPage }: Props) {
  const router = useRouter()
  
  function handleUserDetails() {
    router.push({
      pathname: '/user-details',
      query: {
        page: currentPage,
        uuid: userDetails.uuid
      }
    })
  }

  return (
    <li>
      <button onClick={handleUserDetails} className="bg-neutral-200 rounded-md w-full flex justify-between items-center p-2 md:px-8 md:py-4 hover:bg-brand-200 transition-all ease-in">
        <div className="flex gap-3 items-center">
          <Image src={userDetails.thumbnailUrl} alt="user picture" width={500} height={500} className="w-16 h-16 rounded-full border-brand-500 border-2 object-cover" />
          
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-brand-500 text-base md:text-xl">{userDetails.name}</h3>
            <span className="text-neutral-700 text-xs md:text-base">{ userDetails.email}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-medium text-brand-500 hidden md:text-base md:block">Ver usuário</span>
          <CaretRight className="text-brand-500" weight="bold" size={32}/>
        </div>
      </button>
    </li>
  )
}