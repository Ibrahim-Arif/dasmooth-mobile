import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";

export default function BatonAccordian({
  title = "Baton",
  onPress = () => null,
  listItems = [],
  color = "grey",
  bgColor = "white",
}) {
  const [expanded, setExpanded] = React.useState(true);
  const [pressed, setPressed] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const dummy = ["First Item", "Second Item"];

  return (
    <View style={{ backgroundColor: bgColor }}>
      <List.Accordion
        title={title}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        style={{
          borderTopColor: color,
          borderTopWidth: 3,
          color: "black",
          marginTop: 10,
          backgroundColor: bgColor,
        }}
      >
        {dummy.map((e, index) => (
          <List.Item
            key={index}
            title={e}
            style={[
              styles.listItem,
              { borderLeftColor: color },
              !pressed && {
                borderBottomWidth: 4,
                borderBottomColor: colors.textColor,
              },
            ]}
            // onPressIn={() => setPressed(true)}
            // onPressOut={() => setPressed(false)}
            right={(props) => (
              <List.Icon
                {...props}
                icon={() => <AntDesign name="right" size={24} color="black" />}
              />
            )}
            onPress={onPress}
          />
        ))}
      </List.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderLeftWidth: 4,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
  },
});
