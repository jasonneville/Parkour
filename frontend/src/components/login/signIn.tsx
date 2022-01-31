import React, { Component } from 'react';
import {
  Text,
  Button,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  H1,
  Icon
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { AppState } from '../../redux/store';
import { UserState } from '../../redux/user/types';
import { SystemState } from '../../redux/system/types';
import { logInUser } from '../../redux/user/actions';
import { updateSession } from '../../redux/system/actions';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface SignInProps {
  system: SystemState;
  logInUser: typeof logInUser;
  updateSession: typeof updateSession;
  close(): void;
}

class SignIn extends Component<SignInProps> {
  state = {
    email: '',
    password: ''
  };

  // logIn = () => {
  //   axios
  //     .post('http://192.168.1.13:8080/users/login', {
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //     .then(resp => {
  //       axios
  //         .get('http://192.168.1.13:8080/users/me', {
  //           headers: { sessionId: resp.data.data.sessionId }
  //         })
  //         .then(resp => {
  //           const user: UserState = {
  //             email: resp.data.data.email,
  //             password: resp.data.data.password,
  //             phoneNumber: resp.data.data.phoneNumber,
  //             fullName:
  //               resp.data.data.firstName + ' ' + resp.data.data.lastName,
  //             mode: resp.data.data.host ? 'host' : 'guest'
  //           };

  //           this.props.logInUser(user);
  //           this.props.updateSession({
  //             loggedIn: true
  //           });
  //         });
  //     })
  //     .catch(error => {
  //       this.setState({ error: true });
  //       console.log('error: ' + error.message);
  //     });
  // };

  logIn = () => {
    const user: UserState = {
      email: 'lorenzoz@iastate.edu',
      password: 'password',
      phoneNumber: '515-123-1234',
      fullName: 'Lorenzo Zenitsky',
      mode: 'guest'
    };

    this.props.logInUser(user);
    this.props.updateSession({
      loggedIn: true
    });
  };

  onChangeEmail = (text: string) => {
    this.setState({
      email: text
    });
  };

  onChangePassword = (text: string) => {
    this.setState({
      password: text
    });
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#2dbeff' }}>
        <StatusBar backgroundColor="#2dbeff" barStyle="light-content" />
        <Content
          contentContainerStyle={{
            height: '100%',
            justifyContent: 'space-between'
          }}
        >
          <LinearGradient
            colors={['#2dbeff', '#7314ff']}
            style={{
              padding: 10,
              height: '100%',
              justifyContent: 'space-between'
            }}
          >
            <View>
              <Icon
                type="Octicons"
                name="sign-in"
                style={{
                  alignSelf: 'center',
                  margin: 10,
                  color: 'white',
                  fontSize: 64
                }}
              />
              <H1
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                Sign In
              </H1>
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
                  <Label>Email</Label>
                  <Input
                    autoCapitalize="none"
                    autoFocus
                    value={this.state.email}
                    onChangeText={text => this.onChangeEmail(text)}
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
                  <Label>Password</Label>
                  <Input
                    autoCapitalize="none"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={text => this.onChangePassword(text)}
                  />
                </Item>
                <Button
                  block
                  rounded
                  onPress={() => {
                    this.logIn();
                  }}
                  style={{
                    margin: 10,
                    alignSelf: 'center',
                    backgroundColor: '#76D7C4'
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Continue</Text>
                </Button>
              </Form>
            </View>
            <Button
              rounded
              info
              style={{ alignSelf: 'center', margin: 10, elevation: 10 }}
              onPress={this.props.close}
            >
              <Icon
                type="FontAwesome"
                name="close"
                style={{
                  alignSelf: 'center'
                }}
              />
            </Button>
          </LinearGradient>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  user: state.user
});

export default connect(mapStateToProps, { updateSession, logInUser })(SignIn);
