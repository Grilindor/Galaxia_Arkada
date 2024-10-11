import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import User from "./User";
import Signup from "./Sign_Up";
import Bibliothèque from "./Bibliothèque";
import Forgotpassword from "./ForgotPassword";
import Game from "./Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/Bibliothèque" element={<Bibliothèque />} />
        <Route path="/forgot_password" element={<Forgotpassword />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
