import { prisma } from "@/src/lib/prisma" 
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"
import AdminRoute from "../admin/AdminRoute"
import { url } from "inspector"
import Link from "next/link"


async function getCategories(){
  return await  prisma.category.findMany()
 
}

export default  async function OrderSidebar() {

  const categories = await getCategories()
  console.log(categories)

  return (
    <aside className="md:w-72 md:h-screen bg-white">
         <Logo/>
        <nav className="mt-10">
          {categories.map(category=>(

            <CategoryIcon 
            key={category.id}
            category={category}
            />
          ))}
          <div className="flex items-center gap-4 w-full bg-blue-300 mx-auto border-t border-gray-200 p-3 last-of-type:border-b">
            
          <Link 
           className="text-xl font-bold"
           href='/admin/orders'>Administracion</Link>    
          </div>
          
          
        </nav>
        
    </aside>
  )
}
