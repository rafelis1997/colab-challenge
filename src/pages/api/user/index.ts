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


  if ((Number(page)) <= totalPages && (Number(page)) >= 1) {
    const usersList = userResults.slice((Number(page) * itemsPerPage) - itemsPerPage, (Number(page) * itemsPerPage))

    const userResponse = {
      results: usersList,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage: Number(page) < totalPages
      }
    }

    return res.status(200).send(userResponse)
  }

  const userResponse = {
      results: userResults.slice(0, 10),
      pagination: {
        totalPages,
        currentPage: 1,
        hasNextPage: 1 < totalPages
      }
  }

  return res.status(200).send(userResponse)
}