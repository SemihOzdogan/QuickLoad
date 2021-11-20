import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, TextInput, Alert } from 'react-native';
import Card from '../components/Card';

const UserList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("")
    const [tempData, setTempData] = useState([])
    useEffect(() => {
        getData()
    }, []);
    const getData = () => {
        setLoading(true);
        fetch('https://dummyapi.io/data/v1/user/?limit=6&page=' + page, {
            method: 'GET',
            headers: {
                'app-id': '61980f353260377a5ee87478',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setPage(page + 1);
                setData([...data, ...responseJson.data]);
                setTempData([...tempData, ...responseJson.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1, padding: 5 }}>
            <Card item={item} navigation={navigation} />
        </View>
    );
    const renderFooter = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center', }}>
                <View style={{ margin: 5, backgroundColor: '#ccc', borderRadius: 4, paddingHorizontal: 30, paddingVertical: 5 }}>
                    <TouchableOpacity onPress={() => getData()}>
                        {
                            !loading ?
                                <Text>Load More</Text> : <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    searchFilterFunction = (text) => {
        if (text.length >= 3) {
            const newData = data.filter((item) => {
                const itemData = item.firstName ? item.firstName.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setTempData(newData)
            setSearchText(text)
        } else {
            setTempData(data)
            setSearchText(text)
        }
    }
    filterClear = () => {
        if (searchText.length < 3) {
            Alert.alert(
                "Warning",
                "No filtre data",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return false
        }
        else {
            setSearchText('')
            getData()
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                !loading ?
                    <View style={styles.container}>
                        <View style={{ width: '100%', height: 50, }}>
                            <View style={styles.clearBtnContainer}>
                                <View style={{ flex: 1, }}>
                                    <TextInput
                                        placeholder="Search By Name"
                                        value={searchText} onChangeText={(val) => searchFilterFunction(val)}
                                    />
                                </View>
                                <View style={{ flex: 0.5, backgroundColor: '#ccc', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => filterClear()}>
                                        <Text>Clear</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <FlatList
                            numColumns={3}
                            data={tempData}
                            enableEmptySections={true}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={renderFooter}
                        />
                    </View> : <View style={styles.indicatorContainer}><ActivityIndicator color="black" style={{ marginLeft: 8 }} /></View>
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'center'
    },
    clearBtnContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#ddd',
        borderRadius: 8,
        flexDirection: 'row',
    }

});

export default UserList;