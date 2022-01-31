import { Button, Icon, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';

interface VehicleProps {
  make: string;
  model: string;
  handleDelete(): void;
  handleUpdate(): void;
}

export default class Vehicle extends Component<VehicleProps> {
  render() {
    return (
      <ListItem
        onPress={this.props.handleUpdate}
        style={{
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Icon
            name="car"
            type="FontAwesome"
            style={{ color: '#3498DB', marginRight: 10, fontSize: 64 }}
          />
          <View
            style={{
              alignItems: 'flex-start',
              alignContent: 'flex-start',
              flexDirection: 'column'
            }}
          >
            <Text
              style={{
                color: '#34495E',
                fontWeight: 'bold',
                marginRight: 0,
                fontSize: 24,
                textAlign: 'left'
              }}
            >
              {this.props.make}
            </Text>
            <Text
              style={{
                color: '#34495E',
                fontWeight: 'bold',
                marginRight: 0,
                textAlign: 'left'
              }}
            >
              {this.props.model}
            </Text>
          </View>
        </View>
        <Button onPress={this.props.handleDelete} icon transparent>
          <Icon
            name="caretright"
            type="AntDesign"
            style={{ color: '#34495E' }}
          />
        </Button>
      </ListItem>
    );
  }
}
