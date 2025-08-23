import { useState, useContext, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { backendUrl } from '../../App';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, redirectPath, setRedirectPath } = useContext(StoreContext)
    const [currState, setCurrState] = useState('Sign Up')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    
    const onLogin = async (event) => {
        event.preventDefault()

        try {
            // logic to call api
            let newUrl = backendUrl;
            if (currState === "Login") {
                newUrl += "/api/user/login"
            } else {
                newUrl += "/api/user/register"
            }

            // call api
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                console.log("Redirect Path is:", redirectPath); 
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false)

                // redirect logic
                if (redirectPath) {
                    navigate(redirectPath);
                    setRedirectPath(null);
                } else {
                    navigate("/")
                }
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong! Please try again.");
        }
    }

    useEffect(() => {
  console.log("Redirect Path changed:", redirectPath);
}, [redirectPath]);


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>
                        {currState}
                    </h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Your Password' required />
                </div>
                <button type='submit'>{currState === 'Sign Up' ? "Sign Up" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                {currState === 'Login'
                    ? <p>Create a account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}
export default LoginPopup
