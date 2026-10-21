import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Fixed color per category so a bar keeps its color when the list re-sorts
const CATEGORY_COLORS = {
  food: "#2a78d6",
  housing: "#eb6834",
  utilities: "#1baf7a",
  transport: "#eda100",
  entertainment: "#e87ba4",
  other: "#008300",
};

const CategoryBar = (props) => (
  <Rectangle {...props} fill={CATEGORY_COLORS[props.payload.category]} />
);

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
            <CartesianGrid horizontal={false} stroke="#eee" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" width={100} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`$${value}`, "Spent"]} cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="amount" shape={CategoryBar} radius={[0, 4, 4, 0]} barSize={20}>
              <LabelList dataKey="amount" position="right" formatter={(value) => `$${value}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
