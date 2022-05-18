import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Selectable from "../Selectable/Selectable";
import moment from "moment";
import { colors } from "../../utilities/colors";
import CalendarPicker from "react-native-calendar-picker/CalendarPicker";
import TealButton from "../TealButton/TealButton";
import { color } from "react-native-reanimated";
export default function DateTimeComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
}) {
  const [date, setDate] = useState(
    moment().format("dddd, MMMM Do, YYYY").toString()
  );
  const [time, setTime] = useState("Set Time");
  const [show, setShow] = useState(false);
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
          style={{
            alignItems: "center",
            height: 40,
            marginTop: 25,
            width: 250,
            alignSelf: "center",
          }}
          contentStyle={{ height: 40 }}
          icon={null}
          onPress={() => setShow(true)}
        >
          {time}
        </Selectable>
        <DateTimePickerModal
          isVisible={show}
          mode="time"
          onConfirm={(e) => {
            setTime(moment(e).format("h:mm a"));
            setShow(false);
          }}
          onCancel={() => setShow(false)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <TealButton
          text="Set Deadline"
          onPress={() => {
            setSelectedItem(`${date} at ${time}`);
            closeScreen();
          }}
          style={{ width: Dimensions.get("screen").width * 0.9 }}
        />
      </View>
    </View>
  );
}
