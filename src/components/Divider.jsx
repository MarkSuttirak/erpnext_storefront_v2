export default function Divider({size, color}){
  return (
    <div style={{paddingTop:size,paddingBottom:size}}>
      <div className="h-[1px] w-full" style={{backgroundColor:color}}/>
    </div>
  )
}