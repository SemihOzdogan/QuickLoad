import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

function callingPhone(number) {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:$' + number;
    }
    else {
        phoneNumber = 'telprompt:$' + number;
    }
    Linking.openURL(phoneNumber);
};
function age(date) {
    let nowDate = moment().format('YYYY-MM-DD');
    let _date = moment(date).format('YYYY-MM-DD')
    let age = (moment(nowDate).diff(moment(_date), 'years'))
    return age
}
function UserDetail({ route }) {
    const { userID } = route.params
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => getData(), []);
    const getData = () => {
        setLoading(true)
        console.log('https://dummyapi.io/data/v1/user/' + userID)
        fetch('https://dummyapi.io/data/v1/user/' + userID, {
            method: 'GET',
            headers: {
                'app-id': '61980f353260377a5ee87478',
            },

        })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(data)
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                !loading ?
                    <View style={{ flex: 1 }}>

                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#7F7FFF', '#FF2323']}
                            style={styles.avatarContainer}>
                            <View style={styles.avatarSubContainer}>
                                <View style={{ width: 100, height: 100, borderRadius: 50 }}>
                                    <Image style={{ width: '100%', height: '100%', borderRadius: 72 }} source={{ uri: data.picture }} resizeMode="cover" />
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>HELLO</Text>
                                </View>
                            </View>
                        </LinearGradient>

                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#7F7FFF', '#FF2323']}
                            style={styles.avatarContainer} >
                            <View style={styles.avatarSubContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textHead}>Full Name : </Text>
                                    <Text style={{ fontSize: 20 }}>{data.firstName} {data.lastName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textHead}>Age : </Text>
                                    <Text style={{ fontSize: 20 }}>{age(data.dateOfBirth)} Years Old</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textHead}>City / State : </Text>
                                    <Text style={{ fontSize: 20 }}>{data.location?.city.slice(0, 10)} {data.location?.state.length > 10 ? data.location?.state.slice(0, 10) + '...' : data.location?.state}</Text>
                                </View>
                            </View>
                        </LinearGradient>


                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#7F7FFF', '#FF2323']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={styles.btnContact}
                                onPress={() => callingPhone(data.phone)}
                            >
                                <View>
                                    <Icon name="mobile-alt" size={30} style={{ padding: 15 }} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20 }}>{data.phone}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnContact}
                                onPress={() => Linking.openURL('mailto:' + data.email)}
                            >
                                <View>
                                    <Icon name="envelope" size={30} style={{ padding: 15 }} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20 }}>{data.email}</Text>
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    : <View style={styles.indicatorContainer}><ActivityIndicator color="black" style={{ marginLeft: 8 }} /></View>
            }

        </SafeAreaView >
    )
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
        borderBottomColor: '#ccc'
    },
    avatarSubContainer: {
        width: '90%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8
    },
    textContainer: {
        width: '80%',
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textHead: {
        fontSize: 20,
        color: 'white'
    },
    btnContact: {
        width: '90%',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#ccc',
        borderRadius: 8
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
export default UserDetail;
