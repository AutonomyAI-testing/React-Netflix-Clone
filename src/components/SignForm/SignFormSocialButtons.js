import React from "react";
import "./SignFormStyles.css";

function SignFormSocialButtons({ children, ...restProps }) {
  return (
    <div className="sign-form-social-buttons" {...restProps}>
      {children}
    </div>
  );
}

export default SignFormSocialButtons;
