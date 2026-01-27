import React from "react";
import "./SignFormStyles.css";

function SignFormSocialButton({
  provider, icon, onClick, ...restProps
}) {
  return (
    <button
      className="sign-form-social-button"
      type="button"
      onClick={onClick}
      {...restProps}
    >
      {icon && <span className="sign-form-social-icon">{icon}</span>}
      <span className="sign-form-social-text">
        Continue with
        {' '}
        {provider}
      </span>
    </button>
  );
}

export default SignFormSocialButton;
