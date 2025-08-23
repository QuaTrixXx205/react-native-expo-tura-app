import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import React from 'react'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window')

export default function sev_home() {

    // Data cho Service
    const tourData = [
        {
            image: 'https://vietuctourist.vn/wp-content/uploads/2025/04/dalat-tour-banner.jpg'
        },
        {
            image: 'https://www.holidaygogogo.com/wp-content/uploads/2023/10/2025-Promo-4d3n-Hanoi-Ha-Long-Cruise-Tour-Package.png'
        },
        {
            image: 'https://fansipanlegend.sunworld.vn/wp-content/uploads/2024/10/Cham-Sapa-768x512.png'
        }
    ];

    return (
        <View>
            <View>
                <Carousel
                    width={width}
                    height={height - 500}
                    data={tourData}
                    scrollAnimationDuration={500}
                    autoPlay={true}
                    autoPlayInterval={4000}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // DHTK style card
    card: {
        flexDirection: 'column',
        backgroundColor: '#D6EEFF',
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
});