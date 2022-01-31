import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HostMap from './hostMap';
import CustomDrawer from './drawer/customDrawer';
import WalletStack from './wallet/index';
import Vehicle from './vehicle/index';

const DrawerNavigator = createDrawerNavigator();

class Home extends Component {
  render() {
    return (
      <DrawerNavigator.Navigator
        hideStatusBar
        statusBarAnimation="slide"
        screenOptions={{ swipeEnabled: true }}
        drawerContent={(props: any) => <CustomDrawer {...props} />}
        drawerContentOptions={{
          contentContainerStyle: { backgroundColor: '#34495E' }
        }}
      >
        <DrawerNavigator.Screen name="Map" component={HostMap} />
        <DrawerNavigator.Screen name="Wallet" component={WalletStack} />
        <DrawerNavigator.Screen name="Vehicle" component={Vehicle} />
      </DrawerNavigator.Navigator>
    );
  }
}

export default Home;
