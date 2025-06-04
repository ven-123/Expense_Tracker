import Chart from "../components/chart"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const DashBoard = () => {
  const { IncomeData, ExpenseData } = useContext(AppContext)

  const totalIncome = IncomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  const totalExpense = ExpenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0)

  const totalBalance = totalIncome - totalExpense

  return (
    <div className="flex flex-col h-full w-full p-4 space-y-4 overflow-y-auto">
      {/* Chart section */}
      <div className="flex-grow min-h-[300px]">
        <Chart IncomeData={IncomeData} ExpenseData={ExpenseData} />
      </div>

      {/* Income & Expense Cards */}
      <div className="flex justify-between">
        <div className="bg-white p-4 rounded shadow w-[48%]">
          <h1 className="font-bold text-sm md:text-2xl">Total Income</h1>
          <p className="text-xl text-green-500 font-bold md:mt-2">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-[48%]">
          <h1 className="font-bold text-sm md:text-2xl">Total Expense</h1>
          <p className="text-xl text-red-500 font-bold md:mt-2">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Total Balance */}
      <div className="flex justify-center">
        <div className="text-center">
          <h1 className="font-bold text-lg md:text-3xl underline">Total Balance</h1>
          <p
            className="font-medium text-3xl md:text-6xl mt-2"
            style={{ color: totalBalance < 0 ? "red" : "green" }}
          >
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
