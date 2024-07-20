import React, { useEffect } from "react";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { AuthPage } from "@refinedev/antd";

export const UpdatePasswordPage: React.FC = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("WorkPulse");
  }, []);
  return <AuthPage type="updatePassword"/>;
};