import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthPage } from "@refinedev/antd";
import { useLogin } from "@refinedev/core";

import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { demoCredentials } from "@/providers";
import { useDocumentTitle } from "@refinedev/react-router-v6";
export const LoginPage: React.FC = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("WorkPulse");
  }, []);
  const [searchParams] = useSearchParams();
  const { mutate } = useLogin();

  const emailFromSearchParams = searchParams.get("email");
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const initialValues = emailFromSearchParams
    ? { email: emailFromSearchParams }
    : demoCredentials;

  useEffect(() => {
    if (accessToken && refreshToken) {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues,
      }}
      contentProps={{
        className: "auth-page",
      }}
    />
  );
};