import { eStatistic } from "enums/eStatistic";
import "./StatisticList.css";
import { StatisticHolder } from "./StatisticHolder";

interface StatisticListProps {
  id: string;
}

export const StatisticList = ({ id }: StatisticListProps) => {
  return (
    <div
      className="statistic-list-holder"
      id={id}
    >
      {Object.values(eStatistic).map((stat, i) => (
        <StatisticHolder
          statistic={stat}
          id={`${id}-${stat}`}
          key={i}
        />
      ))}
    </div>
  );
};
