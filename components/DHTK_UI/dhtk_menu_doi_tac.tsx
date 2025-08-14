import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Partner = {
  name: string;
  stars: number;
  distance: string;
  facilityRating: number;
  services: string[];
  availableRooms: number;
  image: string;
};

const partners: Partner[] = [
  {
    name: 'Khách sạn Hoàng Gia',
    stars: 5,
    distance: '2km',
    facilityRating: 4.8,
    services: ['Chu đáo', 'Miễn phí ăn sáng'],
    availableRooms: 5,
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/66/fe/48/camera-deluxe.jpg',
  },
  {
    name: 'Resort Biển Xanh',
    stars: 4,
    distance: '500m',
    facilityRating: 4.5,
    services: ['Miễn phí spa', 'Hồ bơi'],
    availableRooms: 8,
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/66/fe/48/camera-deluxe.jpg',
  },
];

const filters = [
  { icon: 'restaurant-outline', label: 'Nhà hàng' },
  { icon: 'bed-outline', label: 'Lưu trú' },
  { icon: 'cart-outline', label: 'Mua sắm' },
  { icon: 'map-outline', label: 'Tham quan' },
  { icon: 'bus-outline', label: 'Phương tiện' },
];

export default function DhtkMenuDoiTac() {
  const renderCard = ({ item }: { item: Partner }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.text}>⭐ {item.stars} sao</Text>
        <Text style={styles.text}>📍 {item.distance}</Text>
        <Text style={styles.text}>🏨 CSVC: {item.facilityRating.toFixed(1)}</Text>
        <Text style={styles.text}>Dịch vụ: {item.services.join(', ')}</Text>
        <Text style={styles.text}>Phòng còn: {item.availableRooms}</Text>
      </View>
      <View style={styles.cardImageBox}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#007bff' }]}>
            <Text style={styles.btnText}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#28a745' }]}>
            <Text style={styles.btnText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter buttons */}
      <View style={styles.filterRow}>
        {filters.map((f, idx) => (
          <TouchableOpacity key={idx} style={styles.filterBtn}>
            <Ionicons name={f.icon as any} size={24} color="#007bff" />
            <Text style={styles.filterText}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid list */}
      <FlatList
        data={partners}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterBtn: {
    alignItems: 'center',
  },
  filterText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    marginBottom: 2,
  },
  cardImageBox: {
    alignItems: 'center',
    marginLeft: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});
