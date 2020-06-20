import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { authServiceCtx } from "../contexts";
import PageLayout from "../../components/PageLayout";
import ErrorMessage from "../../components/ErrorMessage";

const SignOut = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const authService = useContext(authServiceCtx);

  useEffect(() => {
    const s = async () => {
      if (!authService) {
        return null;
      }
      setError("");
      setIsSubmitting(true);
      try {
        await authService.doSignOut();
        setIsSubmitting(false);
        setSuccess(true);
      } catch (error) {
        if (error.code) {
          setError(error.message);
        }
        setIsSubmitting(false);
      }
    };
    s();
  }, [authService, setIsSubmitting, setError]);

  if (success) {
    return <Redirect to="/" />;
  }
  if (isSubmitting) {
    return <PageLayout>Wait...</PageLayout>;
  }
  return (
    <PageLayout>
      <ErrorMessage>{error}</ErrorMessage>
    </PageLayout>
  );
};

export default SignOut;
