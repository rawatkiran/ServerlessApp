import React, { Component } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const CreateItem = gql`
  mutation createItem($name: String!) {
    createItem(input: { name: $name }) {
      name
      id
    }
  }
`;
const listItems = gql`
  query listItems {
    listItems {
      items {
        id
        name
      }
    }
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  addTodo = () => this.props.createItem({ name: this.state.name });
  render() {
    console.log(this.state.savedId, "SID");

    return (
      <View style={{ flex: 1, borderWidth: 2 }}>
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center", padding: 10, fontSize: 50 }}>
            todos
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10
          }}
        >
          <TextInput
            style={{
              width: deviceWidth / 1.5,
              height: deviceHeight / 14,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              fontSize: 22,
              paddingLeft: 20
            }}
            placeholder="What needs to be done?"
            placeholderTextColor="orange"
            autoCapitalize="none"
            onChangeText={name =>
              this.setState({
                name
              })
            }
            value={this.state.name}
          />
          <TouchableOpacity
            style={{
              width: deviceWidth / 4,
              height: deviceHeight / 14,
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.addTodo();
              this.setState({ name: "" });
              console.log(this.state.item);
            }}
          >
            <Text style={{ fontSize: 20 }}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20 }}>
          {this.props.todos.map((item, index) => (
            <Text key={index} style={{ fontSize: 20 }}>
              {item.name}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

export default compose(
  graphql(listItems, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: props => ({
      todos: props.data.listItems ? props.data.listItems.items : []
    })
  }),
  graphqlMutation(CreateItem, listItems, "Item")
)(Home);
