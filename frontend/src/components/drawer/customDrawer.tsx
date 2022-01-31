import React, { Component } from 'react';
import { View } from 'react-native';
import { AppState } from '../../redux/store';
import { UserState } from '../../redux/user/types';
import { connect } from 'react-redux';
import { SystemState } from '../../redux/system/types';
import { logInUser } from '../../redux/user/actions';
import { updateSession } from '../../redux/system/actions';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button, H1, Icon, Picker, Thumbnail, Toast } from 'native-base';

interface CustomDrawerProps {
  user: UserState;
  system: SystemState;
  logInUser: typeof logInUser;
  updateSession: typeof updateSession;
  state: any;
  navigation: any;
  descriptors: any;
  progress: any;
}

class CustomDrawer extends Component<CustomDrawerProps> {
  logOut = () => {
    // clear session history
    this.props.updateSession({
      loggedIn: false
    });
    this.props.logInUser({
      password: '',
      email: '',
      phoneNumber: '',
      fullName: '',
      mode: ''
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#34495E' }}>
        <View
          style={{
            backgroundColor: '#48C9B0',
            paddingLeft: 10,
            paddingBottom: 0,
            padding: 30,
            paddingRight: 0
          }}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Button
              transparent
              onPress={() =>
                Toast.show({
                  text: 'You clicked your profile!',
                  buttonText: 'Close',
                  style: { backgroundColor: '#3498DB' },
                  duration: 4000
                })
              }
            >
              <Thumbnail
                large
                style={{
                  backgroundColor: 'lightblue',
                  marginRight: 10,
                  borderColor: '#6FFFB0',
                  borderWidth: 3
                }}
                source={{
                  uri:
                    'https://thefader-res.cloudinary.com/private_images/w_2400,c_limit,f_auto,q_auto:best/19150004Final_n2e4ks/phoebe-bridgers-cover-story-interview.jpg'
                }}
              />
              <H1 style={{ fontWeight: 'bold', color: 'white' }}>
                {this.props.user.fullName.split(' ')[0] || 'John Smith'}
              </H1>
            </Button>
          </View>
          <Picker
            style={{
              marginTop: 30,
              color: 'white',
              width: '100%'
            }}
            mode="dropdown"
            itemStyle={{ fontWeight: 'bold' }}
            iosHeader="Driver or Host?"
            iosIcon={<Icon name="arrow-down" />}
          >
            <Picker.Item label="Driver" value="key0" />
            <Picker.Item label="Switch to Host" value="key1" />
          </Picker>
        </View>
        <DrawerContentScrollView {...this.props}>
          <DrawerItem
            label="Map"
            onPress={() => this.props.navigation.navigate('Map')}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
            style={{ backgroundColor: undefined }}
            icon={() => (
              <Icon
                type="FontAwesome5"
                name="map-marked-alt"
                style={{ color: 'white' }}
              />
            )}
          />
          <DrawerItem
            label="My Vehicles"
            onPress={() => this.props.navigation.navigate('Vehicle')}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
            style={{ backgroundColor: undefined }}
            icon={() => (
              <Icon type="FontAwesome" name="car" style={{ color: 'white' }} />
            )}
          />
          <DrawerItem
            label="My Wallet"
            onPress={() => this.props.navigation.navigate('Wallet')}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
            style={{ backgroundColor: undefined }}
            icon={() => (
              <Icon
                type="FontAwesome5"
                name="wallet"
                style={{ color: 'white' }}
              />
            )}
          />
          <DrawerItem
            label="My Trips"
            onPress={() => {}}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
            style={{ backgroundColor: undefined }}
            icon={() => (
              <Icon
                type="Feather"
                name="navigation"
                style={{ color: 'white' }}
              />
            )}
          />
          <DrawerItem
            label="Settings"
            onPress={() => {}}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
            style={{ backgroundColor: undefined }}
            icon={() => (
              <Icon type="Feather" name="settings" style={{ color: 'white' }} />
            )}
          />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  system: state.system
});

export default connect(mapStateToProps, { updateSession, logInUser })(
  CustomDrawer
);
