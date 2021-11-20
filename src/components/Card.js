import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
export default Card = ({ item, navigation }) => {
    return (
        <View style={{ backgroundColor: '#ddd', borderRadius: 8 }}>
            <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 190 }}>
                <View style={{ width: 80, height: 80, borderRadius: 50 }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 72 }} source={{ uri: item.picture }} resizeMode="cover" />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#ccc', paddingVertical: 10, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 16 }}>{item.firstName} {item.lastName}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                        userID: item.id
                    })} style={{ borderWidth: 1, borderColor: '#aaa', borderRadius: 8, paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 14 }}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}