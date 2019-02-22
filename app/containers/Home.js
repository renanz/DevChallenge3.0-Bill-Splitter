import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class HomeScreen extends React.Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
