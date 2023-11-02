// import React, { useState } from "react";
// import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const AttendanceScreen = ({ navigation }) => {
//   const [attendanceList, setAttendanceList] = useState([]);
//   const [absentees, setAbsentees] = useState([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const rollNumbers = [
//     "02", "03", "04", "05", "06", "07", "08", "0A", "0B", "0D", "0E", "0F", "0G", "0H", "0J", "0K", "0L", "0M", "0N", "0P", "0R", "0T", "0U", "0V", "0Y", "0Z", "11", "12", "13", "14", "16", "17", "18","1A", "1B", "1C", "1F", "1G", "1H", "1J", "1K", "1L", "1M", "1N", "1Q", "1R", "1T", "1U", "1V", "1W", "1Y", "1Z", "LE-1", "LE-2"
//   ];

//   const teachers = [
//     {
//       name: "UDAY KUMAR SIR",
//       phoneNumber: "+919959802381"
//     },
//     {
//       name: "VIJETHA MA'AM",
//       phoneNumber: "+919440167315"
//     },
//     {
//       name: "BHARGAVI MA'AM",
//       phoneNumber: "+919912544729"
//     },
//     {
//       name: "PANDYA NAIK SIR",
//       phoneNumber: "+917661975546"
//     },
//     {
//       name: "SITA KAMESWARI MA'AM",
//       phoneNumber: "+919966800037"
//     },
//     {
//       name: "RASHMI MA'AM",
//       phoneNumber: "+91-"
//     },
//     {
//       name: "VENU SIR",
//       phoneNumber: "+91-"
//     },
//     {
//       name: "MONISH",
//       phoneNumber: "+917032338726"
//     },
//     {
//       name: "SHAISTHA",
//       phoneNumber: "+919410478221"
//     }
//   ];

//   const markAttendance = (rollNumber) => {
//     if (attendanceList.includes(rollNumber)) {
//       setAttendanceList(attendanceList.filter((item) => item !== rollNumber));
//     } else {
//       setAttendanceList([...attendanceList, rollNumber]);
//     }
//   };

//   const submitAttendance = () => {
//     const absentStudents = rollNumbers.filter((rollNumber) => !attendanceList.includes(rollNumber));
//     setAbsentees(absentStudents);
//     setIsSubmitted(true);
//   };

//   const copyToClipboard = () => {
//     const absenteesString = absentees.join(", ");
//     Clipboard.setString(absenteesString);
//     alert("Absentees copied to clipboard!");
//   };

//   const sendToWhatsApp = (name, phoneNumber) => {
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     let greeting;

//     if (hours >= 5 && hours < 12) {
//       greeting = "Good morning";
//     } else if (hours >= 12 && hours < 17) {
//       greeting = "Good afternoon";
//     } else {
//       greeting = "Good evening";
//     }

//     const teacherTitle = name.includes("SIR") ? "Sir" : "Ma'am";
//     const presenteesString = attendanceList.join(", ");
//     const absenteesString = absentees.join(", ");
//     const message = `${greeting}, ${teacherTitle}!\n\nPresentees: ${presenteesString}\nAbsentees: ${absenteesString}`;
//     const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
//     Linking.openURL(whatsappURL);
//   };

//   const handleLogout = () => {
//     if (isSubmitted) {
//       setIsSubmitted(false);
//       setAttendanceList([]);
//       setAbsentees([]);
//     }

//     navigation.navigate("LoginScreen");
//   };

//   const Refresh = () => {
//     if (isSubmitted) {
//       setIsSubmitted(false);
//       setAttendanceList([]);
//       setAbsentees([]);
//     }

//     navigation.navigate("AttendanceScreen");
//   };

//   const updateAttendance = () => {
//     const presentees = attendanceList.join(", ");
//     const absenteesString = absentees.join(", ");

//     const message = `Presentees: ${presentees}\nAbsentees: ${absenteesString}`;
//     const whatsappURL = `whatsapp://send?phone=7032338726&text=${encodeURIComponent(message)}`;
//     Linking.openURL(whatsappURL);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={handleLogout} style={styles.button}>
//           <Text style={styles.buttonText}>{isSubmitted ? "Logout" : ""}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={Refresh} style={styles.button}>
//           <Text style={styles.buttonText}>{isSubmitted ? "Back" : ""}</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Mark Attendance</Text>

