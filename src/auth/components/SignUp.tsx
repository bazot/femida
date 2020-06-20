import React, { useState, useContext, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";

import { authServiceCtx } from "../contexts";
import PageLayout from "../../components/PageLayout";
import ErrorMessage from "../../components/ErrorMessage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authService = useContext(authServiceCtx);
  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!authService) {
        return null;
      }
      if (confirmPassword !== password) {
        setError("Passwords must match");
        return;
      }
      setError("");
      setIsSubmitting(true);
      try {
        const result = await authService.doCreateUserWithEmailAndPassword(
          email,
          password
        );
        console.log("signup result", result);
        setIsSubmitting(false);
        setSuccess(true);
      } catch (error) {
        if (error.code) {
          setError(error.message);
        }
        setIsSubmitting(false);
      }
    },
    [
      authService,
      setIsSubmitting,
      email,
      password,
      confirmPassword,
      setError,
      setSuccess
    ]
  );

  return (
    <PageLayout>
      {success && <Redirect to="/signin" />}
      <form onSubmit={onSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div>
          <div style={{ marginTop: 10 }}>
            <label>
              <div>Email: </div>
              <input
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div style={{ marginTop: 10 }}>
            <label>
              <div>Password: </div>
              <input
                disabled={isSubmitting}
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div style={{ marginTop: 10 }}>
            <label>
              <div>Confirm password: </div>
              <input
                disabled={isSubmitting}
                name="password-confirm"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <div style={{ marginTop: 20 }}>
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
      <div>
        <p>
          Have an account? <Link to={"/signin"}>Sing In</Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignUp;
