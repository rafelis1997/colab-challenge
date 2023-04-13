import { UserDataResponse } from "@/dtos/UserDto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'GET') { 
    return res.status(404)
  }


  const response = await fetch(`https://randomuser.me/api/?results=1000&seed=colab`)
    
  const { results }: { results: UserDataResponse[] } = await response.json()

  const itemsPerPage = 10

  let totalPages;

  const { page, search } = req.query

  let userResults = results

  if (search) {
    userResults = results.filter(user => user.name.first.includes(search[0]) || user.name.last.includes(search[0]))

    totalPages = Math.ceil(userResults.length / itemsPerPage)
  } else {
    totalPages = Math.ceil(userResults.length / itemsPerPage)
  }

  const pagesArray = Object.keys(new Array(totalPages).fill(null)).map(Number)

  if (pagesArray.includes(Number(page))) {
    const usersList = userResults.slice((Number(page) * itemsPerPage) - itemsPerPage, (Number(page) * itemsPerPage))

    const userResponse = {
      results: usersList,
      pagination: {
        currentPage: Number(page) + 1,
        pagesArray,
        hasNextPage: Number(page) < pagesArray.length
      }
    }

    return res.status(200).send(userResponse)
  }

  const userResponse = {
      results: userResults.slice(0, 10),
      pagination: {
        currentPage: Number(page) + 1,
        hasNextPage: true
      }
  }

  return res.status(200).send(userResponse)
}