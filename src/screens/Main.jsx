import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { navigationArray } from "../navigation";
import { StatusBar } from "expo-status-bar";
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          {navigationArray.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
