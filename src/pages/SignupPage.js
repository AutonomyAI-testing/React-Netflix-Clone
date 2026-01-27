import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/FirbaseContext";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import SignFormSocialButtons from "../components/SignForm/SignFormSocialButtons";
import SignFormSocialButton from "../components/SignForm/SignFormSocialButton";
import SignFormDivider from "../components/SignForm/SignFormDivider";
import Warning from "../components/Header/Warning";

function SignupPage() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const IsInvalid = password === "" || emailAddress === "" || firstName === "";

  function handleSubmit(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: firstName,
          })
          .then(() => {
            setFirstName("");
            setEmailAddress("");
            setPassword("");
            history.push("/browse");
          })
      )
      .catch((error) => setError(error.message));
  }

  function handleSocialSignUp(provider) {
    let authProvider;
    if (provider === "Google") {
      authProvider = new firebase.auth.GoogleAuthProvider();
    } else if (provider === "Facebook") {
      authProvider = new firebase.auth.FacebookAuthProvider();
    }

    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(() => {
        history.push("/browse");
      })
      .catch((error) => setError(error.message));
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <NavBar className="navbar-signin">
          <Logo />
        </NavBar>
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSubmit} method="POST">
            <Warning>NOT official Netflix</Warning>
            <SignFormTitle>Sign Up</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>

            <SignFormDivider>OR</SignFormDivider>

            <SignFormSocialButtons>
              <SignFormSocialButton
                provider="Google"
                icon="🌐"
                onClick={() => handleSocialSignUp("Google")}
              />
              <SignFormSocialButton
                provider="Facebook"
                icon="📘"
                onClick={() => handleSocialSignUp("Facebook")}
              />
            </SignFormSocialButtons>

            <SignFormText>
              Already a user?
              <SignFormLink href="/signin">Sign in now.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SignupPage;
