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
    <AreaChart
      width={350}
      height={200}
      data={props.data}
      style={{ margin: "auto" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );

  return <div>{SimpleAreaChart}</div>;
}
