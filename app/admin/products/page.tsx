import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount(){
  //consultar cuantos productos hay en la base de datos
  return await prisma.product.count()
}


async function getProdcuts(page:number , pageSize:number){
  
  const skip= (page-1)* pageSize

   const products=await prisma.product.findMany({
     take:pageSize,//toma los primeros 10
     skip,// el salto de elementos
     include:{
      category:true
     }
   })
   return products
}

export type ProductsWithCategory=Awaited<ReturnType<typeof getProdcuts>>

//para parametros en la url con searchParams es propio de next
export default async function ProductsPage({searchParams}:{searchParams: {page:string}}) {
    
   
     //identificamos en la pagina que estamos 
    const page = +searchParams.page || 1
    const pageSize = 10

    if(page < 0) redirect('/admin/products')

    const totalProductsData= productCount()
    const productsData= getProdcuts(page,pageSize)
    //cuando las consultas son independietes lo mejor es usar
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    //sacamos el total de  las paginas
    const totalPages= Math.ceil(totalProducts/pageSize)

    if(page> totalPages){
      //redireccionamos al usuario al inicio
      redirect('/admin/products')
    }

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link 
            href={`/admin/products/new`}
            className="bg-amber-500 w-full font-bold lg:w-auto text-xl px-10 py-3 text-center cursor-pointer"
            >
              Crear Producto
            </Link>
            <ProductsSearchForm/>
      </div>
      <ProductTable
        products={products}
      />
      <ProductsPagination 
             totalPages={totalPages}
             page={page}
      />
    </>
  )
}
