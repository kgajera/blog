import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

function Textarea({ className, ...props }: Props): JSX.Element {
  return (
    <textarea
      className="item padding--sm w-full"
      style={{
        borderRadius: 6,
        borderStyle: "solid",
        borderWidth: 2,
        fontSize: 16,
      }}
      {...props}
    />
  );
}

export default Textarea;
