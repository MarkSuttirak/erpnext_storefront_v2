export default function OrderSummary({name, desc, price, image, discountedPrice}){
  return (
    <section className="py-5 border-b border-b-[#E3E3E3]">
      <div className="flex gap-x-[14px]">
        <div className="w-[30%]">
          <img src={image} />
        </div>
        <div className="flex w-full flex-col gap-y-3 w-[70%]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="inter text-sm font-semibold">{name}</h2>
              <p className="mt-[6px] text-[#625C5C] text-xs">{desc}</p>
            </div>

            <p className="inter text-sm font-semibold">
              {price}
              {discountedPrice ? discountedPrice : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}