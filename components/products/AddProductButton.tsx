
"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type productTypeProps = {
    product:Product
}
export default function AddProductButton({product}:productTypeProps) {

    const addTocart=useStore((state)=> state.addToCard)

  return (
    <button className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    onClick={ ()=> addTocart(product)}
    >Agregar</button>
  )
}
