import React, { Component } from 'react';
import { View, Alert, StatusBar } from 'react-native';
import {
  Text,
  Button,
  Container,
  Content,
  Item,
  Label,
  Input,
  H1,
  Icon,
  Form,
  Header
} from 'native-base';
import Axios from 'axios';

interface AddVehicleProps {
  navigation: any;
}

class AddVehicle extends Component<AddVehicleProps> {
  state = {
    licensePlate: '',
    make: '',
    model: '',
    year: '',
    color: ''
  };

  onChangeLicensePlate = (text: string) => {
    this.setState({
      licensePlate: text
    });
  };

  onChangeMake = (text: string) => {
    this.setState({
      make: text
    });
  };

  onChangeModel = (text: string) => {
    this.setState({
      model: text
    });
  };

  onChangeYear = (text: string) => {
    this.setState({
      year: text
    });
  };

  onChangeColor = (text: string) => {
    this.setState({
      color: text
    });
  };

  handleSubmit = () => {
    Axios.post(
      'http://192.168.0.6:8080/users/registerVehicle',
      {
        color: this.state.color,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        licensePlate: this.state.licensePlate
      },
      {
        headers: {
          sessionid: 'cbedd79a-72e8-45ca-af1a-751f3a3bd42e'
        }
      }
    )
      .then(resp => {
        console.log('hello');
        console.log(resp.data);
        this.props.navigation.navigate('Vehicle');
        Alert.alert('Vehicle successfully added!');
      })
      .catch(error => {
        console.log(error.response.data);

        this.setState({ error: true });
        console.log(error.message);
        console.log(error.data);
      });

    console.log(this.state.color);
    console.log(this.state.make);
    console.log(this.state.model);
    console.log(this.state.year);
    console.log(this.state.licensePlate);
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
            <H1 style={{ fontWeight: 'bold', color: 'white' }}>New Vehicle</H1>
          </View>
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
            <Form style={{ margin: 10 }}>
              <Item
                stackedLabel
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  paddingLeft: 10
                }}
              >
                <Label>License Plate</Label>
                <Input
                  value={this.state.licensePlate}
                  onChangeText={text => this.onChangeLicensePlate(text)}
                />
              </Item>
              <Item
                stackedLabel
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  paddingLeft: 10
                }}
              >
                <Label>Make</Label>
                <Input
                  value={this.state.make}
                  onChangeText={text => this.onChangeMake(text)}
                />
              </Item>
              <Item
                stackedLabel
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  paddingLeft: 10
                }}
              >
                <Label>Model</Label>
                <Input
                  value={this.state.model}
                  onChangeText={text => this.onChangeModel(text)}
                />
              </Item>
              <Item
                stackedLabel
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  paddingLeft: 10
                }}
              >
                <Label>Year</Label>
                <Input
                  value={this.state.year}
                  onChangeText={text => this.onChangeYear(text)}
                />
              </Item>
              <Item
                stackedLabel
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  paddingLeft: 10
                }}
              >
                <Label>Color</Label>
                <Input
                  value={this.state.color}
                  onChangeText={text => this.onChangeColor(text)}
                />
              </Item>
              <Button
                block
                iconRight
                rounded
                onPress={() => {}}
                style={{
                  margin: 20,
                  alignSelf: 'center',
                  backgroundColor: '#fc466b'
                }}
              >
                <Text
                  style={{ fontWeight: 'bold' }}
                  onPress={this.handleSubmit}
                >
                  Add
                </Text>
                <Icon type="FontAwesome5" name="car-side" />
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default AddVehicle;
