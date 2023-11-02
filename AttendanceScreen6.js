import React, { useState } from "react";
import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceScreen6 = ({ navigation }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rollNumbers = [
    "61", "63", "64", "67", "68", "69", "6B", "6C", "6D", "6E",  "6G", "6H", "6J", "6K", "6L", "6M", "6P", "6Q",  "6U", "6V", "6X", "6Y", "6Z", "73", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7E", "7F", "7G", "7H", "7J", "7K", "7L", "7M", "7N", "7P", "7Q", "7R", "7T", "7U", "7V", "7W", "7X", "7Y", "K6","LE-19","LE-20","LE-21","LE-22","LE-23","LE-24","LE-25"
  ];

  const teachers = [
    {
      name: "MAHESH SIR",
      phoneNumber: "+919581774878"
    },
    {
      name: "PRIYANKA MA'AM",
      phoneNumber: "+919840273377"
    },
    {
      name: "ARSHIYA MA'AM",
      phoneNumber: "+919640780914"
    },
    {
      name: "KOMALA MA'AM",
      phoneNumber: "+919652954634"
    },
    {
      name: "NARASIMHULU SIR",
      phoneNumber: "+919948574074"
    },
    {
      name: "YUKTA REDDY",
      phoneNumber: "+917995201812"
    },
    {
      name: "N SAI ARYAN",
      phoneNumber: "+917075754849"
    }
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

    navigation.navigate("AttendanceScreen6");
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

      {/* Additional color buttons */}
      <View style={styles.colorButtonContainer}>
        <TouchableOpacity onPress={() => markAttendance("03")} style={styles.colorButton}>
          <View style={styles.redColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => markAttendance("04")} style={styles.colorButton}>
          <View style={styles.greenColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => markAttendance("05")} style={styles.colorButton}>
          <View style={styles.blueColor} />
        </TouchableOpacity>
      </View>
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
  },
  colorButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginTop: 10
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  
  
});

export default AttendanceScreen6;

// I added a new section in the code to create three color buttons (red, green, and blue) with corresponding styles. The buttons are positioned in a row at the top of the screen. When you tap on a color button, it will mark the attendance for the corresponding roll number with the respective color. The red color button marks the roll number as absent, the green color button marks it as present, and the blue color button is just for demonstration purposes. Feel free to modify the colors and add more functionality as needed.
