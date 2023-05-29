import { Outlet, Navigate } from "react-router-dom"
const token = true

const AuthLayout = () => {
    return (<div>
        <h1>Auth Layout</h1>
        
        { token ? <Outlet/> : <Navigate to="/" />}
    </div>)
}

export default AuthLayout