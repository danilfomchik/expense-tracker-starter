import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Fixed color per category so a bar keeps its color when the list re-sorts
const CATEGORY_COLORS = {
  food: "#c9922e",
  housing: "#8c3f31",
  utilities: "#4d6a78",
  transport: "#6b6f5a",
  entertainment: "#8a5a74",
  other: "#5c5a55",
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
        <p className="empty">No expenses yet. Add one below to see where your money goes.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
            <CartesianGrid horizontal={false} stroke="#d4d0c8" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" width={100} tickLine={false} axisLine={false} tick={{ fill: "#26282b", fontSize: 14 }} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Spent"]}
              cursor={{ fill: "#e4e1da" }}
              contentStyle={{ background: "#26282b", border: "none", borderRadius: 0 }}
              itemStyle={{ color: "#ece9e2" }}
              labelStyle={{ color: "#c9922e" }}
            />
            <Bar dataKey="amount" shape={CategoryBar} barSize={20}>
              <LabelList dataKey="amount" position="right" formatter={(value) => `$${value}`} fill="#26282b" fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
