import Image from "next/image";

import ColabLogo from '../assets/uc.png'
import Link from "next/link";

export function Header() {
  return (
    <div className="flex justify-center items-center bg-neutral-200 h-20 p-4 filter drop-shadow-sm">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <div className="flex items-center text-2xl leading-6 text-center gap-1">
          <Image src={ColabLogo} alt="Colab Logo" width={800} className="w-[100px]"/>
          <span className="text-brand-500 font-bold text-end">| Admin</span>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/" className="text-neutral-700 font-semibold text-base">Lista de usuários</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}