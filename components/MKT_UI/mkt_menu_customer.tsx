import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function MktMenuCustomer() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const filters = ['Tất cả', 'Gần đây', 'Tour đơn', 'Tour ghép'];

  // Dữ liệu tĩnh các tour và khách
  const tours = [
    {
      id: 1,
      title: 'Đà Lạt Summer Trip',
      guestsCount: 10,
      customers: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Khách ${i + 1}`,
        info: `Tuổi: ${20 + i}, Giới tính: ${i % 2 === 0 ? 'Nam' : 'Nữ'}`,
        hobbies: i % 2 === 0 ? 'Đi phượt, Ăn uống' : 'Chụp ảnh, Yoga',
        history: i % 2 === 0 ? 'Tham gia 2 tour trước' : 'Chưa tham gia tour',
        channel: i % 2 === 0 ? 'Facebook' : 'Zalo',
      })),
    },
    {
      id: 2,
      title: 'Hạ Long Bay Cruise',
      guestsCount: 8,
      customers: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `Khách ${i + 1}`,
        info: `Tuổi: ${25 + i}, Giới tính: ${i % 2 === 0 ? 'Nam' : 'Nữ'}`,
        hobbies: i % 2 === 0 ? 'Câu cá, Nghe nhạc' : 'Chụp ảnh, Yoga',
        history: i % 2 === 0 ? 'Tham gia 3 tour trước' : 'Tham gia 1 tour',
        channel: i % 2 === 0 ? 'Facebook' : 'Zalo',
      })),
    },
  ];

  return (
    <View style={{padding: 16, backgroundColor: colors.background }}>
      {/* Menu chip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
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

      {/* Danh sách tour */}
      <ScrollView>
        {tours.map(tour => (
          <View key={tour.id} style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{tour.title}</Text>
            <Text style={{ color: colors.text, marginBottom: 8 }}>Số lượng khách: {tour.guestsCount}</Text>

            {/* Danh sách khách hàng vuốt ngang */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tour.customers.map(customer => (
                <View
                  key={customer.id}
                  style={{
                    width: 200,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 8,
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontWeight: '600', color: colors.text }}>{customer.name}</Text>
                  <Text style={{ color: colors.text }}>Thông tin: {customer.info}</Text>
                  <Text style={{ color: colors.text }}>Sở thích: {customer.hobbies}</Text>
                  <Text style={{ color: colors.text }}>Lịch sử: {customer.history}</Text>
                  <Text style={{ color: colors.text }}>Kênh: {customer.channel}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Nút lưu */}
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary, marginTop: 8 }]}>
              <Ionicons name="save-outline" size={16} color="#fff" style={{ marginRight: 4 }} />
              <Text style={{ color: '#fff' }}>Lưu</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    minWidth: 60,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
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
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
