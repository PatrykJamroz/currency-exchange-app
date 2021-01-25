import { stringify } from "postcss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Chart(props: any) {
  const SimpleAreaChart = (
    <AreaChart width={330} height={150} data={props.data}>
      <CartesianGrid />
      <XAxis dataKey="date" style={{ fontSize: 12 }} />
      <YAxis type="number" domain={["auto", "auto"]} style={{ fontSize: 12 }} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="rate"
        stroke="000000"
        fill="#000000"
        fillOpacity="80%"
      />
    </AreaChart>
  );

  return <div>{SimpleAreaChart}</div>;
}

//            style={{ width: 400, border: "solid" }}
