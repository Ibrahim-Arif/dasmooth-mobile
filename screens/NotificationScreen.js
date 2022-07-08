import React from "react";
import { ScrollView, Text, View } from "react-native";
import { AppBarView } from "../components";
import Alert from "../components/Alert/Alert";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";

export default function NotificationScreen({ navigation, route }) {
  const { notifications } = useUser();
  // console.log(notifications);
  return (
    <AppBarView navigation={navigation} route={route}>
      <View
        style={{ flex: 1, margin: 25, flexGrow: 1 }}
        // showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 24, color: colors.textColor }}>
          Notifications
        </Text>
        <ScrollView style={{ marginTop: 15 }}>
          {notifications.map((item, index) => (
            <Alert
              key={index}
              message={item.message}
              description={item.description}
              type={item.type}
              style={{ marginBottom: 15 }}
              id={item.docId}
            />
          ))}
        </ScrollView>
      </View>
    </AppBarView>
  );
}
