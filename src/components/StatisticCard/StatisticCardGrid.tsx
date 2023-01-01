import React from "react";
import { StatisticCard, StatisticCardProps } from "./index";

interface StatisticCardGridProps {
  cards: StatisticCardProps[];
}

export function StatisticCardGrid({ cards }: StatisticCardGridProps) {
  return (
    <div className="row">
      {cards.map((cardProps, index) => (
        <div key={index} className="col col--3 margin-vert--md">
          <StatisticCard {...cardProps} />
        </div>
      ))}
    </div>
  );
}
