import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  DataTable,
  Dialog,
  Portal,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [profile, setProfile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState({ fullName: "", dob: "" });
  const [id, setId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then((d) => setId(d));
  }, []);

  useEffect(() => {
    if (id) {
      getProfile(id);
    }
  }, [id]);

  const getProfile = (id) => {
    axios
      .get("https://login-demo.herokuapp.com/user/" + id)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setProfile({ ...data });
        setUpdateProfile({ fullName: data.fullName, dob: data.dob });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Appbar.Header style={{ marginTop: 0 }}>
        <Appbar.Content title="Welcome Page" />
        <Appbar.Action
          icon={"logout"}
          onPress={() => {
            AsyncStorage.clear();
            navigate("..");
          }}
        />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <Card elevation={50}>
          <Card.Title title="Profile details" />
          <Card.Content>
            <View>
              {profile ? (
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Cell>{profile.fullName}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Title>DOB</DataTable.Title>
                    <DataTable.Cell>{profile.dob}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Title>Email Id</DataTable.Title>
                    <DataTable.Cell>{profile.email}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Title>Contact Number</DataTable.Title>
                    <DataTable.Cell>{profile.mobileNumber}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              ) : (
                <Title>Invalid User</Title>
              )}
            </View>

            <Button
              mode="contained"
              color={"red"}
              style={{ marginTop: 30 }}
              icon="update"
              onPress={showDialog}
            >
              Update Profile
            </Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Update Profile</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    mode="outlined"
                    placeholder="Enter Name"
                    label={"Name"}
                    style={{ marginVertical: 10 }}
                    value={updateProfile.fullName}
                    onChangeText={(e) =>
                      setUpdateProfile({
                        ...updateProfile,
                        fullName: e,
                      })
                    }
                  />
                  <TextInput
                    mode="outlined"
                    placeholder="DD/MM/YYYY"
                    label={"Date of Birth"}
                    style={{ marginVertical: 10 }}
                    value={updateProfile.dob}
                    onChangeText={(e) =>
                      setUpdateProfile({
                        ...updateProfile,
                        dob: e,
                      })
                    }
                  />
                  <Button
                    mode="contained"
                    style={{ marginVertical: 10 }}
                    onPress={() => {
                      axios
                        .patch(
                          "https://login-demo.herokuapp.com/user/update-profile/" +
                            id,
                          { ...updateProfile }
                        )
                        .then((res) => res.data)
                        .then((data) => {
                          console.log(data);
                          Alert.alert(
                            "Success",
                            "Profile updated successfully",
                            [
                              {
                                text: "Ok",
                                onPress: () => {
                                  getProfile(id);
                                  hideDialog();
                                },
                              },
                            ]
                          );
                        })
                        .catch((error) => {
                          console.error(error);
                          Alert.alert(
                            "Failed",
                            "Unable to update your profile",
                            [
                              {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                              },
                            ]
                          );
                        });
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    mode="outlined"
                    color="red"
                    style={{ marginVertical: 10 }}
                    onPress={hideDialog}
                  >
                    Cancel
                  </Button>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

export default WelcomePage;
