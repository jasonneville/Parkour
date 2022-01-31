import React, { Component } from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  Header,
  Icon,
  List,
  Right,
  Spinner,
  Text
} from 'native-base';
import { Alert, StatusBar, View } from 'react-native';
import Vehicle from './vehicle';

interface MyVehiclesProps {
  navigation: any;
}

const vehicles = [
  {
    make: 'Volkswagen',
    model: 'Tiguan'
  },
  {
    make: 'Toyota',
    model: 'Prius'
  }
];

export default class MyVehicles extends Component<MyVehiclesProps> {
  state = {
    loading: true
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#34495E' }}>
        <Header
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginBottom: 10,
            marginTop: 30,
            elevation: 0
          }}
          iosBarStyle="light-content"
        >
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Map')}
          >
            <Icon name="arrow-back" type="MaterialIcons" />
          </Button>
          <H1 style={{ fontWeight: 'bold', color: 'white' }}>My Vehicles</H1>
          <Right>
            <Button
              style={{ backgroundColor: 'white' }}
              rounded
              onPress={() => this.props.navigation.push('Add')}
            >
              <Icon
                name="add"
                type="MaterialIcons"
                style={{ fontSize: 32, color: '#48C9B0' }}
              />
            </Button>
          </Right>
        </Header>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        <Content
          contentContainerStyle={{
            justifyContent: this.state.loading ? 'center' : 'space-between',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: 'white'
          }}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <View>
              <List>
                {vehicles.map((vehicle, i) => (
                  <Vehicle
                    key={i}
                    make={vehicle.make}
                    model={vehicle.model}
                    handleDelete={() =>
                      Alert.alert(
                        'Danger Zone!',
                        'Are you sure you want to delete this payment method?',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              this.setState({ loading: true });
                              setTimeout(
                                () => this.setState({ loading: false }),
                                1000
                              );
                            }
                          },
                          { text: 'No' }
                        ]
                      )
                    }
                    handleUpdate={() =>
                      Alert.alert(
                        'Options',
                        'Set card to default payment method?',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              this.setState({ loading: true });
                              setTimeout(
                                () => this.setState({ loading: false }),
                                1000
                              );
                            }
                          },
                          { text: 'No' }
                        ]
                      )
                    }
                  />
                ))}
              </List>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
