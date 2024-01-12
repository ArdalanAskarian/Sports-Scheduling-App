// HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Home = () => {
  const [selectedTeam, setSelectedTeam] = useState('Your Team');
  const [userHome, setUserHome] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.userId) {
          console.log('User state or user ID is undefined. Redirecting to SignIn.');
          navigation.navigate('SignIn');
          return;
        }

        // Fetch user home data
        const userHomeResponse = await axios.get(`http://localhost:3000/sportSync/home/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("User Home response:", userHomeResponse.data); // Access data directly
        if (userHomeResponse.data.success) {
          setUserHome(userHomeResponse.data.user);
        } else {
          console.log('Error fetching user home data');
        }

        // Fetch games data
        const gamesResponse = await axios.get(`http://localhost:3000/sportSync/ShowGames`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("Games response:", gamesResponse.data); // Access data directly

        if (gamesResponse.data.success) {
          setGames(gamesResponse.data.allGames);
        } else {
          console.log('Error fetching games data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user || !user.userId) {
      console.log('User not authenticated');
      navigation.navigate('SignIn');
    } else {
      fetchData();
    }
  }, [selectedTeam, navigation, user, dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {userHome ? (
        <>
          <View style={styles.headerContainer}>
            {/* Replace with the actual team logo source */}
            <Image source={require('./image.png')} style={styles.teamLogo} />
            <Text style={styles.welcomeMessage}>Welcome, {userHome?.playerName}!</Text>
            <Text style={styles.teamName}>{userHome?.teamName}</Text>
          </View>

          {/* Placeholder for Upcoming Games */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Upcoming Games:</Text>
            <Text>No upcoming games available</Text>
          </View>

          {/* Placeholder for Previous Games */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Previous Games:</Text>
            <Text>No previous games available</Text>
          </View>

          {/* Display Team Stats Summary */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Team Stats Summary (W/L/T):</Text>
            <Text style={styles.statsText}>{`Wins: ${userHome.teamStats?.wins || 0}, Losses: ${userHome.teamStats?.losses || 0}, Ties: ${userHome.teamStats?.ties || 0}`}</Text>
          </View>
          {/* Display All Games */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>All Games:</Text>
            {games.map((game, index) => (
              <Text key={index} style={styles.gameItem}>
                {`${game.name} - ${game.team1} vs ${game.team2} (${game.date} ${game.time})`}
              </Text>
            ))}
            {games.length === 0 && <Text>No games available</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Change Team"
              onPress={() => {
                setSelectedTeam(selectedTeam === 'Your Team' ? 'Opponent Team' : 'Your Team');
              }}
            />
          </View>

          <View style={styles.navigationContainer}>
            <Button style={styles.navigationButton} title="Feature 1" onPress={() => console.log('Navigate to Feature 1')} />
            <Button style={styles.navigationButton} title="Feature 2" onPress={() => console.log('Navigate to Feature 2')} />
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  teamLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50, // Rounded corners for the team logo
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    textAlign: 'center',
  },
  teamName: {
    fontSize: 18,
    color: '#555', // Slightly darker text color
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff', // White background for cards
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Add elevation for Android shadow effect
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  gameItem: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  statsText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  noStatsText: {
    fontSize: 18,
    color: '#f00',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  navigationContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navigationButton: {
    width: '45%',
    backgroundColor: '#4CAF50', // Green background color
    padding: 10,
    borderRadius: 5,
  },
});


export default Home;