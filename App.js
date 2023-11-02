import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AttendanceScreen from './AttendanceScreen';
import AttendanceScreen2 from './AttendanceScreen2';
import AttendanceScreen3 from './AttendanceScreen3';
import AttendanceScreen4 from './AttendanceScreen4';
import AttendanceScreen5 from './AttendanceScreen5';
import AttendanceScreen6 from './AttendanceScreen6';
import AttendanceScreen7 from './AttendanceScreen7';
import AttendanceScreen8 from './AttendanceScreen8';
import AttendanceScreen9 from './AttendanceScreen9';
import AttendanceScreen10 from './AttendanceScreen10';
const Stack = createStackNavigator();

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'DAA23' && password === 'DAA23') {
      navigation.navigate('AttendanceScreen');
    } else if (username === 'CSMB21' && password === 'CSMB123$') {
      navigation.navigate('AttendanceScreen2');
    } else if (username === 'CSD21' && password === 'CSD123$') {
      navigation.navigate('AttendanceScreen3');
    } else if (username === 'CSMC21' && password === 'CSMC123$') {
      navigation.navigate('AttendanceScreen4');
    } else if (username === 'ITA21' && password === 'ITA123$') {
      navigation.navigate('AttendanceScreen5');
    } else if (username === 'CSED21' && password === 'CSED123$') {
      navigation.navigate('AttendanceScreen6');
    } else if (username === 'CSEB21' && password === 'CSEB123$') {
      navigation.navigate('AttendanceScreen7');
    } else if (username === 'CSEE21' && password === 'CSEE123$') {
      navigation.navigate('AttendanceScreen8');
    } else if (username === 'CSEC21' && password === 'CSEC123$') {
      navigation.navigate('AttendanceScreen10');
    } else if (username === 'CSEA21' && password === 'CSEA123$') {
      navigation.navigate('AttendanceScreen9');
    }

     else {
      alert('Invalid credentials. Please enter correct credentials.');
    }
  };

  return (
    <ImageBackground
      source={require('./background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>DRONA MITHRA</Text>
        <Text style={styles.header}>KMIT</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Image source={require('./monish.png')} style={styles.footerImage} />
        <Text style={styles.footerText}>Developed by Monish  </Text>
      </View>
    </ImageBackground>
  );
};
const handleSwitchSection = (section) => {
  const title = section === 'CSMA' ? 'CSM-A Attendance' : 'CSM-B Attendance';
  navigation.setOptions({
    title,
  });
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirmation', 'Thank you for using Attendance Companion?', [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
          options={{
            title: 'CSM A & B Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
              

            ),
          }}
          
        />
        {({ navigation }) => (
    <AttendanceScreen
      switchSection={handleSwitchSection}
      navigation={navigation}
    />
  )}
        <Stack.Screen
          name="AttendanceScreen2"
          component={AttendanceScreen2}
          options={{
            title: 'CSM-B Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen3"
          component={AttendanceScreen3}
          options={{
            title: 'CSD ATTENDANCE',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen4"
          component={AttendanceScreen4}
          options={{
            title: 'CSM-C ATTENDANCE',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen5"
          component={AttendanceScreen5}
          options={{
            title: 'IT-A Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen6"
          component={AttendanceScreen6}
          options={{
            title: 'CSE-D Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen7"
          component={AttendanceScreen7}
          options={{
            title: 'CSE-B Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen8"
          component={AttendanceScreen8}
          options={{
            title: 'CSE-E Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        
        <Stack.Screen
          name="AttendanceScreen10"
          component={AttendanceScreen10}
          options={{
            title: 'CSE-C Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AttendanceScreen9"
          component={AttendanceScreen9}
          options={{
            title: 'CSE-A Attendance',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'darkblue' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}></Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  footerImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  footerText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default App;
