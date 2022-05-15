import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
export default function BatonAccordian({
  title = "Baton",
  onPress = () => null,
  listItems = [],
  color = "grey",
  bgColor = "white",
}) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={{ backgroundColor: bgColor }}>
      <List.Accordion
        title={title}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        style={{
          borderTopColor: color,
          borderTopWidth: 4,
          color: "black",
          backgroundColor: bgColor,
          marginTop: 10,
        }}
      >
        <List.Item
          title="First item"
          style={{
            borderLeftWidth: 4,
            borderLeftColor: color,
            backgroundColor: "white",
            //   borderRadius: 10,
          }}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          onPress={onPress}
        />
      </List.Accordion>
    </View>
  );
}
