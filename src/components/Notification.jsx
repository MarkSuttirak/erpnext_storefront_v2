export default function Notification({type, children, className}){
  const successStyle = {
    border:"1px solid #70DFA3",
    borderRadius:"7px",
    backgroundColor:"#F0FFF7",
    color:"#0E964D",
    padding:"12px"
  }

  const primaryStyle = {
    border:"1px solid #8A8A8A",
    borderRadius:"7px",
    backgroundColor:"#F4F4F4",
    color:"#8A8A8A",
    padding:"12px"
  }
  return (
    <div className={className} style={type === "success" ? successStyle : primaryStyle}>
      {children}
    </div>
  )
}