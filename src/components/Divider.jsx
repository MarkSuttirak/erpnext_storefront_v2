export default function Divider({size, color}){
  return (
    <div style={{paddingTop:size,paddingBottom:size,width:"100%"}}>
      <div className="h-[1px] w-full" style={{backgroundColor:color}}/>
    </div>
  )
}