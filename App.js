import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Job Splitter App!</Text>
        <Text>To Start, you should enter the names of your friends</Text>
        <Button
          title="Add friends"
          onPress={() => this.props.navigation.navigate("Friends", {})}
        />
      </View>
    );
  }
}

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      friendName: ""
    };
  }

  appendToList = () => {
    console.log(this.state.list.length + "bt pressed " + this.state.friendName);
    let temp = [];
    const currList = this.state.list;
    currList.forEach(element => {
      temp.push(element);
      console.log(element);
    });
    if (this.state.friendName) temp.push(this.state.friendName);
    console.log(temp.length);
    this.setState({ list: temp, friendName: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.input}>
            <TextInput
              value={this.state.friendName}
              style={styles.textInput}
              editable={true}
              placeholder="Name"
              onChangeText={text => this.setState({ friendName: text })}
            />
            <Button
              title="Add friend"
              style={styles.button}
              onPress={this.appendToList}
            />
          </View>
        </View>
        <ScrollView style={styles.body}>
          {this.state.list.map((data, key) => (
            <TouchableOpacity key={key}>
              <Text>{data}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: [],
      subtotal: 0,
      total: 0,
      tax: 0,
      serviceTax: 0,
      beverageTax: 0
    };
  }
  render() {
    return <View style={styles.container} />;
  }
}

const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    // SplittedBill: SplittedBill,
    Friends: Friends,
    Bill: Bill
  },
  {
    initialRouteName: "Friends"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    marginTop: 60
  },
  button: {
    width: "30%"
  },
  body: {
    marginTop: 100
  },
  scroll: {},
  touchItem: {},
  textInput: {
    marginRight: 3,
    borderColor: "black",
    borderWidth: 2,
    width: "70%",
    paddingLeft: 5
  },
  input: {
    flexDirection: "row"
  }
});

export default createAppContainer(AppNavigator);