//       <ScrollView contentContainerStyle={styles.rollNumberContainer}>
//         {rollNumbers.map((rollNumber) => (
//           <TouchableOpacity
//             key={rollNumber}
//             onPress={() => markAttendance(rollNumber)}
//             style={[
//               styles.rollNumber,
//               {
//                 backgroundColor: attendanceList.includes(rollNumber) ? "green" : "red"
//               }
//             ]}
//           >
//             <Text style={styles.rollNumberText}>{rollNumber}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <TouchableOpacity onPress={submitAttendance}>
//         <View style={styles.submitButtonContainer}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </View>
//       </TouchableOpacity>

//       {isSubmitted && attendanceList.length > 0 && (
//         <View style={styles.attendanceContainer}>
//           <Text style={styles.attendanceLabel}>Presentees:</Text>
//           <Text style={styles.attendanceText}>{attendanceList.join(", ")}</Text>
//         </View>
//       )}

//       {isSubmitted && absentees.length > 0 && (
//         <View style={styles.attendanceContainer}>
//           <Text style={styles.attendanceLabel}>Absentees:</Text>
//           <Text style={styles.attendanceText}>{absentees.join(", ")}</Text>
//           <TouchableOpacity onPress={copyToClipboard}>
//             <Text style={styles.linkText}>Copy to Clipboard</Text>
//           </TouchableOpacity>

//           {teachers.map((teacher, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => sendToWhatsApp(teacher.name, teacher.phoneNumber)}
//               style={styles.teacherBox}
//             >
//               <Text style={styles.teacherText}>Send to {teacher.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       {isSubmitted && (
//         <TouchableOpacity onPress={updateAttendance}>
//           <View style={styles.submitButtonContainer}>
//             <Text style={styles.submitButtonText}>Update Attendance</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };
// import React, { useState } from "react";
// import { Clipboard, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";

// const AttendanceScreen = ({ navigation }) => {
//   const [attendanceListCSMA, setAttendanceListCSMA] = useState([]);
//   const [attendanceListCSMB, setAttendanceListCSMB] = useState([]);
//   const [absenteesCSMA, setAbsenteesCSMA] = useState([]);
//   const [absenteesCSMB, setAbsenteesCSMB] = useState([]);
//   const [isSubmittedCSMA, setIsSubmittedCSMA] = useState(false);
//   const [isSubmittedCSMB, setIsSubmittedCSMB] = useState(false);
//   const [isCSMA, setIsCSMA] = useState(true);

//   const rollNumbers = [
//     "02", "03", "04", "05", "06", "07", "08", "0A", "0B", "0D", "0E", "0F", "0G", "0H", "0J", "0K", "0L", "0M", "0N", "0P", "0R", "0T", "0U", "0V", "0Y", "0Z", "11", "12", "13", "14", "16", "17", "18","1A", "1B", "1C", "1F", "1G", "1H", "1J", "1K", "1L", "1M", "1N", "1Q", "1R", "1T", "1U", "1V", "1W", "1Y", "1Z", "LE-1", "LE-2"
//   ];

//   const teachers = [
//     {
//       name: "UDAY KUMAR SIR",
//       phoneNumber: "+919959802381"
//     },
//     {
//       name: "VIJETHA MA'AM",
//       phoneNumber: "+919440167315"
//     },
//     {
//       name: "BHARGAVI MA'AM",
//       phoneNumber: "+919912544729"
//     },
//     {
//       name: "PANDYA NAIK SIR",
//       phoneNumber: "+917661975546"
//     },
//     {
//       name: "SITA KAMESWARI MA'AM",
//       phoneNumber: "+919966800037"
//     },
//     {
//       name: "RASHMI MA'AM",
//       phoneNumber: "+91-"
//     },
//     {
//       name: "VENU SIR",
//       phoneNumber: "+91-"
//     },
//     {
//       name: "MONISH",
//       phoneNumber: "+917032338726"
//     },
//     {
//       name: "SHAISTHA",
//       phoneNumber: "+919410478221"
//     }
//   ];

//   const markAttendance = (rollNumber) => {
//     if (isCSMA) {
//       if (attendanceListCSMA.includes(rollNumber)) {
//         setAttendanceListCSMA(attendanceListCSMA.filter((item) => item !== rollNumber));
//       } else {
//         setAttendanceListCSMA([...attendanceListCSMA, rollNumber]);
//       }
//     } else {
//       if (attendanceListCSMB.includes(rollNumber)) {
//         setAttendanceListCSMB(attendanceListCSMB.filter((item) => item !== rollNumber));
//       } else {
//         setAttendanceListCSMB([...attendanceListCSMB, rollNumber]);
//       }
//     }
//   };

//   const submitAttendance = () => {
//     if (isCSMA) {
//       const absentStudents = rollNumbers.filter((rollNumber) => !attendanceListCSMA.includes(rollNumber));
//       setAbsenteesCSMA(absentStudents);
//       setIsSubmittedCSMA(true);
//     } else {
//       const absentStudents = rollNumbers.filter((rollNumber) => !attendanceListCSMB.includes(rollNumber));
//       setAbsenteesCSMB(absentStudents);
//       setIsSubmittedCSMB(true);
//     }
//   };

//   const copyToClipboard = () => {
//     const absenteesString = isCSMA ? absenteesCSMA.join(", ") : absenteesCSMB.join(", ");
//     Clipboard.setString(absenteesString);
//     alert("Absentees copied to clipboard!");
//   };

//   const sendToWhatsApp = (name, phoneNumber) => {
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     let greeting;

//     if (hours >= 5 && hours < 12) {
//       greeting = "Good morning";
//     } else if (hours >= 12 && hours < 17) {
//       greeting = "Good afternoon";
//     } else {
//       greeting = "Good evening";
//     }

//     const teacherTitle = name.includes("SIR") ? "Sir" : "Ma'am";
//     const presenteesString = isCSMA ? attendanceListCSMA.join(", ") : attendanceListCSMB.join(", ");
//     const absenteesString = isCSMA ? absenteesCSMA.join(", ") : absenteesCSMB.join(", ");
//     const message = `${greeting}, ${teacherTitle}!\n\nPresentees: ${presenteesString}\nAbsentees: ${absenteesString}`;
//     const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
//     Linking.openURL(whatsappURL);
//   };

//   const handleLogout = () => {
//     if (isCSMA) {
//       if (isSubmittedCSMA) {
//         setIsSubmittedCSMA(false);
//         setAttendanceListCSMA([]);
//         setAbsenteesCSMA([]);
//       }
//     } else {
//       if (isSubmittedCSMB) {
//         setIsSubmittedCSMB(false);
//         setAttendanceListCSMB([]);
//         setAbsenteesCSMB([]);
//       }
//     }

//     navigation.navigate("LoginScreen");
//   };

//   const Refresh = () => {
//     if (isCSMA) {
//       if (isSubmittedCSMA) {
//         setIsSubmittedCSMA(false);
//         setAttendanceListCSMA([]);
//         setAbsenteesCSMA([]);
//       }
//     } else {
//       if (isSubmittedCSMB) {
//         setIsSubmittedCSMB(false);
//         setAttendanceListCSMB([]);
//         setAbsenteesCSMB([]);
//       }
//     }

//     navigation.navigate("AttendanceScreen");
//   };

//   const updateAttendance = () => {
//     const presentees = isCSMA ? attendanceListCSMA.join(", ") : attendanceListCSMB.join(", ");
//     const absenteesString = isCSMA ? absenteesCSMA.join(", ") : absenteesCSMB.join(", ");

//     const message = `Presentees: ${presentees}\nAbsentees: ${absenteesString}`;
//     const whatsappURL = `whatsapp://send?phone=7032338726&text=${encodeURIComponent(message)}`;
//     Linking.openURL(whatsappURL);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={handleLogout} style={styles.button}>
//           <Text style={styles.buttonText}>{isCSMA ? (isSubmittedCSMA ? "Logout" : "") : (isSubmittedCSMB ? "Logout" : "")}</Text>
//         </TouchableOpacity>
//         <Switch
//           value={isCSMA}
//           onValueChange={(value) => setIsCSMA(value)}
//         />
//         <TouchableOpacity onPress={Refresh} style={styles.button}>
//           <Text style={styles.buttonText}>{isCSMA ? (isSubmittedCSMA ? "Back" : "") : (isSubmittedCSMB ? "Back" : "")}</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Mark Attendance</Text>

//       <ScrollView contentContainerStyle={styles.rollNumberContainer}>
//         {rollNumbers.map((rollNumber) => (
//           <TouchableOpacity
//             key={rollNumber}
//             onPress={() => markAttendance(rollNumber)}
//             style={[
//               styles.rollNumber,
//               {
//                 backgroundColor: (isCSMA ? attendanceListCSMA : attendanceListCSMB).includes(rollNumber) ? "green" : "red"
//               }
//             ]}
//           >
//             <Text style={styles.rollNumberText}>{rollNumber}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <TouchableOpacity onPress={submitAttendance}>
//         <View style={styles.submitButtonContainer}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </View>
//       </TouchableOpacity>

