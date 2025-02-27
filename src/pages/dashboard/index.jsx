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
        <>
        <div className="spendsnap-container">
            <header className="spendsnap-header">
                <img src={logo} alt="SpendSnap Logo" className="spendsnap-logo" />
                <h1>SpendSnap</h1>
                <h2>{name}'s Expense Tracker</h2>
                {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePhoto} alt="" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
            </header>

            <section className="spendsnap-balance">
                <h3>Your Balance</h3>
                {balance >=0 ? (<h2>₹{balance}</h2>) : (<h2>-₹{balance*-1}</h2>)}
                
            </section>

            <section className="spendsnap-summary">
                <div>
                    <h4>Income</h4>
                    <p>₹{income}</p>
                </div>
                <div>
                    <h4>Expenses</h4>
                    <p>₹{expenses}</p>
                </div>
            </section>

            <form className="spendsnap-form" onSubmit={onSubmit}>
                <input type="text" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
                <div className="spendsnap-radio-group">
                    <input type="radio" value="expense" id="expense" name="type" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" value="income" id="income" name="type" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="income">Income</label>
                </div>
                <button type="submit">Add Transaction</button>
            </form>
            
            <div className="spendsnap-transactions">
                <h3>Transactions</h3>
                <ul>
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
            </div>

            <footer className="spendsnap-footer">
                Developed by Akshat Sharma | <a href="https://github.com/kshatsharmaaa">GitHub</a>
            </footer>
        </div>
        </>
    );
}


