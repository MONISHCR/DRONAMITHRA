import React, { useState } from "react";
import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceScreen9 = ({ navigation }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

   const rollNumbers = [
"08",
"0A",
"0C",
"0E",
"0G",
"0H",
"0J",
"0M",
"0P",
"0Q",
"0U",
"13",
"19",
"1B",
"1F",
"1J",
"1K",
"1N",
"1P",
"1V",
"K1",
"LE-01",
"LE-02",
"LE-03",
"LE-04"
  ];

  const teachers = [
    
    {
      
      name: "VAMSHIDHAR SIR",
      phoneNumber: "+919963499960"
    },
    {
      name: "MADHURIKA MA'AM",
      phoneNumber: "+919949672774"
    },
    {
      name: "SREENIVASULU SIR",
      phoneNumber: "+919908990010"
    },
     {
      name: "VARSHA MA'AM",
      phoneNumber: "+919160229550"
    },
    {
      name: "RANJITH",
      phoneNumber: "+917569049698"
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

    navigation.navigate("AttendanceScreen9");
  };

  const updateAttendance = () => {
    const presentees = attendanceList.join(", ");
    const absenteesString = absentees.join(", ");

    const message = `Presentees: ${presentees}\nAbsentees: ${absenteesString}`;
    const whatsappURL = `whatsapp://send?phone=+919948382578&text=${encodeURIComponent(message)}`;
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

export default AttendanceScreen9;
