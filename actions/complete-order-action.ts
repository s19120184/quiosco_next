"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"


export async function completeOrder(formData:FormData){

    const data={
        orderId: formData.get('order_id')
    }
    //validamos con schema de zod
    const result= OrderIdSchema.safeParse(data)

    if(result.success){

     try{
        await prisma.order.update({
            where:{
                id:result.data.orderId
            },
            data:{
                status:true,
                orderReadyAt:new Date(Date.now())
            }
        })
        revalidatePath('/admin/orders')
     } catch(e){
         console.log(e)
     }
    }
}