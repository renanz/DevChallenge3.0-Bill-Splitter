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
          onPress={this.props.navigation.navigate("Friends", {})}
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
  render() {
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={this.state.friendName}
          style={styles.TextInput}
          editable={true}
          placeholder="Name"
          onChangeText={text => this.setState({ friendName: text })}
        />
        <Button
          title="Add friend"
          onPress={() => {
            let newList = this.state.list;
            newList.push(this.state.friendName);
            this.setState({ list: newList });
          }}
        />
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.scroll}>
          {this.state.list.map((data, index) => {
            <TouchableOpacity
              key={index}
              style={styles.touchItem}
              onPress={() =>
                this.props.navigation.navigate("Bill", { friendsList: list })
              }
            >
              <Text>{data}</Text>
            </TouchableOpacity>;
          })}
        </ScrollView>
      </View>
    </View>;
  }
}

const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    SplittedBill: SplittedBill,
    Friends: Friends,
    Bill: Bill
  },
  {
    initialRouteName: "HomeScreen"
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

  },
  body: {

  },
  scroll: {

  },
  touchItem: {
    
  }
});

export default createAppContainer(AppNavigator);
