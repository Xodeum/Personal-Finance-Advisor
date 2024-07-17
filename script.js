function generateBudget() {
    const goal = document.getElementById('goal').value;
    const income = parseFloat(document.getElementById('income').value);
    const expensesInput = document.getElementById('expenses').value;
    const budgetAdviceDiv = document.getElementById('budgetAdvice');

    if (!goal || isNaN(income) || !expensesInput) {
        budgetAdviceDiv.innerHTML = "<p>Please fill in all fields correctly.</p>";
        return;
    }

    const expensesArray = expensesInput.split(',').map(expense => {
        const [item, cost] = expense.trim().split(' ');
        return { item, cost: parseFloat(cost) };
    });

    const totalExpenses = expensesArray.reduce((total, expense) => total + expense.cost, 0);
    const savings = income - totalExpenses;

    let advice = `
        <h2>Budget Advice</h2>
        <p><strong>Goal:</strong> ${goal}</p>
        <p><strong>Monthly Income:</strong> $${income.toFixed(2)}</p>
        <p><strong>Total Monthly Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
        <p><strong>Monthly Savings:</strong> $${savings.toFixed(2)}</p>
    `;

    if (savings > 0) {
        advice += `<p>You are saving $${savings.toFixed(2)} per month. Keep up the good work!</p>`;
    } else {
        advice += `<p>You are spending more than your income. Consider reducing some expenses to save money.</p>`;
    }

    const savingsTips = generateSavingsTips(expensesArray);
    advice += `<h2>Savings Tips</h2>${savingsTips}`;

    budgetAdviceDiv.innerHTML = advice;
}

function generateSavingsTips(expenses) {
    const tips = [
        "Consider reducing discretionary expenses.",
        "Look for cheaper alternatives for essential items.",
        "Create a meal plan to avoid overspending on groceries.",
        "Unplug electronics when not in use to save on utilities."
    ];

    // Custom tips based on input expenses
    const customTips = expenses.map(expense => {
        if (expense.item.toLowerCase().includes("rent")) {
            return "Consider finding a cheaper place to rent.";
        }
        if (expense.item.toLowerCase().includes("groceries")) {
            return "Look for grocery store discounts and coupons.";
        }
        if (expense.item.toLowerCase().includes("utilities")) {
            return "Reduce energy consumption to lower utility bills.";
        }
        return null;
    }).filter(tip => tip !== null);

    return `<ul>${[...customTips, ...tips].map(tip => `<li>${tip}</li>`).join('')}</ul>`;
}
