import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import ArkNights from '../src/page/arkNights'
import styles from './App.module.css'

function App() {
  const [arr, setArr] = useState<number[]>([])
  const onClick = () => {
    const a = [1, 2, 3, 4, 5]
    for (let i of a) {
      setArr((pre) => [...pre, i])
    }
  }
  useEffect(() => {
    const a = [1, 2, 3, 4, 5]
    for (let i of a) {
      setArr((pre) => [...pre, i])
    }
  }, []);
  return (
    <div className={styles.bg}>
      {/* {JSON.stringify(arr)}
      <button onClick={onClick}>点击</button> */}
      <ArkNights></ArkNights>
    </div>
  )
}

export default App
