import React, { Component } from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  Header,
  Icon,
  List,
  Spinner,
  Text
} from 'native-base';
import { Alert, StatusBar, View } from 'react-native';
import Card from './card';

const cards = [
  {
    default: true,
    title: 'Discover - 3283'
  },
  { default: false, title: 'Visa - 5467' }
];

interface WalletProps {
  navigation: any;
}

export default class Wallet extends Component<WalletProps> {
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
          <H1 style={{ fontWeight: 'bold', color: 'white' }}>My Wallet</H1>
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
                {cards.map((card, i) => (
                  <Card
                    key={i}
                    default={card.default}
                    title={card.title}
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
          {!this.state.loading && (
            <Button
              iconRight
              block
              style={{
                backgroundColor: '#48C9B0',
                elevation: 10
              }}
              rounded
              onPress={() => this.props.navigation.push('Add')}
            >
              <Text>Add a payment method</Text>
              <Icon name="credit-card" type="FontAwesome" />
            </Button>
          )}
        </Content>
      </Container>
    );
  }
}
