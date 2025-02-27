import "../dashboard/style.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import logo from "./logo.png";
import { useState } from "react";

export const Dashboard = () => {

    const {addTransaction} = useAddTransaction();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmit = async (e) => {
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType})
    }

    return (
        <>
        <div className="spendsnap-container">
            <header className="spendsnap-header">
                <img src={logo} alt="SpendSnap Logo" className="spendsnap-logo" />
                <h1>SpendSnap</h1>
            </header>

            <section className="spendsnap-balance">
                <h3>Your Balance</h3>
                <h2>₹0.00</h2>
            </section>

            <section className="spendsnap-summary">
                <div>
                    <h4>Income</h4>
                    <p>₹0.00</p>
                </div>
                <div>
                    <h4>Expenses</h4>
                    <p>₹0.00</p>
                </div>
            </section>

            <form className="spendsnap-form" onSubmit={onSubmit}>
                <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)} />
                <div className="spendsnap-radio-group">
                    <input type="radio" value="expense" id="expense" name="type" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" value="income" id="income" name="type" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="income">Income</label>
                </div>
                <button type="submit">Add Transaction</button>
            </form>

            <section className="spendsnap-transactions">
                <h3>Transactions</h3>
            </section>

            <footer className="spendsnap-footer">
                Developed by Akshat Sharma | <a href="https://github.com/kshatsharmaaa">GitHub</a>
            </footer>
        </div>
        </>
    );
}


