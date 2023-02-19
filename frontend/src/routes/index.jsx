import RootLayout from "../layouts/RootLayout"
import { Routes, Route, Link } from "react-router-dom"
import React, {Suspense, lazy} from "react"
const Register = lazy(()=>import("../pages/Register"))
const Login = lazy(()=>import("../pages/Login"))

const AppRoute=()=>{
    return(
        <RootLayout>
            <div className="wrapper">
                <div className="sidebar">
                    <Routes>
                        <Route path="/login" element={
                            <p>Log in page</p>
                        }/>
                        <Route path="/register" element={
                            <p>Register page</p>
                        }/>
                        <Route path="/shopping" element={
                            <p>Shopping page</p>
                        }/>
                    </Routes>
                </div>
            </div>
            <Suspense fallback={<h1>Now Loading...</h1>}>
                <Routes>

                    <Route path="*" element={
                            <p>Not Found</p>
                    }/>
                    <Route path="/login" element={
                        <Login />
                    }/>
                    <Route path="/register" element={
                        <Register />
                    }/>
                    <Route path="/shopping" element={
                        <p>Shopping page</p>
                    }/>
                </Routes>
            </Suspense>
            
        </RootLayout>
    )
}
export default AppRoute