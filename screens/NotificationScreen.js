import moment from "moment";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { AppBarView } from "../components";
import Alert from "../components/Alert/Alert";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";

export default function NotificationScreen({ navigation, route }) {
  // const { notifications } = useUser();
  // console.log(notifications);
  const notifications = [
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Received",
      seen: false,
      type: "received",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Complete",
      seen: false,
      type: "complete",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "accepted",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "declined",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Received",
      seen: false,
      type: "received",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Complete",
      seen: false,
      type: "complete",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "accepted",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
  ];
  // console.log(notifications);

  const sectionSortedNotifications = useMemo(() => {
    if (notifications.length == 0) return [];

    let groupObj = {};
    let arrayForm = [];

    for (const item of notifications) {
      const date = item.date;
      if (groupObj[date]) {
        groupObj[date].push(item);
      } else {
        groupObj[date] = [item];
      }
    }

    for (const key in groupObj) {
      arrayForm.push({
        date: key,
        notifications: groupObj[key],
      });
    }

    // console.log(groupObj);
    // console.log(arrayForm);

    return arrayForm;
  }, [notifications]);

  return (
    <AppBarView navigation={navigation} route={route}>
      <View
        style={{ flex: 1, margin: 25, flexGrow: 1 }}
        // showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 24, color: colors.textColor }}>
          Notifications
        </Text>
        <ScrollView
          style={{ marginTop: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {sectionSortedNotifications.map((item, index) => (
            <View key={index} style={index > 0 ? { marginTop: 32 } : {}}>
              <Text>
                {moment(new Date(parseInt(item.date))).format("MMM DD, YYYY")}
              </Text>

              {item.notifications?.map((notification, index) => (
                <Alert
                  key={index}
                  batonTitle={notification.message}
                  batonName={notification.message}
                  batonDescription={notification.description}
                  batonType={notification.type}
                  style={{ marginTop: 8 }}
                  onClose={() => {
                    handleUpdateNotificationStatus(notification.docId, true);
                  }}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </AppBarView>
  );
}
