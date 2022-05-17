import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen, BatonFormScreen } from "../screens";
import { colors } from "../utilities/colors";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.teal100,
  },
};
export const DashboardNavigaiton = () => {
  return (
    <Stack.Navigator
      initialRouteName="DashboardMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="BatonForm" component={BatonFormScreen} />
    </Stack.Navigator>
  );
};
