import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { ImageCard, ImageCardProps } from "./index";

interface ImageCardMasonryGridProps {
  cards: ImageCardProps[];
  className?: string;
  cols: number;
}

export function ImageCardMasonryGrid({
  cards = [],
  className,
  cols = 2,
}: ImageCardMasonryGridProps) {
  const [columns, setColumns] = useState<ImageCardProps[][]>([]);

  useEffect(() => {
    const cardsPerColumn = Math.floor(cards.length / cols);
    const grid: ImageCardProps[][] = [];

    for (let i = 0; i < cols; i++) {
      grid.push(
        [...cards].splice(
          i * cardsPerColumn,
          i === cols - 1 ? cards.length : cardsPerColumn
        )
      );
    }

    setColumns(grid);
  }, []);

  return (
    <div className={clsx("row", className)}>
      {columns.map((imageCards, i) => (
        <div className="col" key={i}>
          {imageCards.map((imageCardProps, j) => (
            <div className="margin-vert--md" key={j}>
              <ImageCard {...imageCardProps} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
