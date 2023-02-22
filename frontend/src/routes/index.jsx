import RootLayout from "../layouts/RootLayout"
import { Routes, Route, Link } from "react-router-dom"
import React, {Suspense, lazy} from "react"
const Register = lazy(()=>import("../pages/Register"))
const Login = lazy(()=>import("../pages/Login"))
const Shopping = lazy(()=>import("../pages/Shopping"))
const Test = lazy(()=>import("../pages/Test"))

const AppRoute=()=>{
    return(
        <RootLayout>
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
                    <Route path="/" element={
                        <Shopping />
                    }/>
                    <Route path="/test" element={
                        <Test />
                    }/>
                </Routes>
            </Suspense>
            
        </RootLayout>
    )
}
export default AppRoute