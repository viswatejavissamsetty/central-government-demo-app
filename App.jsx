import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-native-paper";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "./routes/App.router";

export default function App() {
  return (
    <MemoryRouter>
      <>
        <StatusBar />
        <Provider>
          <View style={{ marginTop: 30 }}>
            <AppRouter />
          </View>
        </Provider>
      </>
    </MemoryRouter>
  );
}
