import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { List } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { v4 } from "uuid";

export default function BatonAccordian({
  title = "Baton",
  onPress = () => null,
  listItems = [],
  color = "grey",
  bgColor = "white",
  drag,
  navigation,
}) {
  // const [expanded, setExpanded] = React.useState(true);
  // const handlePress = () => setExpanded(!expanded);

  const [pressed, setPressed] = React.useState(false);
  const CustomListItem = ({ title, docId }) => {
    const [focused, setFocused] = React.useState(false);
    return (
      <View key={v4()}>
        <List.Item
          title={title}
          style={[
            {
              borderWidth: 1,
              borderTopColor: focused ? color : colors.white,
              borderRightColor: focused ? color : colors.white,
              borderBottomColor: focused ? color : colors.white,
              borderLeftColor: color,
            },
            styles.listItem,
          ]}
          // onPressIn={() => {
          //   setFocused(true);
          // }}
          // onPressOut={() => {
          //   navigation.navigate("BatonForm", { batonId: docId });
          //   setFocused(false);
          // }}
          right={(props) => (
            <List.Icon
              {...props}
              icon={() => <AntDesign name="right" size={24} color="black" />}
            />
          )}
          // onPressIn={() => setPressed(true)}
          // onPressOut={() => setPressed(false)}
          onPress={() => {
            setFocused(true);
            navigation.navigate("BatonForm", { batonId: docId });
            setFocused(false);
          }}
        />
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: bgColor }}>
      <List.Accordion
        onLongPress={drag}
        title={`${title} (${listItems.length})`}
        right={() => (
          <FontAwesome name="bars" size={20} color="black" onLongPress={drag} />
        )}
        left={(props) => (
          <AntDesign
            name="caretright"
            size={20}
            color="black"
            style={pressed && { transform: [{ rotate: "90deg" }] }}
          />
        )}
        titleStyle={styles.titleStyle}
        style={[
          styles.accordion,
          {
            borderTopColor: color,

            backgroundColor: bgColor,
          },
        ]}
        onPress={() => setPressed(!pressed)}
      >
        {listItems.map((e, index) => (
          <CustomListItem title={e.title} docId={e.docId} />
        ))}
      </List.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderLeftWidth: 4,
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  accordion: { borderTopWidth: 3, color: "black", marginTop: 10 },
  titleStyle: { color: "black", fontWeight: "bold" },
});
