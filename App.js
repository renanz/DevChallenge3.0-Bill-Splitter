import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Job Splitter App!</Text>
        <Text>To Start, you should enter the names of your friends</Text>
        <Button title="Add friends" onPress={
          this.props.navigation.navigate("Friends", {});
        }/>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: HomeScreen,
  SplittedBill: SplittedBill,
  Friends: Friends,
  Bill: Bill
},
{
  initialRouteName: "HomeScreen"
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppNavigator);