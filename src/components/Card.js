import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Card = ({ item, navigation }) => {
    const {
        container,
        cardSize,
        cardSizeCnt,
        cardImage,
        cardTitleCnt,
        cardTitle,
        cardTitleText,
    } = styles;
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Detail', {
                    userID: item.id,
                })
            }>
            <View style={container}>
                <View style={cardSize}>
                    <View style={cardSizeCnt}>
                        <Image
                            style={cardImage}
                            source={{ uri: item.picture }}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View style={cardTitleCnt}>
                    <View style={cardTitle}>
                        <Text numberOfLines={1} style={cardTitleText}>
                            {item.firstName} {item.lastName}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    cardSize: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 190,
    },
    cardSizeCnt: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 72,
    },
    cardTitleCnt: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingVertical: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    cardTitle: {
        flex: 1,
        alignItems: 'center',
    },
    cardTitleText: {
        fontSize: 16,
    },
});
