
import  {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/Login";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import ChatPage from "./pages/chat/ChatPage";

function App() {
  return (
      <Routes>
          <Route path={"/"} element={<Home />}/>
          <Route path={"/login"} element={<LoginPage/>}/>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/chat"} element={<ChatPage/>}/>

      </Routes>
  )
}

export default App;