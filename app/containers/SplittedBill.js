import React from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";

export default class SplittedBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: this.props.navigation.state.params.friendsList,
      itemsList: this.props.navigation.state.params.itemsList,
      taxPercentage: this.props.navigation.state.params.tax,
      serviceTaxPercentage: this.props.navigation.state.params.serviceTax,
      beverageTaxPercentage: this.props.navigation.state.params.beverageTax,
      total: 0
    };
  }

  calculateValue = index => {
    const {
      itemsList,
      taxPercentage,
      serviceTaxPercentage,
      beverageTaxPercentage
    } = this.state;
    let value = 0;
    itemsList.forEach(element => {
      if (element.friendId === index) value += element.value;
    });
    let taxes = taxPercentage + serviceTaxPercentage + beverageTaxPercentage;
    value *= 1 + taxes;
    return value.toFixed(2);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={{ height: 70, fontWeight: "bold", textAlign: "center" }}>
            The Splitted Bill Is
          </Text>
          <View style={styles.row}>
            <Text style={styles.friend}>Friend</Text>
            <Text style={styles.value}>Pays</Text>
          </View>
          <ScrollView>
            {this.state.friendsList.map((data, key) => (
              <View key={key} style={styles.row}>
                <Text style={styles.friend}>{data}</Text>
                <Text style={styles.value}>{this.calculateValue(key)}</Text>
              </View>
            ))}
          </ScrollView>
          <Button
            title="Split another bill"
            style={{ width: "50%" }}
            onPress={() => this.props.navigation.navigate("Home", {})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7FB3D5",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    marginTop: "10%"
  },
  scroll: {
    marginTop: 20,
    height: "85%"
  },
  totalRow: {
    height: "15%"
  },
  row: {
    flexDirection: "row",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  friend: {
    width: "60%",
    textAlign: "center"
  },
  value: {
    width: "40%",
    textAlign: "center"
  }
});
