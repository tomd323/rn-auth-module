import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState(null);

  const authCTX = useContext(AuthContext);
  const token = authCTX.token;  // Get the token from the context

  useEffect(() => {
    axios.get('https://auth-backend-d508b-default-rtdb.firebaseio.com/message.json?auth=' + token)
      .then((response) => {
        setFetchMessage(response.data);
      })
      .catch((error) => {
        console.log("No message received", error);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
