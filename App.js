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
    let temp = [];
    const currList = this.state.list;
    currList.forEach(element => {
      temp.push(element);
    });
    if (this.state.friendName) temp.push(this.state.friendName);
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
            <View key={key} style={styles.element}>
              <View style={styles.listItem}>
                <Text style={{paddingLeft: 10}}>{data}</Text>
              </View>
              <TouchableOpacity style={styles.listItemDelete} onPress={() => this.setState(() => ({ list: this.state.list.splice(key, 1)}))}>
                <Text style={{color: "white"}}>Delete</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 40
  },
  button: {
    width: "30%"
  },
  body: {
    marginTop: 10,
    width: "100%"
  },
  listItem: {
    backgroundColor: "#CFCFCF", 
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  listItemDelete: {
    backgroundColor: "red", 
    width: "20%",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    marginRight: 3,
    borderColor: "black",
    borderWidth: 2,
    width: "70%",
    paddingLeft: 5
  },
  input: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  element: {
    height: 40,
    marginTop: 5,
    flexDirection: "row"
  }
});

export default createAppContainer(AppNavigator);
