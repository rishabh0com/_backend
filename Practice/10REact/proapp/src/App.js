import { useEffect, useState } from "react";
import styles from "./App.module.css"


function App() {

  const [userData, setuserData] = useState([])
  async function getUserData(){
    try {
      let response = await fetch(`https://randomuser.me/api/`)
      let data = await response.json()
      let userInfo = data.results[0]
      console.log(userInfo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
      <div className={styles.userBox}>

      </div>
    </>
  )
}

export default App;
