import { ToastContainer } from 'react-toastify'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import SideBar from './components/SideBar'
import DashBoard from './pages/DahBoard'
import History from './components/History'
import ViewTransactions from './pages/viewTransactions'
import Income from './pages/income'
import Expense from './pages/Expenses'
import IncomeTransactions from './pages/IncomeTransactions'
import ExpenseTransactions from './pages/ExpensesTransactions'
import Login from './pages/login'
import Register from './pages/Register'

const App = () => {
  const location = useLocation()
  const { token, fetchIncome, fetchExpense } = useContext(AppContext)

  const hideMainLayout = ["/view-transaction", '/add-income', '/add-expense', '/income-transactions', '/expense-transactions', '/login', '/register'].includes(location.pathname)

  useEffect(() => {
    if (token) {
      fetchIncome()
      fetchExpense()
    }
  }, [token, location.pathname])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ToastContainer />
      <SideBar />

      {!hideMainLayout ? (
        <div className="flex flex-row w-full h-full">
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-100 via-white to-white">
            <Routes>
              <Route path="/" element={<DashBoard />} />
            </Routes>
          </div>
          <div className="md:w-1/3 hidden lg:flex flex-col overflow-y-auto">
            <Routes>
              <Route path="/" element={<History />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full h-full overflow-y-auto bg-gradient-to-b from-blue-100 via-white to-white">
          <Routes>
            <Route path="/view-transaction" element={<ViewTransactions />} />
            <Route path="/add-income" element={<Income />} />
            <Route path="/add-expense" element={<Expense />} />
            <Route path="/income-transactions" element={<IncomeTransactions />} />
            <Route path="/expense-transactions" element={<ExpenseTransactions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
