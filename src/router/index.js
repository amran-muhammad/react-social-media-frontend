import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../components/Home";
import About from "../components/About";
import AuthLayout from "../layouts/AuthLayout";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
      </Route>
    
    </Route>
  ))

export default router