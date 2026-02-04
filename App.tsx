import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Link screen="Details"
        onPress={() => {
          navigation.navigate('Details',);
        }}
      > Go to Details</Link>
      <Button screen="Details">Go to Details</Button>
    </View>
  );
}

function DetailsScreen({ route }) {
  const navigation = useNavigation();

  /* 2. Get the param */

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        onPress={
          () =>
            navigation.push('Details', {
              // Randomly generate an ID for demonstration purposes
              itemId: Math.floor(Math.random() * 100),
            })
        }
      >
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}