import React, { ReactElement } from "react";

export interface ImageCardProps {
  body?: ReactElement | string;
  links?: {
    href: string;
    title: string;
  }[];
  image?: string;
  title: string;
}

export function ImageCard({ body, image, links, title }: ImageCardProps) {
  return (
    <div className="card">
      {image && (
        <div className="card__image">
          <img src={image} alt={title} title={title} />
        </div>
      )}
      <div className="card__body">
        <h4>{title}</h4>
        {body && <small>{body}</small>}
      </div>
      {links?.length ? (
        <div className="card__footer">
          {links.map((link, i) => (
            <a
              className="button button--outline button--primary margin-right--sm"
              href={link.href}
              key={i}
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
