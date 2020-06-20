import React, { useState, useContext, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";

import { authServiceCtx } from "../contexts";
import PageLayout from "../../components/PageLayout";
import ErrorMessage from "../../components/ErrorMessage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const authService = useContext(authServiceCtx);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!authService) {
        return null;
      }
      setError("");
      setIsSubmitting(true);
      try {
        const result = await authService.doSignInWithEmailAndPassword(
          email,
          password
        );
        console.log("signin result", result);
        setIsSubmitting(false);
        setSuccess(true);
      } catch (error) {
        if (error.code) {
          setError(error.message);
        }
        setIsSubmitting(false);
      }
    },
    [authService, setIsSubmitting, email, password, setError]
  );

  return (
    <PageLayout>
      {success && <Redirect to="/" />}
      <form onSubmit={onSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
        <div style={{ marginTop: 20 }}>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <div>
        <p>
          Don't have an account? <Link to={"/signup"}>Sing Up</Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignIn;
