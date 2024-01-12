// this is the previous profile page that jonathan created and its functions are working with the backend connection.
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Make sure to import axios

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params.userId;

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user information from the API
        const response = await axios.get(`http://localhost:3000/sportSync/user/${userId}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          // Handle errors, e.g., user not found
          console.log(response.data.message);
          // You can also navigate back to a previous screen on error
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors
      }
    };

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, [userId, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.leftBox}>
          <Text style={styles.boxTitle}>Previous Game List</Text>
          {/* Add previous game list content here */}
        </View>

        <View style={styles.middleBox}>
        <View style={styles.upperMiddle}>
          <Text style={styles.boxTitle}>User Profile</Text>
          {user ? (
            <>
              <Text>First Name: {user.firstName}</Text>
              <Text>Last Name: {user.lastName}</Text>
              <Text>Email: {user.email}</Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>


          <View style={styles.middleMiddle}>
            <Image
              source={{ uri: user ? user.profileImage : '' }}
              style={styles.image}
            />
          </View>
          <View style={styles.lowerMiddle}>
          <Text style={styles.boxTitle}>Assigned Groups</Text>
          {user && user.groups ? (
            user.groups.map((group) => (
              <Text key={group}>{group}</Text>
            ))
          ) : (
            <Text>No assigned groups available</Text>
          )}
          </View>
        </View>

        <View style={styles.rightBox}>
          <Text style={styles.boxTitle}>Upcoming Game List</Text>
          {/* Add upcoming game list content here */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftBox: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  middleBox: {
    flex: 2,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  upperMiddle: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleMiddle: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerMiddle: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  rightBox: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Profile;
