import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

function RankingChart({ title, data, valueKey = "value" }) {
  const chartData =
    data?.map((item) => ({
      name: item.player || item.team || "Unknown",
      value: Number(item[valueKey]) || 0,
    })) || [];

  return (
    <div className="ranking-chart">
      <div className="chart-heading">
        <div>
          <span>VISUAL BREAKDOWN</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 25,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#E5E7EB"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6B7280",
                fontSize: 11,
              }}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={135}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#374151",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(37, 99, 235, 0.05)",
              }}
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                color: "#111827",
                boxShadow:
                  "0 8px 20px rgba(17, 24, 39, 0.08)",
              }}
              labelStyle={{
                color: "#6B7280",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#2563EB",
                fontWeight: 600,
              }}
              formatter={(value) => [value, title]}
            />

            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              barSize={22}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#E11D48"
                      : "#2563EB"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RankingChart;