import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TextInput,
    Alert,
} from 'react-native';
import Card from '../components/Card';

const UserList = ({ navigation }) => {
    const [loading, setLoading] = useState(true),
        [data, setData] = useState([]),
        [page, setPage] = useState(1),
        [searchText, setSearchText] = useState(''),
        [tempData, setTempData] = useState([]),
        [showLoad, setShowLoad] = useState(true),
        {
            indicator,
            indicatorContainer,
            notFound,
            filterContainer,
            container,
            clearBtnContainer,
            cnt,
            inputContainer,
            filterBtn,
            filterBtnOpacity,
            inputPlace,
        } = styles,
        getData = () => {
            setLoading(true);
            fetch('https://dummyapi.io/data/v1/user/?limit=6&page=' + page, {
                method: 'GET',
                headers: {
                    'app-id': '61980f353260377a5ee87478',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setPage(page + 1);
                    setData([...data, ...responseJson.data]);
                    setTempData([...tempData, ...responseJson.data]);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        renderItem = ({ item, index }) => (
            <View style={{ flex: 1, padding: 5 }}>
                <Card item={item} navigation={navigation} />
            </View>
        ),
        renderFooter = () => {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: '#ccc',
                            borderRadius: 4,
                            paddingHorizontal: 30,
                            paddingVertical: 5,
                        }}>
                        <TouchableOpacity onPress={() => getData()}>
                            {!loading ? (
                                <Text>Load More</Text>
                            ) : (
                                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            );
        },
        searchFilterFunction = text => {
            if (text.length >= 3) {
                const newData = data.filter(item => {
                    const itemData = item.firstName
                        ? item.firstName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setShowLoad(newData.length === 0 ? false : true);
                setTempData(newData);
                setSearchText(text);
            } else {
                setShowLoad(true);
                setTempData(data);
                setSearchText(text);
            }
        },
        filterClear = () => {
            if (searchText.length < 3) {
                Alert.alert('Warning', 'No filtre data', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return false;
            } else {
                setSearchText('');
                setShowLoad(true);
                getData();
            }
        };

    useEffect(() => getData(), []);
    return (
        <SafeAreaView style={cnt}>
            {!loading ? (
                <View style={container}>
                    <View style={filterContainer}>
                        <View style={clearBtnContainer}>
                            <View style={inputContainer}>
                                <TextInput
                                    placeholder="Kullanıcı Ara"
                                    value={searchText}
                                    onChangeText={val => searchFilterFunction(val)}
                                    style={inputPlace}
                                />
                            </View>
                            <View style={filterBtn}>
                                <TouchableOpacity
                                    style={filterBtnOpacity}
                                    onPress={() => filterClear()}>
                                    <Text>Temizle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {!showLoad && (
                        <View style={notFound}>
                            <Text>Kullanıcı Bulunamadı</Text>
                        </View>
                    )}
                    <FlatList
                        numColumns={3}
                        data={tempData}
                        enableEmptySections={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={showLoad && renderFooter}
                    />
                </View>
            ) : (
                <View style={indicatorContainer}>
                    <ActivityIndicator color="black" style={indicator} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cnt: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 15,
        textAlign: 'center',
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearBtnContainer: {
        flex: 1,
        margin: 5,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
    },
    filterContainer: {
        width: '100%',
        height: 50,
    },
    indicator: {
        marginLeft: 8,
    },
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
    },
    inputPlace: {
        flex: 1,
        marginLeft: 10,
    },
    filterBtn: {
        flex: 0.5,
        backgroundColor: '#ccc',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    filterBtnOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserList;
