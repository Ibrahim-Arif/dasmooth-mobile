import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen, SignUpScreen, WelcomeScreen } from "../screens";
import DrawerNavigation from "./DrawerNavigation";
import { colors } from "../utilities/colors";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.teal100,
  },
};
export const StackNavigaiton = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
