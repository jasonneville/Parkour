import React, { Component } from 'react';
import { AppState } from '../../redux/store';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, View } from 'react-native';
import { updateSession } from '../../redux/system/actions';
import { logInUser } from '../../redux/user/actions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Content, Input, Icon, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

interface ProfileProps {
  navigation: any;
}

class Profile extends Component<ProfileProps> {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <Content
          contentContainerStyle={{
            justifyContent: 'center',
            flex: 1
          }}
        >
          <LinearGradient
            colors={['#3f5efb', '#fc466b']}
            style={{
              height: '100%',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                margin: 40,
                marginLeft: 20,
                marginRight: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flex: 1
              }}
            >
              <Button
                icon
                rounded
                style={{
                  marginRight: 10,
                  elevation: 20,
                  backgroundColor: '#34495E',
                  alignSelf: 'center'
                }}
              >
                <Icon
                  style={{ fontSize: 21 }}
                  type="AntDesign"
                  name="menufold"
                  onPress={this.props.navigation.openDrawer}
                />
              </Button>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 30,
                  elevation: 20,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  alignSelf: 'center'
                }}
              >
                <Icon
                  type="MaterialIcons"
                  name="location-searching"
                  style={{
                    fontSize: 21,
                    marginLeft: 20,
                    marginRight: 5
                  }}
                />
                <Input
                  placeholder="Where do you want to go?"
                  style={{
                    fontSize: 14
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E'
  },
  map: {
    justifyContent: 'center',
    flex: 1
  }
});

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  system: state.system
});

export default connect(mapStateToProps, { updateSession, logInUser })(Profile);