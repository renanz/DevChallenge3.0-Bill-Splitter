import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  Picker,
  TouchableOpacity
} from "react-native";

export default class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: this.props.navigation.state.params.friendsList,
      itemsList: [],
      itemValue: 0,
      chosenFriendId: 0,
      subtotal: 0,
      tax: 0,
      serviceTax: 0,
      beverageTax: 0,
      total: 0,
      language: ""
    };
  }

  updateTotals = () => {
    const { itemsList } = this.state;
    var { subtotal, total } = this.state;
    total -= subtotal;
    subtotal = 0;
    itemsList.forEach(element => {
      subtotal += element.value;
    });
    total += subtotal;

    this.setState({ subtotal, total });
  };

  appendToList = () => {
    const { itemsList, itemValue, chosenFriendId } = this.state;
    if (itemValue)
      itemsList.push({ value: itemValue, friendId: chosenFriendId });
    this.setState({ itemsList, itemValue: 0, chosenFriendId: 0 });
    this.updateTotals();
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
              onChangeText={text => this.setState({ itemValue: Number(text) })}
            />
            <Picker
              style={styles.picker}
              selectedValue={this.state.chosenFriendId}
              onValueChange={(value, index) => {
                this.setState({ chosenFriendId: index });
              }}
            >
              {this.state.friendsList.map((data, key) => (
                <Picker key={key} label={data} value={key} />
              ))}
            </Picker>
            <Button
              title="Add Item"
              style={styles.button}
              onPress={this.appendToList}
            />
          </View>
        </View>

        <ScrollView style={styles.body}>
          {this.state.itemsList.map((data, key) => (
            <View key={key} style={styles.listElement}>
              <View style={styles.bodyListItem}>
                <Text style={{ width: "50%", textAlign: "center" }}>
                  {data.value}
                </Text>
                <Text style={{ width: "50%", textAlign: "center" }}>
                  {this.state.friendsList[data.friendId]}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.listItemDelete}
                onPress={() => {
                  const { itemsList } = this.state;
                  itemsList.splice(key, 1);
                  this.setState(() => ({ itemsList }));
                  this.updateTotals();
                }}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Subtotal:</Text>
            </View>
            <View style={styles.listItemValue}>
              <Text style={{ textAlign: "center" }}>{this.state.subtotal}</Text>
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
                style={{ textAlign: "center" }}
                editable={true}
                placeholderTextColor="black"
                onChangeText={text => {
                  var { tax, total } = this.state;
                  total -= tax;
                  tax = Number(text);
                  total += tax;
                  this.setState({ tax, total });
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
                style={{ textAlign: "center" }}
                keyboardType="numeric"
                editable={true}
                placeholderTextColor="black"
                onChangeText={text => {
                  var { serviceTax, total } = this.state;
                  total -= serviceTax;
                  serviceTax = Number(text);
                  total += serviceTax;
                  this.setState({ serviceTax, total });
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
                style={{ textAlign: "center" }}
                keyboardType="numeric"
                editable={true}
                placeholderTextColor="black"
                onChangeText={text => {
                  var { beverageTax, total } = this.state;
                  total -= beverageTax;
                  beverageTax = Number(text);
                  total += beverageTax;
                  this.setState({ beverageTax, total });
                }}
              />
            </View>
          </View>

          <View style={styles.element}>
            <View style={styles.listItem}>
              <Text>Total:</Text>
            </View>
            <View style={styles.listItemValue}>
              <Text style={{ textAlign: "center" }}>{this.state.total}</Text>
            </View>
          </View>
          <Button
            title="Split Bill"
            style={{ width: "50%" }}
            onPress={() =>
              this.props.navigation.navigate("SplittedBill", {
                friendsList: this.state.friendsList,
                itemsList: this.state.itemsList,
                tax: this.state.tax / this.state.subtotal,
                serviceTax: this.state.serviceTax / this.state.subtotal,
                beverageTax: this.state.beverageTax / this.state.subtotal
              })
            }
          />
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
    height: "10%"
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
    justifyContent: "center",
    flexDirection: "row"
  },
  listItemValue: {
    width: "50%",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center"
  },
  bodyListItem: {
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
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
    width: "30%",
    paddingLeft: 5
  },
  picker: {
    width: "40%",
    borderWidth: 2,
    borderColor: "black"
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
  },
  listElement: {
    height: 50,
    marginTop: 5,
    flexDirection: "row"
  }
});
