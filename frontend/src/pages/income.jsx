import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext" // Ensure correct path

const Income = () => {

    const { addIncome } = useContext(AppContext)

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "", // This is the 'type' field being sent
        category: "",
        description: "",
        date: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const amount = Number(formData.amount)

        // Basic client-side validation
        if (!formData.title || !formData.amount || !formData.type || !formData.category || !formData.description || !formData.date) {
            alert("Please fill in all fields.");
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert("Amount must be a positive number.");
            return;
        }

        // Call addIncome with correct arguments
        addIncome(formData.title, amount, formData.type, formData.category, formData.description, formData.date)

        // Reset form after successful submission (assuming addIncome handles toast/navigation)
        setFormData({
            title: "",
            amount: "",
            type: "",
            category: "",
            description: "",
            date: ""
        })
    }

    return (
        <div className="mx-auto max-w-2xl md:mt-6 bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Add Income</h1>
            <form onSubmit={handleSubmit} className="space-y-0.5">
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus: outline-none focus: ring focus: ring-blue-300"
                        placeholder="Enter income title" // Changed placeholder to "income"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Amount
                    </label>
                    <input
                        type="number" // Changed to type="number" for better input handling
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus: outline-none focus: ring focus: ring-blue-300"
                        placeholder="Enter amount"
                        required
                    />
                </div>
                <div className="mb-4" >
                    <label className="block text-gray-600 mb-2">Income Type</label>
                    <select onChange={handleChange} value={formData.type} name="type" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required>
                        <option value="" disabled>Select type</option>
                        <option value="salary">Salary</option>
                        <option value="rental">Rental Income</option>
                        <option value="business">Business</option>
                        <option value="investment">Investment</option>
                        <option value="freelance">Freelance</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4" >
                    <label className="block text-gray-600 mb-2">Category</label>
                    <select onChange={handleChange} value={formData.category} name="category" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required>
                        <option value="" disabled>Select category</option> {/* Changed 'type' to 'category' */}
                        <option value="monthly-salary">Month Salary</option>
                        <option value="dividends">Dividends</option>
                        <option value="consulting">Consulting</option>
                        <option value="transportation">Transportation</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="side-hustle">Side Hustle</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        className="w-full px-3 py-2 border rounded-md focus: outline-none focus: ring focus: ring-blue-300"
                        placeholder="Enter a description"
                        rows="3" // Changed 'row' to 'rows' (HTML attribute)
                        required
                    >
                    </textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus: outline-none focus: ring focus: ring-blue-300"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    )
}

export default Income