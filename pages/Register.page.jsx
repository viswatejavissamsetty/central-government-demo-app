import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Card, HelperText, TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialValues = {
  fullName: "",
  email: "",
  mobileNumber: "",
  dob: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Your full name is required")
      .min(3, "Your name must be minimum of 3 characters")
      .max(32, "You name must not contain morethan 32 characters"),
    email: yup
      .string()
      .required("Email id is required")
      .email("Invalid email format"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      .matches(/[0-9]{10}/, "invalid mobile number"),
    dob: yup
      .string()
      .required("Your date of birth is required")
      .matches(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/, "Invalid date of birth format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password length must be 8 caracters long"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("password"), null],
        "Both password and confirm password need to match"
      ),
  });

  const onSubmit = (values) => {
    // console.log(values);
    axios
      .post("http://192.168.55.104:8000/user", { ...values })
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        AsyncStorage.setItem("id", data._id);
        navigate("/welcome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            submitForm,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <ScrollView style={styles.cardContainer}>
              <Card style={{ borderRadius: 30 }}>
                <Card.Title title="Register Page" />
                <Card.Content style={{ borderRadius: 30 }}>
                  <View style={styles.stackBlock}>
                    <FormTextField
                      error={errors.fullName}
                      touched={touched.fullName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="fullName"
                      keyboardType="default"
                      value={values.fullName}
                      label="Full Name"
                      placeholder="Enter your fullName id"
                    />
                    <FormTextField
                      error={errors.email}
                      touched={touched.email}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="email"
                      keyboardType="email-address"
                      value={values.email}
                      label="Email"
                      placeholder="Enter your email id"
                    />
                    <FormTextField
                      error={errors.mobileNumber}
                      touched={touched.mobileNumber}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="mobileNumber"
                      keyboardType="number-pad"
                      value={values.mobileNumber}
                      label="Mobile Number"
                      placeholder="Enter your mobile number"
                    />
                    <FormPasswordField
                      error={errors.password}
                      touched={touched.password}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="password"
                      keyboardType="default"
                      value={values.password}
                      label="Password"
                      placeholder="Enter your password"
                    />
                    <FormPasswordField
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="confirmPassword"
                      keyboardType="default"
                      value={values.confirmPassword}
                      label="Confirm Password"
                      placeholder="Confirm your password"
                    />
                    <FormTextField
                      error={errors.dob}
                      touched={touched.dob}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="dob"
                      keyboardType="default"
                      value={values.dob}
                      label="Date of Birth"
                      placeholder="DD/MM/YYYY"
                    />
                    <Button
                      mode="contained"
                      style={styles.buttonBlock}
                      onPress={() => {
                        submitForm();
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.buttonBlock}
                      onPress={() => {
                        navigate("/login");
                      }}
                    >
                      had account login
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            </ScrollView>
          )}
        </Formik>
      </View>
    </View>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    minWidth: "100%",
    minHeight: "100%",
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  cardContainer: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    shadowOpacity: 10,
    width: "100%",
    height: "100%",
    elevation: 30,
    borderRadius: 30,
    padding: 10,
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

const FormTextField = ({
  label,
  placeholder,
  keyboardType,
  touched,
  error,
  value,
  handleBlur,
  handleChange,
  name,
}) => {
  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        placeholder={placeholder}
        style={styles.inputBlock}
        keyboardType={keyboardType}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        error={Boolean(touched && error)}
      />
      {Boolean(touched && error) && (
        <HelperText type="error" visible={Boolean(touched && error)}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const FormPasswordField = ({
  label,
  placeholder,
  keyboardType,
  touched,
  error,
  value,
  handleBlur,
  handleChange,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        placeholder={placeholder}
        style={styles.inputBlock}
        keyboardType={keyboardType}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        error={Boolean(touched && error)}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={!showPassword ? "eye" : "eye-off"}
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        }
      />
      {Boolean(touched && error) && (
        <HelperText type="error" visible={Boolean(touched && error)}>
          {error}
        </HelperText>
      )}
    </View>
  );
};
