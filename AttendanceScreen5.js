import React, { useState } from "react";
import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceScreen5 = ({ navigation }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rollNumbers = [
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "25",
    "26",
    "27",
    "28",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "39",
    "40",
    "41",
    "42",
    "43",
    "45",
    "46",
    "47",
    "48",
    "50",
    "51",
    "52",
    "53",
    "54",
    "56",
    "57",
    "59",
    "61",
    "64",
    "65"
  ];

  const teachers = [
    {
      name: "NARENDER SIR",
      phoneNumber: "+919848581944"
    },
    {
       name: "ROHINI MA'AM",
      phoneNumber: "+916281420725"
    },
    {
      name: "NIKITHA MA'AM",
      phoneNumber: "+918897384511"
    },
    {
      name: "LAVANYA MA'AM",
      phoneNumber: "+919246394854"
    },
    {
      name: "SAVITHA MA'AM",
      phoneNumber: "+919848464901"
    },
    {
      name: "RAMA MA'AM",
      phoneNumber: "+919849241557"
    },
    {
      name: "RISHIKA",
      phoneNumber: "+917569564334"
    }

    // ... add more teachers here
  ];

  const markAttendance = (rollNumber) => {
    if (attendanceList.includes(rollNumber)) {
      setAttendanceList(attendanceList.filter((item) => item !== rollNumber));
    } else {
      setAttendanceList([...attendanceList, rollNumber]);
    }
  };

  const submitAttendance = () => {
    const absentStudents = rollNumbers.filter((rollNumber) => !attendanceList.includes(rollNumber));
    setAbsentees(absentStudents);
    setIsSubmitted(true);
  };

  const copyToClipboard = () => {
    const absenteesString = absentees.join(", ");
    Clipboard.setString(absenteesString);
    alert("Absentees copied to clipboard!");
  };

  const sendToWhatsApp = (name, phoneNumber) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = "Good morning";
    } else if (hours >= 12 && hours < 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    const teacherTitle = name.includes("SIR") ? "Sir" : "Ma'am";
    const message = `${greeting}, ${teacherTitle}!\n\nAbsentees are: ${absentees.join(", ")}`;
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL);
  };

  const handleLogout = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setAttendanceList([]);
      setAbsentees([]);
    }

    navigation.navigate("LoginScreen");
  };

  const Refresh = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setAttendanceList([]);
      setAbsentees([]);
    }

    navigation.navigate("AttendanceScreen5");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>{isSubmitted ? "Logout" : ""}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Refresh} style={styles.button}>
          <Text style={styles.buttonText}>{isSubmitted ? "Back" : ""}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Mark Attendance</Text>

      <ScrollView contentContainerStyle={styles.rollNumberContainer}>
        {rollNumbers.map((rollNumber) => (
          <TouchableOpacity
            key={rollNumber}
            onPress={() => markAttendance(rollNumber)}
            style={[
              styles.rollNumber,
              {
                backgroundColor: attendanceList.includes(rollNumber) ? "green" : "red"
              }
            ]}
          >
            <Text style={styles.rollNumberText}>{rollNumber}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={submitAttendance}>
        <View style={styles.submitButtonContainer}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>

      {isSubmitted && attendanceList.length > 0 && (
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceLabel}>Presentees:</Text>
          <Text style={styles.attendanceText}>{attendanceList.join(", ")}</Text>
        </View>
      )}

      {isSubmitted && absentees.length > 0 && (
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceLabel}>Absentees:</Text>
          <Text style={styles.attendanceText}>{absentees.join(", ")}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.linkText}>Copy to Clipboard</Text>
          </TouchableOpacity>

          {teachers.map((teacher, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => sendToWhatsApp(teacher.name, teacher.phoneNumber)}
              style={styles.teacherBox}
            >
              <Text style={styles.teacherText}>Send to {teacher.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#ECECEC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 30
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  rollNumberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },
  rollNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  rollNumberText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  submitButtonContainer: {
    backgroundColor: "darkblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  attendanceContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  attendanceLabel: {
    fontSize: 16,
    fontWeight: "bold"
  },
  attendanceText: {
    fontSize: 14,
    marginTop: 5
  },
  linkText: {
    color: "blue",
    marginTop: 10
  },
  teacherBox: {
    backgroundColor: "#BFE6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  teacherText: {
    color: "black",
    fontWeight: "bold"
  }
});

export default AttendanceScreen5;
