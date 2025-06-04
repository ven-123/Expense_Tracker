import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import cookie from 'js-cookie'
import axios from 'axios'
import {toast} from 'react-toastify'
import  {jwtDecode}   from 'jwt-decode'

export const AppContext = createContext()

const AppcontextProvider = ({children})=> {

    const navigate = useNavigate()

    const [ExpenseData, setExpenseData] = useState([])
    const [IncomeData, setIncomeData] = useState([])
    const [token, setToken] = useState(Boolean(cookie.get("token")))

    const backendUrl = 'http://localhost:4000'
    const utoken = cookie.get('token')

    const fetchIncome = async() =>{
        try{

            const decodedToken = jwtDecode(utoken)
            const userId = decodedToken?.id 

            if (!userId){
                return
            }

            const {data} = await axios.get(`${backendUrl}/api/user/get-income`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if(data.success){
                   setIncomeData(data.data) 
                }
        } catch(error){
            console.log(error)
        }
    }

    const fetchExpense = async() =>{
        try{

            const decodedToken = jwtDecode(utoken)
            const userId = decodedToken?.id 

            if (!userId){
                return
            }

            const {data} = await axios.get(`${backendUrl}/api/user/get-expense`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if(data.success){
                   setExpenseData(data.data) 
                }
        } catch(error){
            console.log(error)
        }
    }

    const addIncome = async(title, amount, income, category, description, date) =>{
        try{

            const {data} = await axios.post(`${backendUrl}/api/user/add-income`,{title, amount , type, category, description, date}, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if(data.success){
                   toast.success(data.message)
                   fetchIncome()
                   navigate('/')
            }

        } catch(error){
            console.log(error)
        }
    }

    const addExpense = async(title, amount, income, category, description, date) =>{
        try{

            const {data} = await axios.post(`${backendUrl}/api/user/get-expense`,{title, amount ,income, category, description, date}, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if(data.success){
                   toast.success(data.message)
                   fetchExpense()
                   navigate('/')
                }

        } catch(error){
            console.log(error)
        }
    }

    const handleRegister = async(name, email, password) =>{
        try{
            const {data} =await axios.post(`${backendUrl}/api/user/register`, {name, email, password},{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(data.success){
                    cookie.set("token", data.token, {expires: 7})
                    setToken(true)
                    fetchIncome()
                    fetchExpense()
                    toast.success(data.message || "Register successful")
                    navigate('/')
                }
            
        } catch(error){
            console.log(error)
        }
    }

    const handleLogin = async(email, password) =>{
        try{
            const {data} =await axios.post(`${backendUrl}/api/user/login`, {email, password},{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(data.success){
                    console.log(data)
                    cookie.set("token", data.token)
                    setToken(true)
                    fetchIncome()
                    fetchExpense()
                    navigate('/')
                    toast.success(data.message || "Login Successful")
                }
            
        } catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchIncome()
        fetchExpense()
    }, [])

    useEffect(()=>{
        if(token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get("token")}`
        } else{
            delete axios.defaults.headers.common["Authorization"]
        }
    }, [token])


    const values = {
        backendUrl,
        handleRegister,
        handleLogin,
        fetchIncome,
        fetchExpense,
        addIncome,
        addExpense,
        IncomeData,
        ExpenseData, token,
        setToken

    }

    return <AppContext.Provider value = {values}>
        {children}
    </AppContext.Provider>
}

export default AppcontextProvider