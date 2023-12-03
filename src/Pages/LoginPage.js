import React, { useContext, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { login } from "../lib/api";
import LoginForm from "../Components/Forms/LoginForm";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import Banner from "../Components/Banner";
import { useTranslation } from "react-i18next";

const LoginPage = (props) => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      if (isLoginSuccess) {
        setIsLoginSuccess(false);
        navigate("/");
      }
    }, 1000);
  }, [isLoginSuccess]);

  const onSubmit = (loginRequest, formikHelpers) => {
    setTimeout(() => {
      login(loginRequest)
        .then((loginResponse) => {
          setIsLoginSuccess(true);
          setLoginMessage(`${t("signedInAs")} ${loginResponse.userName}`);
          setTimeout(() => {
            authCtx.login(loginResponse);
          }, 1000);
        })
        .catch((error) => {
          if (error.message.includes("password")) {
            formikHelpers.setFieldError(
              "invalidPassword",
              t("validation:invalidPassword")
            );
          } else {
            formikHelpers.setFieldError(
              "invalidUsername",
              t("validation:invalidUsername")
            );
          }
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    }, 1000);
  };

  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column align-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        <LoginForm isSubmitted={isLoginSuccess} onSubmit={onSubmit} />
        {isLoginSuccess && (
          <Banner
            className="text-success border-success mt-4"
            message={loginMessage}
          />
        )}
      </Row>
    </Container>
  );
};

export default LoginPage;
