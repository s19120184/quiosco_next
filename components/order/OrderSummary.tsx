"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { FormatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";


export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder= useStore((state)=> state.clearOrder)
  const total= useMemo(()=>order.reduce(( total, item)=>total + (item.quantity * item.price),0) ,[order])

  const handleCreateOrder= async(formData:FormData)=>{
        //recuperar datos del formData formData.get('el name del input')
        const data={
          name:formData.get('name'),
          total,
          order
        }
        //validacion del cliente
        const result = OrderSchema.safeParse(data)
        
        if(!result.success){
          result.error.issues.forEach((issue)=>{
            toast.error(issue.message)
          })
          return
        }
        
        //pasamos el objeto data al serverAction
        //validacion del servidor
      const response =await  createOrder(data)
      if(response?.errors){
        response.errors.forEach((issue)=>{
          toast.error(issue.message)
        })
      }
      toast.success("Pedido Realizado Correctamente")
      clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      {order.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> :
       <div className="mt-5">
          {order.map((item) =>(
              <ProductDetails 
                  key={item.id}
                  item={item}
              
              />
          ))}
          <p className="text-2xl mt-20 text-center ">
            Total a pagar:{''}
            <span className="font-bold">{FormatCurrency( total)}</span>
          </p>
          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input type="text" className="w-full p-3 uppercase" placeholder=" tu Nombre" name="name"/>
            <input type="submit"  className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
            value={'confirmar Pedido'}
            />
          </form>
       </div>
      }
    </aside>
  )
}
