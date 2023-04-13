import { UserDataResponse } from "@/dtos/UserDto";
import { NextApiRequest, NextApiResponse } from "next";
import axios, {AxiosError} from "axios";
import { toast } from "react-toastify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'GET') { 
    return res.status(404)
  }

  try {
      const { data } = await axios.get(`https://randomuser.me/api/?results=1000&seed=colab`)
        
      const { results }: { results: UserDataResponse[] } = await data
    
      const itemsPerPage = 10
    
      
      const { page, search } = req.query
    
      let userResults = results
    
      if (search) {
        userResults = results.filter(user => user.name.first.toLowerCase().includes(search as string) || user.name.last.includes(search as string))
      }
    
      const totalPages = Math.ceil(userResults.length / itemsPerPage)
      
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
  } catch (error) {
    toast('Erro ao pegar dados')
    throw new Error(axios.isAxiosError(error) ? error.message : JSON.stringify(error))
  }
}