import { useStore } from '@/src/store'
import { OrderItem } from '@/src/types'
import { FormatCurrency } from '@/src/utils'
import { PlusIcon } from '@heroicons/react/24/outline'
import { MinusIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/outline'
import  { useMemo } from 'react'

type productTypeProps={
    item:OrderItem
}
const MIN_ITEMS= 1
const MAX_ITEMS= 5

export default function ProductDetails({item}:productTypeProps) {

    const increseQuentity= useStore((state)=> state.increseQuentity)
    const decreaseQuentity= useStore((state)=> state.decreseQuentity)
    const removeItem = useStore((state)=> state.removeItem)

    const disableDecreseButton= useMemo(()=>item.quantity==MIN_ITEMS,[item])
    const disableIncreseButton= useMemo(()=>item.quantity==MAX_ITEMS,[item])
    
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
  <div className="space-y-4">
    <div className="flex justify-between items-start">
        <p className="text-xl font-bold">{item.name} </p>

        <button
          type="button"
          onClick={() =>removeItem(item.id)}
        >
          <XCircleIcon className="text-red-600 h-8 w-8"/>
        </button>
    </div>
    <p className="text-2xl text-amber-500 font-black">
        {FormatCurrency(item.price)}
    </p>
    <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
        <button
          type="button"
          onClick={() => decreaseQuentity(item.id)}
          disabled={disableDecreseButton}
          className='disabled:opacity-20'
        >
            <MinusIcon className="h-6 w-6"/>
        </button>

        <p className="text-lg font-black ">
          {item.quantity}
        </p>

        <button
           type="button"
           onClick={() => increseQuentity(item.id)}
           disabled={disableIncreseButton}
           className='disabled:opacity-10'
        >
            <PlusIcon className="h-6 w-6"/>
        </button>
    </div>
    <p className="text-xl font-black text-gray-700">
        Subtotal: {''}
        <span className="font-normal"> 
            {FormatCurrency(item.subtotal)}
        </span>
    </p>
  </div>
</div>
  )
}
