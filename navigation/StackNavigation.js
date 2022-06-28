import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
  VerifyEmailScreen,
  WelcomeScreen,
} from "../screens";
import DrawerNavigation from "./DrawerNavigation";
import { colors } from "../utilities/colors";
import { useUser } from "../hooks/useContext";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.teal100,
  },
};
export const StackNavigaiton = () => {
  const { isLogin } = useUser();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={isLogin ? "Main" : "Welcome"}
        screenOptions={{ headerShown: false }}
      >
        {!isLogin ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={DrawerNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
