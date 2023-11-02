import React, { useState } from "react";
import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceScreen10 = ({ navigation }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

   const rollNumbers = [
"41",
"42",
"43",
"45",
"46",
"47",
"49",
"4A",
"4B",
"4C",
"4D",
"4E",
"4F",
"4G",
"4H",
"4J",
"4K",
"4L",
"4M",
"4N",
"4P",
"4Q",
"4R",
"4T",
"4U",
"4W",
"4X",
"4Y",
"4Z",
"51",
"52",
"54",
"55",
"56",
"57",
"58",
"59",
"5B",
"5C",
"5D",
"5E",
"5G",
"5H",
"5J",
"5K",
"5M",
"5N",
"5P",
"5Q",
"5R",
"5T",
"5U",
"5V",
"5W",
"5X",
"5Y",
"K5",
"LE-13",
"LE-15",
"LE-16",
"LE-17",
"LE-18"


  ];

  const teachers = [
    
    {
      
      name: "YAKAIAH SIR",
      phoneNumber: "+919948192143"
    },
    {
      name: "ARTI MA'AM",
      phoneNumber: "+919466797955"
    },
    {
      name: "JANARDHAN SIR",
      phoneNumber: "+918686665135"
    },
     {
      name: "KIRANMAI MA'AM",
      phoneNumber: "+919703349695"
    },
    {
      name: "KEERTHANA",
      phoneNumber: "+919849743603"
    },
    
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

    navigation.navigate("AttendanceScreen10");
  };

  const updateAttendance = () => {
    const presentees = attendanceList.join(", ");
    const absenteesString = absentees.join(", ");

    const message = `Presentees: ${presentees}\nAbsentees: ${absenteesString}`;
    const whatsappURL = `whatsapp://send?phone=+919849743603&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL);
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

      {isSubmitted && (
        <TouchableOpacity onPress={updateAttendance}>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>Update Attendance</Text>
          </View>
        </TouchableOpacity>
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

export default AttendanceScreen10;
