import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function Input({ className, ...props }: Props): JSX.Element {
  return (
    <input
      className="item padding--sm w-full"
      style={{
        borderRadius: 6,
        borderStyle: "solid",
        fontSize: 16,
      }}
      {...props}
    />
  );
}

export default Input;
