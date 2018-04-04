import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, Image, StyleSheet
} from 'react-native';
import { Form, TextInput } from 'react-native-autofocus';
import Toast from 'react-native-simple-toast';
import getUser from '../../api/getUser';
import saveUser from '../../api/saveUser';
import backSpecial from '../../media/appIcon/back_white.png';

export default class ChangeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
      user: null
    };
  }

  componentDidMount() {
    this.getUserLocal();
  }

  onChangeInfo() {
    const { user, name, phone, address } = this.state;
    user.address = address;
    user.phone = phone;
    user.name = name;
    saveUser(user);
    this.props.navigation.pop();
    Toast.show('Save infor success');
  }

  getUserLocal() {
    getUser()
      .then(user => {
        if (user) {
          this.setState({
            name: user.name,
            address: user.address,
            phone: user.phone,
            user
          });
        }
      });
  }
  goBackToMain() {
    this.props.navigation.pop();
  }


  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body,
      signInContainer, signInTextStyle, textInput
    } = styles;
    const { name, address, phone } = this.state;
    return (
      <View style={wrapper}>
        <View style={header}>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
          <Text style={headerTitle}>User Infomation</Text>
          <View />
        </View>
        <View style={body}>
          <Form>
            <TextInput
              editable={false}
              underlineColorAndroid='transparent'
              returnKeyType='next'
              style={textInput}
              placeholder="Enter your name"
              autoCapitalize="none"
              value={name}
              onChangeText={txtName => this.setState({ name: txtName })}
            />
            <TextInput
              underlineColorAndroid='transparent'
              returnKeyType='next'
              style={textInput}
              placeholder="Enter your address"
              autoCapitalize="none"
              value={address}
              onChangeText={txtAddress => this.setState({ address: txtAddress })}
            />
            <TextInput
              underlineColorAndroid='transparent'
              returnKeyType='done'
              keyboardType='numeric'
              style={textInput}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              value={phone}
              onChangeText={txtPhone => this.setState({ phone: txtPhone })}
            />
          </Form>
          <TouchableOpacity style={signInContainer} onPress={this.onChangeInfo.bind(this)}>
            <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    backgroundColor: '#2ABB9C',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  headerTitle: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontSize: 20
  },
  backIconStyle: {
    width: 30,
    height: 30
  },
  body: {
    flex: 10,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center'
  },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  signInTextStyle: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontWeight: '600',
    paddingHorizontal: 20
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  signInStyle: {
    flex: 3,
    marginTop: 50
  }
});
