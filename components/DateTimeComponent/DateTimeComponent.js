import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { colors } from "../../utilities/colors";
import CalendarPicker from "react-native-calendar-picker/CalendarPicker";
import TealButton from "../TealButton/TealButton";
import Selectable from "../Selectable/Selectable";

export default function DateTimeComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
}) {
  const [date, setDate] = useState(
    moment().format("dddd, MMMM Do, YYYY").toString()
  );
  const [time, setTime] = useState("Set Time");
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Selectable
        bgColor={colors.teal100}
        isActive={true}
        style={{ alignItems: "center", height: 40 }}
        contentStyle={{ height: 40 }}
        icon={null}
      >
        {date}
      </Selectable>
      <View>
        <CalendarPicker
          onDateChange={(value) => {
            setDate(moment(value).format("dddd, MMMM Do, YYYY").toString());
          }}
          selectedDayColor={colors.teal100}
          width={300}
        />

        <Selectable
          bgColor={colors.teal100}
          isActive={true}
          style={styles.selectable}
          contentStyle={{ height: 40 }}
          icon={null}
          onPress={() => setTimePickerVisibility(true)}
        >
          {time}
        </Selectable>
        <>
          {Platform.OS === "ios" ? (
            <DateTimePicker
              mode="time"
              style={{ flex: 1 }}
              value={new Date()}
              onChange={(event, newTime) => {
                setTime(moment(newTime).format("hh:mm A"));
              }}
            />
          ) : (
            isTimePickerVisible && (
              <>
                <DateTimePicker
                  mode="time"
                  style={{ flex: 1 }}
                  value={new Date()}
                  onChange={(event, newTime) => {
                    setTime(moment(newTime).format("hh:mm A"));
                    setTimePickerVisibility(false);
                  }}
                  t
                />
              </>
            )
          )}
        </>
      </View>
      <View style={{ marginTop: 25 }}>
        <TealButton
          text="Set Deadline"
          onPress={() => {
            setSelectedItem(`${date} at ${time}`);
            closeScreen();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectable: {
    alignItems: "center",
    height: 40,
    marginTop: 25,
    width: 250,
    alignSelf: "center",
  },
});