//       {isCSMA ? (
//         isSubmittedCSMA && attendanceListCSMA.length > 0 && (
//           <View style={styles.attendanceContainer}>
//             <Text style={styles.attendanceLabel}>Presentees:</Text>
//             <Text style={styles.attendanceText}>{attendanceListCSMA.join(", ")}</Text>
//           </View>
//         )
//       ) : (
//         isSubmittedCSMB && attendanceListCSMB.length > 0 && (
//           <View style={styles.attendanceContainer}>
//             <Text style={styles.attendanceLabel}>Presentees:</Text>
//             <Text style={styles.attendanceText}>{attendanceListCSMB.join(", ")}</Text>
//           </View>
//         )
//       )}

//       {isCSMA ? (
//         isSubmittedCSMA && absenteesCSMA.length > 0 && (
//           <View style={styles.attendanceContainer}>
//             <Text style={styles.attendanceLabel}>Absentees:</Text>
//             <Text style={styles.attendanceText}>{absenteesCSMA.join(", ")}</Text>
//             <TouchableOpacity onPress={copyToClipboard}>
//               <Text style={styles.linkText}>Copy to Clipboard</Text>
//             </TouchableOpacity>

//             {teachers.map((teacher, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => sendToWhatsApp(teacher.name, teacher.phoneNumber)}
//                 style={styles.teacherBox}
//               >
//                 <Text style={styles.teacherText}>Send to {teacher.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )
//       ) : (
//         isSubmittedCSMB && absenteesCSMB.length > 0 && (
//           <View style={styles.attendanceContainer}>
//             <Text style={styles.attendanceLabel}>Absentees:</Text>
//             <Text style={styles.attendanceText}>{absenteesCSMB.join(", ")}</Text>
//             <TouchableOpacity onPress={copyToClipboard}>
//               <Text style={styles.linkText}>Copy to Clipboard</Text>
//             </TouchableOpacity>

//             {teachers.map((teacher, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => sendToWhatsApp(teacher.name, teacher.phoneNumber)}
//                 style={styles.teacherBox}
//               >
//                 <Text style={styles.teacherText}>Send to {teacher.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )
//       )}

