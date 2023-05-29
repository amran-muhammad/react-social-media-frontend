import { useState } from "react"
import { callApi } from "../../common/callApi";

const Signup = () => {
    let [user_data, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={(e)=>{
                e.preventDefault();
                callApi.postApi('/user/register',user_data).then(res=>{
                    window.location.href = '/auth/signin'
                })
            }}>
                <h2>Enter Name</h2>
                <input required type="text" value={user_data.name} onChange={(e)=>{
                    setUserData((prevState) => {
                        const user_data = {...prevState};
                        user_data.name = e.target.value
                            return user_data;
                        });
                
                }}></input>
                <br />
                <h2>Enter Email</h2>
                <input required type="email" value={user_data.email} onChange={(e)=>{
                    setUserData((prevState) => {
                        const user_data = {...prevState};
                        user_data.email = e.target.value
                            return user_data;
                        });
                
                }}></input>
                <br />
                <h2>Enter Password</h2>
                <input required type="password" value={user_data.password} onChange={(e)=>{
                    setUserData((prevState) => {
                        const user_data = {...prevState};
                        user_data.password = e.target.value
                            return user_data;
                        });
                
                }}></input>

                <br />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Signup