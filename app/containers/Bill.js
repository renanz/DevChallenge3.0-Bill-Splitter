import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

export default class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: this.props.navigation.state.params.friendsList,
      itemsList: [],
      itemValue: 0,
      subtotal: 0,
      tax: 0,
      serviceTax: 0,
      beverageTax: 0,
      total: 0
    };
  }

  updateTotal() {
    const { subtotal, tax, serviceTax, beverageTax } = this.state;
    this.setState({ total: subtotal + tax + serviceTax + beverageTax });
  }

  updateSubTotal() {
    const { itemsList, subtotal } = this.state;
    subtotal = 0;
    itemsList.forEach(element => {
      subtotal += element.value;
    });
    this.setState({ subtotal });
  }

  appendToList = () => {
    const { itemsList, itemValue } = this.state;
    if (itemValue) itemsList.push(itemValue);
    this.setState({ itemsList, itemValue: 0 });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.input}>
            <TextInput
              value={this.state.itemValue.toString()}
              style={styles.textInput}
              editable={true}
              keyboardType="numeric"
              placeholder="Value"
              placeholderTextColor="black"
              onChangeText={text => this.setState({ itemValue: text })}
            />
            <Button
              title="Add Item"
              style={styles.button}
              onPress={this.appendToList}
            />
          </View>
        </View>
        
        <ScrollView style={styles.body}>
          {this.state.itemsList.map((value, key) => {
            <Text key={key}>{value}</Text>
          })}
        </ScrollView>

        <View style={styles.footer}>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Subtotal:</Text>
            </View>
            <View style={styles.listItemValue}>
              <Text>{this.state.subtotal}</Text>
            </View>
          </View>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Tax:</Text>
            </View>
            <View style={styles.listItemValue}>
            <TextInput
              placeholder="Write Tax"
              keyboardType="numeric"
              editable={true}
              placeholderTextColor="black"
              onChangeText={text => {
                this.setState({ tax: text });
              }}
            />
            </View>
          </View>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Service Tax:</Text>
            </View>
            <View style={styles.listItemValue}>
            <TextInput
              placeholder="Write Service Tax"
              keyboardType="numeric"
              editable={true}
              placeholderTextColor="black"
              onChangeText={text => {
                this.setState({ serviceTax: text });
              }}
            />
            </View>
          </View>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Beverage Tax:</Text>
            </View>
            <View style={styles.listItemValue}>
            <TextInput
              placeholder="Write Beverage Tax"
              keyboardType="numeric"
              editable={true}
              placeholderTextColor="black"
              onChangeText={text => {
                this.setState({ beverageTax: text });
              }}
            />
            </View>
          </View>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Total:</Text>
            </View>
            <View style={styles.listItemValue}>
              <Text>{this.state.total}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AED6F1",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    marginTop: 20,
    height: "5%"
  },
  body: {
    marginTop: 10,
    width: "100%",
    height: "60%"
  },
  footer: {
    height: "30%"
  },
  listItem: {
    width: "50%",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center"
  },
  listItemValue: {
    width: "50%",
    textAlign: "left",
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
  button: {
    width: "30%"
  },
  input: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  element: {
    height: 25,
    marginTop: 5,
    flexDirection: "row"
  }
});
