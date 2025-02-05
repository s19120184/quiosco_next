"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export default function ProductsSearchForm() {

    const router= useRouter()

    const handleSearchForm=(formData:FormData)=>{
         const data={
            search:formData.get("search")
         }
         const result= SearchSchema.safeParse(data)
         console.log(result)
         if(!result.success){
            result.error.issues.forEach(issue=>{
                toast.error(issue.message)
            })
            return
         }
         //se puede usar tambien el redirect
         router.push(`/admin/products/search?search=${result.data?.search}`)
    }

  return (
    <form action={handleSearchForm} className="flex items-center">
        <input type="text"
            placeholder="Buscar Producto"
            className="p-2 placeholder-gray-40 w-full"
            name="search"
        />
        <input type="submit"
              value={"Buscar"}
              className="bg-indigo-600 p-2 uppercase text-white cursor-pointer "
        />
    </form>
  )
}
