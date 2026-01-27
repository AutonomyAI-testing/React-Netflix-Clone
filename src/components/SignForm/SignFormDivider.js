import React from "react";
import "./SignFormStyles.css";

function SignFormDivider({ children, ...restProps }) {
  return (
    <div className="sign-form-divider" {...restProps}>
      <span className="sign-form-divider-line" />
      <span className="sign-form-divider-text">{children || "OR"}</span>
      <span className="sign-form-divider-line" />
    </div>
  );
}

export default SignFormDivider;
