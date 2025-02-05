import { Order, OrderProducts, Product } from "@prisma/client";

export type OrderItem =Pick< Product , 'id'| 'name'|'price'>&{
    quantity: number
    subtotal: number
}


// {
//     id: 1,
//     name: 'Luis el dev',
//     total: 229.6,
//     date: 2024-08-27T05:00:37.410Z,
//     status: false,
//     orderReadyAt: null,
//     orderProducts: [ [Object], [Object], [Object], [Object] ]       
//   },
export type OrderWithProducts = Order & {
    orderProducts:(OrderProducts & {
        product:Product
    })[]
}