import { stringify } from "postcss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart(props: any) {
  const SimpleAreaChart = (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart
        width={330}
        height={150}
        data={props.data}
        margin={{ left: -20, right: 5, top: 5, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          style={{ fontSize: 12 }}
          interval={"preserveEnd"}
        />
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          style={{ fontSize: 12 }}
        />
        <Tooltip
          separator={": "}
          labelStyle={{ fontSize: 12 }}
          contentStyle={{ fontSize: 12 }}
          itemStyle={{ color: "black" }}
          cursor={true}
        />
        <Area
          type="linear"
          dataKey="rate"
          stroke="000000"
          fill="#000000"
          fillOpacity="80%"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return <div>{SimpleAreaChart}</div>;
}
