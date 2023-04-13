import Image from "next/image";

export function DetailsCard(
  { user }: {
    user: {
      picture: { large: string }
      name: {
        last: string
        first: string
      }
      email: string
      cell: string
      nat: string
    }
  }) {
  return (
    <div className="flex flex-col flex-1 rounded-2xl bg-neutral-400 p-7 gap-3 justify-center items-center">
            <Image
              src={user.picture.large}
              width={2000}
              height={2000}
              alt="user photo"
              className="border-brand-500 border-8 rounded-full w-52 h-52"
            />
            <span className="flex gap-2 text-brand-500 font-bold text-2xl">
              {`${user.name.first} ${user.name.last}`}
            </span>
            <span className="flex gap-2 text-brand-500 font-bold text-base md:text-lg">
              Email:
              <p className="flex gap-2 text-neutral-700 font-normal text-base md:text-lg">
                {user.email}
              </p>
            </span>
            <span className="flex gap-2 text-brand-500 font-bold text-base md:text-lg">
              Telefone:
              <p className="flex gap-2 text-neutral-700 font-normal text-base md:text-lg">
                {user.cell}
              </p>
            </span>
            <span className="flex gap-2 text-brand-500 font-bold text-base md:text-lg">
              Nacionalidade:
              <p className="flex gap-2 text-neutral-700 font-normal text-base md:text-lg">
                {user.nat}
              </p>
            </span>
          </div>
  )
}