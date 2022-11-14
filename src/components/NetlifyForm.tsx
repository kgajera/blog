import React from "react";

interface NetlifyFormProps
  extends React.PropsWithChildren,
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    > {
  name: string;
}

function NetlifyForm({ children, name, ...props }: NetlifyFormProps) {
  return (
    <form data-netlify="true" method="POST" name={name} {...props}>
      {children}
    </form>
  );
}

export default NetlifyForm;
