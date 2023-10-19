export default function AddressCard(props){
  return (
    <div className="flex flex-wrap gap-4 lg:gap-6 w-full">
      <div
        key={props.title}
        className="relative border border-neutral-200 rounded-md w-full"
      >
        <div className="flex flex-col items-start p-[18px]">
          {
            Object.keys(props).map((key, idx) => idx === 0 ?
              (<p key={key} className="font-medium typography-text-base">{props[key]}</p>) :
              (
                <p key={key} className="font-normal typography-text-sm text-neutral-700">{props[key]}</p>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}