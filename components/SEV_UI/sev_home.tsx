import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import React from 'react'

const { width } = Dimensions.get('window');

export default function sev_home() {

  const { colors } = useTheme();

  // Data cho Service
    const tourData = [
        {
            title: 'Tour đang diễn ra - Đà Lạt trip',
            code: 'DL234-56S',
            guests: 42,
            date: '23/07/2025 - 26/07/2025',
            hdv: '🧑‍✈️',
            manager: ['🧑‍✈️', '🧑‍✈️', '🧑‍✈️', '🧑‍✈️'],
            partner: ['🧑‍✈️', '🧑‍✈️', '🧑‍✈️', '🧑‍✈️'],
            image: 'https://www.dalattrip.com/media/2012/10/Dalat-Vietnam-Dalat-central-lake.jpg'
        },
        {
            title: 'Tour đang diễn ra - Sapa trip',
            code: 'SP100-22S',
            guests: 35,
            date: '01/08/2025 - 04/08/2025',
            hdv: '🧑‍✈️',
            manager: ['🧑‍✈️', '🧑‍✈️'],
            partner: ['🧑‍✈️', '🧑‍✈️', '🧑‍✈️'],
            image: 'https://booking.muongthanh.com/upload_images/images/H%60/sa-pa-thi-tran-trong-suong.jpg'
        }
    ];

  return (
    <View>
      <View>
                <Carousel
                    width={width}
                    height={280}
                    data={tourData}
                    scrollAnimationDuration={500}
                    autoPlay={true}
                    autoPlayInterval={4000}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            {/* Left content */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.todayText}>Ngày hôm nay</Text>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.sub}>Mã tour: {item.code}</Text>
                                <Text style={styles.sub}>Số khách: {item.guests}</Text>
                                <Text style={styles.sub}>Thời gian: {item.date}</Text>
                                <Text style={styles.sub}>HDV: {item.hdv}</Text>
                                <Text style={styles.sub}>Phụ trách: {item.manager.join(' ')}</Text>
                                <Text style={styles.sub}>Đối tác cung ứng: {item.partner.join(' ')}</Text>

                                <TouchableOpacity style={{ marginTop: 6 }}>
                                    <LinearGradient
                                        colors={['#4f92feff', '#009dfeff']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.button}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Theo dõi</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            {/* Right image */}
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
        flexDirection: 'row',
        backgroundColor: '#D6EEFF',
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    todayText: {
        color: '#003366',
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    sub: {
        fontSize: 13,
        color: '#333',
        marginBottom: 2,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 14,
        borderRadius: 20,
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginLeft: 10,
        marginTop: 10,
    },
});