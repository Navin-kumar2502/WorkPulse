import { AuthPage} from "@refinedev/antd";
import React, { useEffect } from "react";
import { useDocumentTitle } from "@refinedev/react-router-v6";

export const ForgotPasswordPage: React.FC = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("WorkPulse");
  }, []);
  return <AuthPage type="forgotPassword"/>;
};