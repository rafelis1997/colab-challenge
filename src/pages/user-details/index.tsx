import { GetServerSideProps } from "next";
import Image from "next/image";
import { CaretLeft } from '@phosphor-icons/react'
import dayjs from 'dayjs'

import { UserDataResponse } from "@/dtos/UserDto";
import { DetailsCard } from "@/components/detailsCard";
import { useRouter } from "next/router";

export default function UserDetails({ user }: { user: UserDataResponse }) {
  const router = useRouter()
  function handleGoBack() { 
    router.back()
  }
  return (
    <div className="flex min-h-screen flex-col px-6 py-8 items-center">
      <section className="flex flex-col w-full max-w-5xl gap-4">
        <div className="flex gap-4 items-center">
          <button onClick={handleGoBack} className="flex justify-center items-center p-2 bg-brand-500 hover:bg-brand-400 rounded-lg">
            <CaretLeft className="text-neutral-200" size={32} weight="bold"/>
          </button>
          <h1 className="text-brand-title font-semibold text-xl leading-5 md:text-3xl">Detalhes do usuário</h1>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6">
          <DetailsCard user={user}/>

          {/* Separator */}
          <div className="w-[2px] bg-neutral-700 hidden md:block" />
          
          <div className="flex flex-col flex-1 py-4 gap-3">
            <h3 className="flex gap-2 text-brand-title font-bold text-2xl">
              Informações adicionais
            </h3>
            <span className="flex gap-2 text-brand-500 font-bold text-base md:text-lg">
              Endereço:
            </span>
            <span className="flex gap-2 text-brand-title font-bold text-base">
              Rua:
              <p className="flex gap-2 text-neutral-700 font-normal text-base">
                {`${user.location.street.name}, ${user.location.street.number}`}
              </p>
            </span>
            <span className="flex gap-2 text-brand-title font-bold text-base">
              Cidade:
              <p className="flex gap-2 text-neutral-700 font-normal text-base">
                {`${user.location.city} - ${user.location.state}`}
              </p>
            </span>
            <span className="flex gap-2 text-brand-title font-bold text-base">
              CEP:
              <p className="flex gap-2 text-neutral-700 font-normal text-base">
                {user.location.postcode}
              </p>
            </span>
            <span className="flex gap-2 text-brand-title font-bold text-base">
              País:
              <p className="flex gap-2 text-neutral-700 font-normal text-base">
                {user.location.country}
              </p>
            </span>

            <span className="flex gap-2 text-brand-500 font-bold text-base md:text-lg">
              Data de Nascimento:
              <p className="flex gap-2 text-neutral-700 font-normal text-base">
                {dayjs(user.dob.date).format('DD/MM/YYYY').toString()}
              </p>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const { page, uuid } = query
  
  let response;
  
  if (page) {
    response = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=colab`)
  } else {
    response = await fetch(`https://randomuser.me/api/?results=1000&seed=colab`)
  }
  
  const { results }: { results: UserDataResponse[] } = await response.json()

  return {
    props: {
      user: results.find(user => user.login.uuid === uuid)
    }
  }
}