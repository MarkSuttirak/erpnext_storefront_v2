export default function WishlistProducts({key, name, price, image, desc}){
  return (
    <>
      {/* Mobile */}
      <li key={key} className="flex p-5 lg:hidden flex-col border-b border-b-[#E3E3E3]">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src={image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{name}</h3>
              <p className="ml-4">{price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500 mb-5">{desc}</p>

            <button className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'>ใส่ตะกร้า</button>
          </div>
        </div>
      </li>

      {/* Desktop */}
      <li key={key} className="hidden lg:flex flex-col pt-6 cursor-pointer">
        <div className="relative flex-shrink-0 overflow-hidden rounded-md add-to-cart-img">
          <img src={image} alt={name} className="h-full w-full object-cover object-center" />

          <button className='w-[90%] mx-auto absolute add-to-cart-wishlist bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'>ใส่ตะกร้า</button>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col mt-6">
            <p className="text-base text-[#8A8A8A] mb-1">{desc}</p>
            <h3 className="text-[15px] text-[#111111] font-bold">{name}</h3>
            <p className="text-[#111111] text-[20px] mt-[10px]">{price}</p>
          </div>
        </div>
      </li>
    </>
  )
}