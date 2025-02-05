import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToCard: (product: Product) => void;
  increseQuentity:(id:Product['id']) => void;
  decreseQuentity:(id:Product['id']) => void;
  removeItem:(id:Product['id']) => void;
  clearOrder:()=>void
}

export const useStore = create<Store>((set, get) => ({
  order: [], //inicia como un arreglo vacio
  addToCard: (product) => {
    //omitimos categoryId y image nos quedamos con el resto de los datos del producto
    const { categoryId, image, ...data } = product;

    let order: OrderItem[] = [];

    if (get().order.find((item) => item.id === data.id)) {
      order = get().order.map((item) =>
        item.id === data.id
          ? {
              ...item, //copia del item
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1)
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price
        }
      ];
    }

    set(() => ({
      order
    }));
  },
  increseQuentity:(productId)=>{
     set((state)=>({

        order:state.order.map((item) => item.id === productId ? {
            ...item,
            quantity: item.quantity+1,
            subtotal: item.price * (item.quantity + 1)

        } : item)
     }))
  },
  decreseQuentity:(productId)=>{
      const order = get().order.map((item) => item.id === productId ? {
        ...item,
        quantity: item.quantity-1,
        subtotal: item.price * (item.quantity-1)
      } : item)

      set(() => ({
           order
      }))
  },
  removeItem:(productId)=>{
         const order = get().order.filter((item)=> item.id !== productId )
         set(() => ({
            order
         }))
  },
  clearOrder:()=>{
     set(()=>({
        order:[]
     }))
  }
}));
