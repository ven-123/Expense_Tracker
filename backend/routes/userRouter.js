import express from 'express'
import { register } from '../controllers/userControllers.js'
import { login } from '../controllers/userControllers.js'
import { addIncome, deleteIncome, updateIncome, getIncome } from '../controllers/incomeController.js'
import { addExpense, deleteExpense, updateExpense, getExpense } from '../controllers/expenseController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login',login)

userRouter.post('/add-income', authMiddleware, addIncome)
userRouter.put('/update-income/:id', authMiddleware, updateIncome)
userRouter.delete('/delete-income/:id',deleteIncome)
userRouter.get('/get-income',authMiddleware,getIncome)

userRouter.post('/add-expense', authMiddleware, addExpense)
userRouter.put('/update-expense/:id', authMiddleware, updateExpense)
userRouter.delete('/delete-expense/:id',deleteExpense)
userRouter.get('/get-expense',authMiddleware,getExpense)

export default userRouter