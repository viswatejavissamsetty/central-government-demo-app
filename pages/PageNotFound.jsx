import React from "react";
import { View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <View
      style={{
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#e755559b",
          width: "100%",
          margin: 90,
          borderRadius: 50,
          padding: 25,
        }}
      >
        <Title style={{ textAlign: "center" }}>Page Not Found</Title>
        <View style={{ marginHorizontal: 50, marginVertical: 20 }}>
          <Button
            mode="contained"
            onPress={() => {
              navigate("..");
            }}
          >
            Go to Previous Page
          </Button>
        </View>
      </View>
    </View>
  );
}

export default PageNotFound;
