import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

function callingPhone(number) {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = 'tel:$' + number;
  } else {
    phoneNumber = 'telprompt:$' + number;
  }
  Linking.openURL(phoneNumber);
}
function age(date) {
  let nowDate = moment().format('YYYY-MM-DD');
  let _date = moment(date).format('YYYY-MM-DD');
  let age = moment(nowDate).diff(moment(_date), 'years');
  return age;
}
function UserDetail({ route }) {
  const { userID } = route.params,
    [data, setData] = useState({}),
    [loading, setLoading] = useState(false),
    colors = ['#fbfbfb', '#c6c6c6'],
    {
      avatarContainer,
      avatarSubContainer,
      textContainer,
      textHead,
      btnContact,
      container,
      indicatorContainer,
      cntFlex,
      imageView,
      image,
      txt,
      gradient,
      txtSize,
      indicator,
      iconPad,
    } = styles;
  getData = () => {
    setLoading(true);
    fetch('https://dummyapi.io/data/v1/user/' + userID, {
      method: 'GET',
      headers: {
        'app-id': '61980f353260377a5ee87478',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => getData(), []);

  return (
    <SafeAreaView style={container}>
      {!loading ? (
        <View style={cntFlex}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={colors}
            style={avatarContainer}>
            <View style={[avatarSubContainer, { borderWidth: 0 }]}>
              <View style={imageView}>
                <Image
                  style={image}
                  source={{ uri: data.picture }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={colors}
            style={avatarContainer}>
            <View style={avatarSubContainer}>
              <View style={textContainer}>
                <Text style={textHead}>Full Name : </Text>
                <Text style={txt}>
                  {data.firstName} {data.lastName}
                </Text>
              </View>
              <View style={textContainer}>
                <Text style={textHead}>Age : </Text>
                <Text style={txt}>{age(data.dateOfBirth)} Years Old</Text>
              </View>
              <View style={textContainer}>
                <Text style={textHead}>City / State : </Text>
                <Text style={txtSize}>
                  {data.location?.city.slice(0, 10)}{' '}
                  {data.location?.state.length > 10
                    ? data.location?.state.slice(0, 10) + '...'
                    : data.location?.state}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={colors}
            style={gradient}>
            <TouchableOpacity
              style={btnContact}
              onPress={() => callingPhone(data.phone)}>
              <View>
                <Icon name="mobile-alt" size={30} style={iconPad} />
              </View>
              <View>
                <Text style={txtSize}>{data.phone}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={btnContact}
              onPress={() => Linking.openURL('mailto:' + data.email)}>
              <View>
                <Icon name="envelope" size={30} style={iconPad} />
              </View>
              <View>
                <Text style={txtSize}>{data.email}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
        <View style={indicatorContainer}>
          <ActivityIndicator color="black" style={indicator} />
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatarSubContainer: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#bbb',
    borderRadius: 8,
  },
  textContainer: {
    width: '80%',
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textHead: {
    fontSize: 20,
    color: 'white',
  },
  btnContact: {
    width: '90%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#bbb',
    borderRadius: 8,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cntFlex: {
    flex: 1,
  },
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 72,
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSize: {
    fontSize: 20,
  },
  indicator: {
    marginLeft: 8,
  },
  iconPad: {
    padding: 15,
  },
});
export default UserDetail;
