import { AuthPage } from "@refinedev/antd";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDocumentTitle } from "@refinedev/react-router-v6";

export const RegisterPage: React.FC = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("WorkPulse");
  }, []);
  return (
    <AuthPage
      type="register"
    />
  );
};