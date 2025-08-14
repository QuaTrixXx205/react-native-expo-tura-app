import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function MktMenuProduct() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const filters = ['Tất cả', 'Mới nhất', 'Tour đơn', 'Tour ghép'];

  // Dữ liệu tĩnh các tour
  const tours = [
    {
      id: 1,
      name: 'Đà Lạt Summer Trip',
      type: 'Tour ghép - 3 ngày 2 đêm',
      designer: 'Nguyễn Văn A',
      customer: 'Trần Thị B',
      hotelFood: 'Khách sạn ABC, Ăn 3 bữa',
      locations: 'Thung lũng Tình Yêu, Đồi chè Cầu Đất',
      start: '12/08/2025',
      end: '14/08/2025',
      price: 4500000,
      image: 'https://cdn3.ivivu.com/2023/10/du-lich-Da-Lat-ivivu.jpg',
    },
    {
      id: 2,
      name: 'Hạ Long Bay Cruise',
      type: 'Tour đơn - 2 ngày 1 đêm',
      designer: 'Lê Thị C',
      customer: 'Phạm Văn D',
      hotelFood: 'Khách sạn XYZ, Ăn 2 bữa',
      locations: 'Vịnh Hạ Long',
      start: '15/08/2025',
      end: '16/08/2025',
      price: 3500000,
      image: 'https://vcdn1-dulich.vnecdn.net/2022/05/07/vinhHaLongQuangNinh-1651912066-8789-1651932294.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=bAYE9-ifwt-9mB2amIjnqg',
    },
    {
      id: 3,
      name: 'Sapa Adventure',
      type: 'Tour ghép - 4 ngày 3 đêm',
      designer: 'Trần Văn E',
      customer: 'Nguyễn Thị F',
      hotelFood: 'Khách sạn DEF, Ăn 3 bữa',
      locations: 'Fansipan, Bản Cát Cát',
      start: '20/08/2025',
      end: '23/08/2025',
      price: 5500000,
      image: 'https://thesinhtour.com/en/wp-content/uploads/2017/05/Sapa-tour-1.jpg',
    },
  ];

  const filteredTours =
    selectedFilter === 'Tất cả'
      ? tours
      : tours.filter(t => t.type.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <View style={{padding: 16, backgroundColor: colors.background }}>
      {/* Filter chip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {filters.map((filter, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.chip,
              {
                backgroundColor: selectedFilter === filter ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={{ color: selectedFilter === filter ? '#fff' : colors.text }}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tour cards */}
      <ScrollView style={{ marginBottom: 100 }}>
        {filteredTours.map(tour => (
          <View key={tour.id} style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{tour.name}</Text>
            <Text style={{ color: colors.text, marginBottom: 4 }}>{tour.type}</Text>
            <Text style={{ color: colors.text }}>NVTK: {tour.designer}</Text>
            <Text style={{ color: colors.text }}>Khách hàng: {tour.customer}</Text>
            <Text style={{ color: colors.text }}>Lưu trú & Ăn uống: {tour.hotelFood}</Text>
            <Text style={{ color: colors.text }}>Địa điểm tham quan: {tour.locations}</Text>
            <Text style={{ color: colors.text }}>
              Thời gian: {tour.start} → {tour.end}
            </Text>
            <Text style={{ color: colors.text }}>Thành giá: {tour.price.toLocaleString()} VNĐ</Text>

            {/* Hình ảnh */}
            <Image
              source={{ uri: tour.image }}
              style={{ width: '100%', height: 150, borderRadius: 8, marginVertical: 8 }}
              resizeMode="cover"
            />

            {/* Nút hành động */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#fff' }}>Liên lạc</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]}>
                <Text style={{ color: '#fff' }}>Xem chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FF8C00' }]}>
                <Text style={{ color: '#fff' }}>Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    minWidth: 60,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
