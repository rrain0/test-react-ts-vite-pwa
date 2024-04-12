import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useBoolState } from 'src/util/react/useBoolState';


const UseEffectTest =
React.memo(()=>{
  const [showDiv, , , toggleDiv] = useBoolState(true)
  const [cnt, setCnt] = useState(0)
  
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(
    ()=>{
      console.log(`Effect applied, cnt: ${cnt}, ref.tagName: ${ref.current?.tagName}`)
      //some logic
      return () => {
        console.log(`Effect cleaning up, cnt: ${cnt}, ref.tagName: ${ref.current?.tagName}`)
        //cleanup logic
      }
    },
    [cnt]
  )
  useLayoutEffect(
    ()=>{
      console.log(`Layout Effect applied, cnt: ${cnt}, ref.tagName: ${ref.current?.tagName}`)
      //some logic
      if (cnt<5) setCnt(cnt+1)
      return () => {
        console.log(`Layout Effect cleaning up, cnt: ${cnt}, ref.tagName: ${ref.current?.tagName}`)
        //cleanup logic
      }
    },
    [cnt]
  )
  
  
  return <div style={{
    display: 'flex',
    flexFlow: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div>Use Effect Test</div>
    
    {showDiv && <div ref={ref}>Test Div</div>}
    <button onClick={toggleDiv}>Toggle Div</button>
    
    <div>Count: {cnt}</div>
    <button onClick={() => setCnt(cnt + 1)}>++</button>
    
    <>{console.log('rendering...')}</>
  </div>
})
export default UseEffectTest