import { Route, Routes } from "react-router";
import Ragistration from "./pages/Ragistration";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateTodo from "./pages/CreateTodo";

function App() {
  return (
    <Routes>
      <Route index element={<Ragistration/>} />
      <Route path="/login" element={<Login/>} />
      <Route path={`/verify/:token`} element={<VerifyEmail />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path={`/reset-password/:token`} element={<ResetPassword />}/>
      <Route path="/create" element={<CreateTodo />}/>
    </Routes>
  )
}

export default App
