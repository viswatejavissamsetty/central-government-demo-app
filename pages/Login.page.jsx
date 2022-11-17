import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BASE_URL } from "@env"

const initialValues = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  console.log(REACT_APP_BASE_URL);

  useEffect(() => {
    AsyncStorage.getItem("id").then((d) => {
      if (d) navigate("/welcome");
    });
  }, []);

  const onSubmit = (values) => {
    axios
      .post("https://login-demo.herokuapp.com/user/login", { ...values })
      .then((res) => res.data)
      .then((data) => {
        AsyncStorage.setItem("id", data);
        navigate("/welcome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            submitForm,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <Card style={styles.cardContainer}>
              <Card.Title title="Login Page" />
              <Card.Content>
                <View style={styles.stackBlock}>
                  <TextInput
                    label={"Email"}
                    mode="outlined"
                    placeholder="Enter email id"
                    style={styles.inputBlock}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                  <TextInput
                    label={"Password"}
                    mode="outlined"
                    placeholder="Enter password"
                    secureTextEntry={!showPassword}
                    style={styles.inputBlock}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    right={
                      <TextInput.Icon
                        icon={!showPassword ? "eye" : "eye-off"}
                        onPress={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      />
                    }
                  />
                  <Button
                    mode="contained"
                    style={styles.buttonBlock}
                    onPress={() => {
                      submitForm();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.buttonBlock}
                    onPress={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </View>
              </Card.Content>
            </Card>
          )}
        </Formik>
      </View>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    minWidth: "100%",
    minHeight: "100%",
    paddingHorizontal: 15,
  },
  cardContainer: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    shadowOpacity: 10,
    width: "100%",
    height: "auto",
    elevation: 30,
    borderRadius: 30,
    padding: 0,
  },
  stackBlock: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  inputBlock: {
    marginVertical: 5,
  },
  buttonBlock: {
    marginVertical: 5,
  },
});