//       {isCSMA ? (
//         isSubmittedCSMA && (
//           <TouchableOpacity onPress={updateAttendance}>
//             <View style={styles.submitButtonContainer}>
//               <Text style={styles.submitButtonText}>Update Attendance</Text>
//             </View>
//           </TouchableOpacity>
//         )
//       ) : (
//         isSubmittedCSMB && (
//           <TouchableOpacity onPress={updateAttendance}>
//             <View style={styles.submitButtonContainer}>
//               <Text style={styles.submitButtonText}>Update Attendance</Text>
//             </View>
//           </TouchableOpacity>
//         )
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignSelf: "stretch",
//     paddingHorizontal: 20,
//     marginBottom: 10
//   },
//   button: {
//     backgroundColor: "#ECECEC",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 70,
//     height: 30
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 14,
//     fontWeight: "bold"
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10
//   },
//   rollNumberContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 10
//   },
//   rollNumber: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     margin: 5,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   rollNumberText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   submitButtonContainer: {
//     backgroundColor: "darkblue",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginBottom: 20
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   attendanceContainer: {
//     marginTop: 20,
//     alignItems: "center"
//   },
//   attendanceLabel: {
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   attendanceText: {
//     fontSize: 14,
//     marginTop: 5
//   },
//   linkText: {
//     color: "blue",
//     marginTop: 10
//   },
//   teacherBox: {
//     backgroundColor: "#BFE6FF",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginTop: 10,
//     borderRadius: 5,
//     alignItems: "center"
//   },
//   teacherText: {
//     color: "black",
//     fontWeight: "bold"
//   }
// });

// export default AttendanceScreen;
import React, { useState } from "react";
import {
  Clipboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

const AttendanceScreen = ({ navigation }) => {
  const [attendanceListCSMA, setAttendanceListCSMA] = useState([]);
  const [attendanceListCSMB, setAttendanceListCSMB] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [section, setSection] = useState("CSMA"); // Default to CSMA

  // Define roll numbers based on the section
  const rollNumbers =
    section === "CSMA"
      ? [
         "21", "22", "28", "29", "2A", "2B", "2F", "2J", "2K", "2L", "2Q", "2V", "2X", "2Y", "31", "33", "35", "39", "3A", "3B", "3E", "3G", "3N", "3U", "3Y", "K2", "42", "4G", "4H", "4J", "4L", "4M", "51", "5N", "5Y"
        ]
      : ["02", "03", "04", "05", "06", "07", "08", "0A", "0B", "0D", "0E", "0F", "0G", "0H", "0J", "0K", "0L", "0M", "0N", "0P", "0R", "0T", "0U", "0V", "0Y", "0Z", "11", "12", "13", "14", "16", "17", "18","1A", "1B", "1C", "1F", "1G", "1H", "1J", "1K", "1L", "1M", "1N", "1Q", "1R", "1T", "1U", "1V", "1W", "1Y", "1Z", "LE-1", "LE-2"]; // Add roll numbers for CSMB

  const getGreeting = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 5 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const teachers = [
    {
      name: "UDAY KUMAR SIR",
      phoneNumber: "+919959802381",
    },
    {
      name: "VIJETHA MA'AM",
      phoneNumber: "+919440167315",
    },
    // Add more teachers as needed
  ];

  const markAttendance = (rollNumber) => {
    if (section === "CSMA") {
      if (attendanceListCSMA.includes(rollNumber)) {
        setAttendanceListCSMA(attendanceListCSMA.filter((item) => item !== rollNumber));
      } else {
        setAttendanceListCSMA([...attendanceListCSMA, rollNumber]);
      }
    } else {
      if (attendanceListCSMB.includes(rollNumber)) {
        setAttendanceListCSMB(attendanceListCSMB.filter((item) => item !== rollNumber));
      } else {
        setAttendanceListCSMB([...attendanceListCSMB, rollNumber]);
      }
    }
  };

  const submitAttendance = () => {
    const absentStudents = rollNumbers.filter((rollNumber) =>
      section === "CSMA"
        ? !attendanceListCSMA.includes(rollNumber)
        : !attendanceListCSMB.includes(rollNumber)
    );
    setAbsentees(absentStudents);
    setIsSubmitted(true);
  };

  const copyToClipboard = () => {
    const absenteesString = absentees.join(", ");
    Clipboard.setString(absenteesString);
    alert("Absentees copied to clipboard!");
  };

  const sendToWhatsApp = (name, phoneNumber) => {
    const greeting = getGreeting();
    const presenteesString = section === "CSMA" ? attendanceListCSMA.join(", ") : attendanceListCSMB.join(", ");
    const absenteesString = absentees.join(", ");
    const message = `${greeting}, ${name.includes("SIR") ? "Sir" : "Ma'am"}!\n\nPresentees: ${presenteesString}\nAbsentees: ${absenteesString}`;
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL);
  };

  const handleLogout = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setAttendanceListCSMA([]);
      setAttendanceListCSMB([]);
      setAbsentees([]);
    }

    navigation.navigate("LoginScreen");
  };

  const Refresh = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setAttendanceListCSMA([]);
      setAttendanceListCSMB([]);
      setAbsentees([]);
    }

    navigation.navigate("AttendanceScreen");
  };

  const updateAttendance = () => {
    const presentees = section === "CSMA" ? attendanceListCSMA.join(", ") : attendanceListCSMB.join(", ");
    const absenteesString = absentees.join(", ");
    const message = `Presentees: ${presentees}\nAbsentees: ${absenteesString}`;
    const whatsappURL = `whatsapp://send?phone=7032338726&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>{isSubmitted ? "Logout" : ""}</Text>
        </TouchableOpacity>
        <Switch
          value={section === "CSMA"}
          onValueChange={(value) => {
            setSection(value ? "CSMA" : "CSMB");
            handleSwitchSection(value ? "CSMA" : "CSMB"); // Call the callback to update the title
          }}
        />
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
                backgroundColor: (section === "CSMA" ? attendanceListCSMA : attendanceListCSMB).includes(rollNumber)
                  ? "green"
                  : "red",
              },
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

      {isSubmitted && (
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceLabel}>Presentees:</Text>
          <Text style={styles.attendanceText}>
            {section === "CSMA" ? attendanceListCSMA.join(", ") : attendanceListCSMB.join(", ")}
          </Text>
        </View>
      )}

      {isSubmitted && (
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
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ECECEC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rollNumberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  rollNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  rollNumberText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonContainer: {
    backgroundColor: "darkblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  attendanceContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  attendanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  attendanceText: {
    fontSize: 14,
    marginTop: 5,
  },
  linkText: {
    color: "blue",
    marginTop: 10,
  },
  teacherBox: {
    backgroundColor: "#BFE6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  teacherText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default AttendanceScreen;
