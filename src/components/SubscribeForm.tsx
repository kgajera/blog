import React, { FormEvent, useState } from "react";
import FormField from "./FormField";

function SubscribeForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const alertClass =
    isSuccess === true
      ? "alert--success"
      : isSuccess === false
      ? "alert--danger"
      : "";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSuccess(null);
    setMessage("");
    setIsProcessing(true);

    const action = e.currentTarget.getAttribute("action");
    const method = e.currentTarget.getAttribute("method") ?? "POST";

    const res = await fetch(action, {
      body: JSON.stringify({ email }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
    });

    setIsProcessing(false);
    setIsSuccess(res.ok);

    if (res.ok) {
      setEmail("");
      setMessage("You're subscribed!");
    } else {
      const data = await res.json();

      if (Array.isArray(data.errors) && data.errors.length) {
        setMessage(data.errors[0].message);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <>
      {message?.length > 0 && (
        <div className={`alert ${alertClass} margin-vert--sm`} role="alert">
          {message}
        </div>
      )}
      <form
        action="https://postform.com/s/5dcK1U"
        className="row"
        method="POST"
        onSubmit={submit}
        style={{ alignItems: "center" }}
      >
        <div className="col col--9">
          <FormField
            containerClass="margin-vert--sm"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
        </div>
        <div className="col col--3">
          <button
            className="button button--lg button--outline button--primary margin-horiz--auto margin-vert--sm"
            disabled={isProcessing}
            type="submit"
          >
            {isProcessing ? "Subscribing" : "Subscribe"}
          </button>
        </div>
      </form>
    </>
  );
}

export default SubscribeForm;
