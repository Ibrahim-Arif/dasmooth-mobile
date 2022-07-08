import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DeleteBatonScreen, BatonFormScreen } from "../screens";
import { colors } from "../utilities/colors";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.teal100,
  },
};
export const DeletedBatonsNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="DeletedBatonsMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeletedBatonsMain" component={DeleteBatonScreen} />
      <Stack.Screen name="BatonForm" component={BatonFormScreen} />
    </Stack.Navigator>
  );
};
