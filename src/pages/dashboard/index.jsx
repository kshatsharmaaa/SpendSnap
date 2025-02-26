import "../dashboard/style.css";

export const Dashboard = () => {
    return (
        <>
        <div className="spendsnap-container">
            <div className="spendsnap-header">
                <h1>SpendSnap</h1>
            </div>

            <div className="spendsnap-balance">
                <h3>Your Balance</h3>
                <h2>₹0.00</h2>
            </div>

            <div className="spendsnap-summary">
                <div>
                    <h4>Income</h4>
                    <p>₹0.00</p>
                </div>
                <div>
                    <h4>Expenses</h4>
                    <p>₹0.00</p>
                </div>
            </div>

            <form className="spendsnap-form">
                <input type="text" placeholder="Description" required />
                <input type="number" placeholder="Amount" required />
                <div>
                    <input type="radio" value="expense" id="expense" />
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" value="income" id="income" />
                    <label htmlFor="income">Income</label>
                </div>
                <button type="submit">Add Transaction</button>
            </form>

            <div className="spendsnap-transactions">
                <h3>Transactions</h3>
            </div>

            <footer className="spendsnap-footer">
                Developed by Akshat Sharma | 
                <a href="https://github.com/kshatsharmaaa" > GitHub</a>
            </footer>
        </div>
        </>
    );
}


