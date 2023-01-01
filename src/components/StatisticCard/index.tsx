import React from "react";

export interface StatisticCardProps {
  number: number;
  title: string;
}

export function StatisticCard({ number, title }: StatisticCardProps) {
  return (
    <div className="card">
      <div className="card__body">
        <div style={{ fontSize: 27, fontWeight: 700 }}>{number}</div>
        {title}
      </div>
    </div>
  );
}
