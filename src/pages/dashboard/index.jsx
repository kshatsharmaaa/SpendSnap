export const Dashboard = () => {
    return (
    <>
    <div className="">
        <div className="">
            <h1>Expense Tracker</h1>
            <div className="">
                <h3>Your Balance</h3>
                <h2>₹0.00</h2>
            </div>
            <div className="">
                <div className="">
                    <h4>Income</h4>
                    <p>₹0.00</p>
                </div>
                <div className="">
                    <h4>Expenses</h4>
                    <p>₹0.00</p>
                </div>
            </div>

            <form action="">
                <input type="text" placeholder="Description" required />
                <input type="number" placeholder="Amount" required />
                <input type="radio" value="expense" id="expense" />
                <label for="expense">Expense</label>
                <input type="radio" value="income" id="income" />
                <label for="income">Income</label>
                <button>Add Transaction</button>
            </form>
        </div>
    </div>

    <div className="transactions">
        <h3>Transactions</h3>
    </div>
    </>
)
}