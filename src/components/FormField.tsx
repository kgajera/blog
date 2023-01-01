import clsx from "clsx";
import React from "react";

interface FormFieldProps {
  containerClass?: string;
  label?: string;
}

interface InputProps
  extends FormFieldProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
  fieldType?: "input";
}

interface TextareaProps
  extends FormFieldProps,
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {
  fieldType: "textarea";
}

export function FormField({
  containerClass = "margin-vert--lg",
  fieldType = "input",
  label,
  ...props
}: InputProps | TextareaProps) {
  const id = props.id ?? `form_field_${props.name}`;

  return (
    <div className={clsx("form-field", containerClass)}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="margin-top--sm">
        {fieldType === "textarea" ? (
          <textarea id={id} {...(props as TextareaProps)} />
        ) : (
          <input id={id} type="text" {...(props as InputProps)} />
        )}
      </div>
    </div>
  );
}
