import { ChevronRight } from "@untitled-ui/icons-react"
import { useState, useRef } from "react"

export default function Accordion({items}){
  const content = useRef(null);

  const handleClick = (event) => {
    event.currentTarget.classList.toggle("active");
    var panel = event.currentTarget.nextElementSibling;

    if (panel.style.maxHeight){
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  return (
    <div>
      {items.map((item, index) => {
        return (<div key={index}>
          <button onClick={handleClick} className={`p-5 lg:px-0 accordion-btn font-bold text-sm`}>
            {item.title}
            <ChevronRight className={`accordion-arrow-anim`}/>
          </button>
          <div ref={content} className={`accordion-detail`}>
            <div className="pb-5 px-5 lg:px-0">{item.content}</div>
          </div>
        </div>)
      })}
    </div>
  )
}