import { Button, Icon, ListItem, Text } from 'native-base';
import React, { Component } from 'react';

interface CardProps {
  default: boolean;
  title: string;
  handleDelete(): void;
  handleUpdate(): void;
}

export default class Card extends Component<CardProps> {
  render() {
    return (
      <ListItem
        onPress={this.props.handleUpdate}
        style={{
          justifyContent: 'space-between'
        }}
      >
        <Text
          style={{
            color: this.props.default ? '#48C9B0' : '#34495E',
            fontWeight: 'bold',
            marginRight: 20
          }}
        >
          {this.props.title}
        </Text>
        <Button
          rounded
          style={{ backgroundColor: '#A2423D' }}
          onPress={this.props.handleDelete}
        >
          <Icon name="delete" type="AntDesign" style={{ color: 'white' }} />
        </Button>
      </ListItem>
    );
  }
}
