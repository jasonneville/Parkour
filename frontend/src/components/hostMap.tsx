import React, { Component } from 'react';
import { AppState } from '../redux/store';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, View } from 'react-native';
import { updateSession } from '../redux/system/actions';
import { logInUser } from '../redux/user/actions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Content, Input, Icon, Button, Spinner } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface HostMapProps {
  navigation: any;
}

class HostMap extends Component<HostMapProps> {
  state = {
    loading: true
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({ loading: false }), 500);
  };

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
          {this.state.loading ? (
            <Spinner />
          ) : (
            <View style={{ flex: 1 }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsCompass={true}
                initialRegion={{
                  latitude: 42.023949, //ISU
                  longitude: -93.647595,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              />
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
                {/* <GooglePlacesAutocomplete
                    styles={{
                      textInputContainer: {
                        width: '100%'
                      },
                      description: {
                        fontWeight: 'bold'
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      }
                    }}
                    onPress={(data, details = null) => {
                      console.log(details); //this fetches all the details from the request after clicking a place
                      console.log(data);
                      var x = data.description.split(','); //delimitter
                      console.log("data.description", data.description.split(',')); 
                      //

                      console.log(x[1])
                
          
                    }}

                    fetchDetails={true}
                    minLength={3}
                    onFail={error => console.error(error)}
                    placeholder='Where would you like to go?'
                    
                    query={{
                      key: 'AIzaSyC6Ggsdyrq42RsG4BMcCt2LWolsKKqKhUI',
                      language: 'en',
                      components: 'country:us',
                    }}
                    enablePoweredByContainer={false}
                /> */}
              </View>
            </View>
          )}
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

export default connect(mapStateToProps, { updateSession, logInUser })(HostMap);
