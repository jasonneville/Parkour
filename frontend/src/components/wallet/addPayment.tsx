import React, { Component } from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  Header,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Text
} from 'native-base';
import { StatusBar, View } from 'react-native';

interface AddPaymentProps {
  navigation: any;
}

export default class AddPayment extends Component<AddPaymentProps> {
  state = {
    cardNumber: '',
    date: '',
    cvc: '',
    zip: '',
    valid: false
  };

  cardNumberOnChange = (value: string) => {
    this.setState({ cardNumber: value });
  };

  dateOnChange = (value: string) => {
    this.setState({ date: value });
  };

  cvcOnChange = (value: string) => {
    this.setState({ cvc: value });
  };

  zipOnChange = (value: string) => {
    this.setState({ zip: value });
  };

  isComplete = () => {
    return (
      this.state.cardNumber &&
      this.state.date &&
      this.state.cvc &&
      this.state.zip
    );
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#34495E' }}>
        <Header
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginBottom: 10,
            marginTop: 30,
            elevation: 0
          }}
          iosBarStyle="light-content"
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button transparent onPress={this.props.navigation.popToTop}>
              <Icon name="cancel" type="MaterialIcons" />
            </Button>
            <H1 style={{ fontWeight: 'bold', color: 'white' }}>New Card</H1>
          </View>
          <Button style={{ borderRadius: 50 }} rounded disabled transparent>
            <Icon
              type="AntDesign"
              name="checkcircle"
              style={{ color: this.state.valid ? '#48C9B0' : '#A2423D' }}
            />
          </Button>
        </Header>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        <Content
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: 'white'
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignContent: 'center'
            }}
          >
            <Form style={{ alignItems: 'center' }}>
              <Icon
                type="AntDesign"
                name="creditcard"
                style={{ fontSize: 64, color: '#00739D' }}
              />
              <Item floatingLabel>
                <Label style={{ fontWeight: 'bold' }}>Card Number</Label>
                <Input
                  keyboardType="numeric"
                  value={this.state.cardNumber}
                  onChangeText={value => {
                    if (value.length <= 16) {
                      this.cardNumberOnChange(value);
                    }
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ fontWeight: 'bold' }}>MM/YY</Label>
                <Input
                  value={this.state.date}
                  keyboardType="numeric"
                  onChangeText={value => {
                    if (value.length <= 5) {
                      this.dateOnChange(
                        value.length === 2 ? value + '/' : value
                      );
                    }
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ fontWeight: 'bold' }}>CVC</Label>
                <Input
                  value={this.state.cvc}
                  keyboardType="numeric"
                  onChangeText={value => {
                    if (value.length <= 3) {
                      this.cvcOnChange(value);
                    }
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ fontWeight: 'bold' }}>ZIP</Label>
                <Input
                  value={this.state.zip}
                  keyboardType="numeric"
                  onChangeText={value => {
                    if (value.length <= 5) {
                      this.zipOnChange(value);
                    }
                  }}
                />
              </Item>
              <Button
                block
                rounded
                success={this.state.valid}
                disabled={!this.state.valid}
                style={{
                  margin: 30
                }}
                onPress={this.props.navigation.popToTop}
              >
                <Text>Finish</Text>
              </Button>
              <Button
                block
                rounded
                disabled={this.isComplete() ? false : true}
                info={this.isComplete() ? true : false}
                style={{
                  marginHorizontal: 30
                }}
                onPress={() => {
                  this.setState({ valid: true });
                }}
              >
                <Text>Scan Card</Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}
