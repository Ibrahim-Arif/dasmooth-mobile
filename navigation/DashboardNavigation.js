import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DashboardScreen,
  BatonFormScreen,
  MemeberFormScreen,
  DateTimeFormScreen,
  BudgetFormScreen,
  FileFormScreen,
  PostUpdateFormScreen,
} from "../screens";
import { colors } from "../utilities/colors";

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
      <Stack.Screen name="MemberSelection" component={MemeberFormScreen} />
      <Stack.Screen name="DateSelection" component={DateTimeFormScreen} />
      <Stack.Screen name="BudgetSelection" component={BudgetFormScreen} />
      <Stack.Screen name="FileSelection" component={FileFormScreen} />
      <Stack.Screen
        name="PostUpdateSelection"
        component={PostUpdateFormScreen}
      />
    </Stack.Navigator>
  );
};
