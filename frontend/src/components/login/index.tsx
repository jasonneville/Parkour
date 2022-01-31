import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import { SystemState } from '../../redux/system/types';
import { updateSession } from '../../redux/system/actions';
import { Content, Container, H1, Button, Text, Icon } from 'native-base';
import { StyleSheet, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SignIn from './signIn';
import SignUp from './signUp';
import Home from '../home';

interface AppProps {
  system: SystemState;
}

class Login extends Component<AppProps> {
  state = {
    showSignIn: false,
    showSignUp: false
  };

  render() {
    if (this.props.system.loggedIn) {
      return <Home />;
    } else {
      return (
        <Container style={styles.container}>
          <StatusBar backgroundColor="#7314ff" barStyle="light-content" />
          <Content
            contentContainerStyle={{
              justifyContent: 'center',
              flex: 1
            }}
          >
            <LinearGradient
              colors={['#7314ff', '#2dbeff']}
              style={{ height: '100%', justifyContent: 'center', flex: 1 }}
            >
              {!this.state.showSignIn && !this.state.showSignUp && (
                <View>
                  <View style={{ padding: 10 }}>
                    <Icon
                      type="FontAwesome"
                      name="car"
                      style={{
                        color: 'white',
                        fontSize: 128,
                        alignSelf: 'center',
                        margin: 10
                      }}
                    />
                    <H1
                      style={{
                        color: 'white',
                        fontSize: 32,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Parkour
                    </H1>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      Find better parking.
                    </Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Button
                      block
                      primary
                      rounded
                      onPress={() => this.setState({ showSignIn: true })}
                      style={{
                        margin: 10,
                        alignSelf: 'center',
                        backgroundColor: '#76D7C4'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
                    </Button>
                    <Button
                      rounded
                      onPress={() => this.setState({ showSignUp: true })}
                      block
                      style={{
                        alignSelf: 'center',
                        margin: 10,
                        backgroundColor: '#7A35FF'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>Sign up</Text>
                    </Button>
                  </View>
                </View>
              )}
              {this.state.showSignIn && (
                <SignIn close={() => this.setState({ showSignIn: false })} />
              )}
              {this.state.showSignUp && (
                <SignUp close={() => this.setState({ showSignUp: false })} />
              )}
            </LinearGradient>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fc466b'
  }
});

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(mapStateToProps, { updateSession })(Login);
