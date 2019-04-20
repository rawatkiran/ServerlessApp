import React, { Component } from "react";
import { Text, TouchableOpacity, Image, Dimensions, View } from "react-native";

const { height, width } = Dimensions.get("window");

export default class Item extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props, "PROPPPP");
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}
