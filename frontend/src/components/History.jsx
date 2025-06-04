import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js"
import { AppContext } from "../context/AppContext"
import { useContext, useEffect, useState } from "react"

ChartJs.register(ArcElement, Tooltip, Legend, Title)

const History = () => {
  const { IncomeData, ExpenseData } = useContext(AppContext)

  const parsePrice = (price) => {
    return typeof price === "number"
      ? price
      : parseFloat(price.replace(/[^0-9,-]+/g, ""))
  }

  const [minIncome, setMinIncome] = useState(0)
  const [maxIncome, setMaxIncome] = useState(0)
  const [minExpense, setMinExpense] = useState(0)
  const [maxExpense, setMaxExpense] = useState(0)

  useEffect(() => {
    const incomePrices = IncomeData.map((item) => parsePrice(item.amount))
    const expensePrices = ExpenseData.map((item) => parsePrice(item.amount))

    setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0)
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0)
    setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0)
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0)
  }, [IncomeData, ExpenseData])

  const chartData = {
    labels: [
      "Total Income",
      "Total Expense",
      "Min Income",
      "Max Income",
      "Min Expense",
      "Max Expense"
    ],
    datasets: [
      {
        data: [
          IncomeData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          ExpenseData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense
        ],
        backgroundColor: [
          "#36A2EB", // Total income
          "#FF6384", // Total expense
          "#4BC0C0", // Min income
          "#FFCE56", // Max income
          "#9966FF", // Min expense
          "#FF9F40"  // Max expense
        ],
        hoverBackgroundColor: [
          "#6683FF",
          "#FF6F91",
          "#70D8D8",
          "#FFD966",
          "#B38FFF",
          "#FFB673"
        ]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income and Expense BreakDown"
      },
      legend: {
        position: "bottom"
      }
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Recent History</h1>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {IncomeData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border border-gray-200"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">${item.amount}</p>
            </div>
            <div className="text-sm font-semibold text-green-500">
              ${item.amount}
            </div>
          </div>
        ))}

        {ExpenseData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border border-gray-200"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">${item.amount}</p>
            </div>
            <div className="text-sm font-semibold text-red-500">
              ${item.amount}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Spend Overview</h2>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default History
