import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker/CalendarPicker";
import moment from "moment";

import { colors } from "../../utilities/colors";
import TealButton from "../TealButton/TealButton";
import Selectable from "../Selectable/Selectable";
import ColoredText from "../ColoredText/ColoredText";

export default function DateTimeComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
}) {
  const [date, setDate] = useState(
    moment().format("dddd, MMMM Do, YYYY").toString()
  );
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  return (
    <View style={styles.componentContainer}>
      <Selectable
        bgColor={colors.teal100}
        isActive={true}
        style={styles.dateSelectableContainer}
        contentStyle={{ height: 40 }}
        icon={null}
      >
        {date}
      </Selectable>
      <View style={styles.dateTimeComponentContainer}>
        <CalendarPicker
          onDateChange={(value) => {
            setDate(moment(value).format("dddd, MMMM Do, YYYY").toString());
          }}
          selectedDayColor={colors.teal100}
          width={300}
        />

        <ColoredText
          color={colors.teal100}
          style={{ alignSelf: "center", marginTop: 25 }}
        >
          Set Time
        </ColoredText>
        {Platform.OS === "ios" ? (
          <>
            <DateTimePicker
              mode="time"
              style={{
                alignSelf: "center",
                width: 80,
                marginTop: 5,
              }}
              value={time}
              onChange={(event, newTime) => {
                setTime(newTime);
              }}
            />
          </>
        ) : (
          <Selectable
            bgColor={colors.teal100}
            isActive={true}
            style={styles.selectable}
            contentStyle={{ height: 40 }}
            icon={null}
            onPress={() => setTimePickerVisibility(true)}
          >
            {moment(time).format("hh:mm A").toString()}
          </Selectable>
        )}
        {isTimePickerVisible && (
          <>
            <DateTimePicker
              mode="time"
              style={{ flex: 1 }}
              value={time}
              onChange={(event, newTime) => {
                setTimePickerVisibility(false);
                setTime(newTime);
              }}
            />
          </>
        )}
      </View>

      <View style={{ marginTop: 25 }}>
        <TealButton
          text="Set Deadline"
          onPress={() => {
            if (time != "Set Time") {
              setSelectedItem(
                `${date} at ${moment(time).format("hh:mm A").toString()}`
              );
              closeScreen();
            } else {
              alert("Set Time");
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: { alignItems: "center", padding: 20 },
  selectable: {
    alignItems: "center",
    height: 40,
    marginTop: 25,
    width: 250,
    alignSelf: "center",
  },
  dateSelectableContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  dateTimeComponentContainer: {
    // justifyContent: "center",
  },
});
