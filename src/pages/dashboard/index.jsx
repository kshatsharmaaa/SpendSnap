import "../dashboard/style.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import logo from "../logo.png";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom"; 

export const Dashboard = () => {

    const {addTransaction} = useAddTransaction();
    const {transactions, transactionTotals } = useGetTransactions();
    const {name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const {balance, income, expenses} = transactionTotals

    const onSubmit = async (e) => {
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType});
        setDescription("");
        setTransactionAmount("");
    }

    const signUserOut = async () => {
        try {
          await signOut(auth);
          localStorage.clear();
          navigate("/");
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <img src={logo} alt="SpendSnap Logo" className="dashboard-logo" />
                    <h1>SpendSnap</h1>
                </div>
                <div className="user-info">
                    {profilePhoto && (<img className="user-photo" src={profilePhoto} alt="" />)}
                    <h2>{name}'s Expense Tracker</h2>
                    <button onClick={signUserOut} className="signout-button">Sign Out</button>
                </div>
            </header>

            <main className="dashboard-main">
                <section className="finance-section">
                    <h3>Your Balance</h3>
                    {balance >=0 ? (<h2>₹{balance}</h2>) : (<h2>-₹{balance*-1}</h2>)}
                    <div className="finance-summary">
                        <div>
                            <h4>Income</h4>
                            <p>₹{income}</p>
                        </div>
                        <div>
                            <h4>Expenses</h4>
                            <p>₹{expenses}</p>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="transaction-form">

                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <input type="number" placeholder="Amount" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} required />
                        <div className="radio-group">
                            <input type="radio" id="expense" value="expense" checked={transactionType === 'expense'} onChange={(e) => setTransactionType(e.target.value)} />
                            <label htmlFor="expense">Expense</label>
                            <input type="radio" id="income" value="income" checked={transactionType === 'income'} onChange={(e) => setTransactionType(e.target.value)} />
                            <label htmlFor="income">Income</label>
                        </div>
                        <button className="add-transaction-button" type="submit">Add Transaction</button>
                    </form>
                </section>

                <section className="transactions-section">
                    <h3>Transactions</h3>
                    <ul className="transactions-list">
                    {transactions.map((transaction) => {
                        const {description, transactionAmount, transactionType} = transaction;
                        return (
                        <li>
                            <h4>{description} </h4>
                            <p>₹{transactionAmount} • <label style={{ color: transactionType === "expense" ? "red" : "green", }}> {transactionType}</label></p>

                        </li>
                        )
                    })}
                    </ul>
                </section>
            </main>

            <footer className="dashboard-footer">
                Developed by Akshat Sharma | <a href="https://github.com/kshatsharmaaa">GitHub</a>
            </footer>
        </div>
    );
}


