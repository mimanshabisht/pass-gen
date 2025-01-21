import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [pass, setPass] = useState('')
  const [numAllow, setNumAllow] = useState(true)
  const [charAllow, setCharAllow] = useState(true)
  const [length, setLength] = useState(8)

  const passGenerator = useCallback(() => {
      let password = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let num = "1234567890"
      let chars = '!@#$%^&*(){}[]'
      if(numAllow) str += num
      if(charAllow) str += chars
      for(let i=1; i<=length; i++ ) {
        let charNum = Math.floor(Math.random() * str.length)
        console.log(charNum)
        password += str.charAt(charNum)
        console.log(password)
      }
      setPass(password);
      }, [length, numAllow, charAllow])


  const copyToClip = () => {
    inputElement.current.select()
    window.navigator.clipboard.writeText(pass);
  }

  useEffect(() => {
        passGenerator();
      }, [length, numAllow, charAllow])

  const inputElement = useRef(null)

  return (
    <div className="box"> 
    <div className="container">
      <h2>Password Generator</h2>
      <div className="passInput">
        <input type="text" value={pass} ref={inputElement} onClick={copyToClip} readOnly />
        <button onClick={copyToClip}>Copy</button>
      </div>
      <div className="functions">
      <div className='length'>
        <input type="range" min="1" max="20" step="1" value={length} onChange={(event) => setLength(event.target.value) }/>
        <label>Length: {length}</label>
      </div>
        <div className='checks'>
          <input type="checkbox" defaultChecked={numAllow} onChange={(e) => setNumAllow(prevValue => !prevValue)}/>
          <label className='number'>Numbers</label>
          <input type="checkbox" defaultChecked={charAllow} onChange={(e) => setCharAllow(prevValue => !prevValue)}/>
          <label>Characters</label>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default App
