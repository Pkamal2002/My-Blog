import { Link } from "react-router-dom"

function App() {


  return (
  <>
  <Link to={"/register"}>Register</Link>
  <Link to={"/login"}>Login</Link>
  <Link to={"/about"}>About</Link>
  </>
  )
}

export default App
