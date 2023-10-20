export default function LoadingSpin({size, innerSize, color}){
  const outerStyle = {
    width:`${size}px`,
    height:`${size}px`,
    borderRadius:"50%",
    margin:"auto",
    background:`linear-gradient(0deg, ${color}, #FFFFFF)`
  }
  const innerStyle = {
    width:`${innerSize}px`,
    height:`${innerSize}px`,
    margin:"auto",
    display:"block",
    transform:`translate(0,${(size - innerSize) / 2}px)`,
    borderRadius:"50%",
    background:"white"
  }
  return (
    <div className="loading-icon" style={outerStyle}>
      <div style={innerStyle} />
    </div>
  )
}