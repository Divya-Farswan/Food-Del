import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return (
        <div>
            <ToastContainer />
            {
                token === ""
                    ? <Login setToken={setToken} />
                    :
                    <>
                        <Navbar setToken={setToken}/>
                        <hr />
                        <div className="app-content">
                            <Sidebar />
                            <Routes>
                                <Route path="/add" element={<Add token={token}/>} />
                                <Route path="/list" element={<List token={token}/>} />
                                <Route path="/orders" element={<Orders token={token}/>} />
                            </Routes>
                        </div>
                    </>
            }
        </div>
    )
}

export default App
