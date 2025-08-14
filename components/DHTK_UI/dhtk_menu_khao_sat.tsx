import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Tour = {
  id: string;
  name: string;
  time: string;
  dieuHanh: string;
  huongDanVien: string;
  dichVu: string;
  image: string;
};

const DATA: Tour[] = [
  {
    id: '1',
    name: 'Tour Đà Lạt - DL567',
    time: '01/08 - 05/08',
    dieuHanh: 'Nguyễn Văn A',
    huongDanVien: 'Trần Thị B',
    dichVu: 'Khách sạn 4 sao, Ăn sáng, Vé tham quan',
    image: 'https://picsum.photos/100',
  },
  {
    id: '2',
    name: 'Tour Sapa - SP123',
    time: '10/08 - 15/08',
    dieuHanh: 'Phạm Văn C',
    huongDanVien: 'Lê Thị D',
    dichVu: 'Resort 5 sao, Ăn buffet, Xe đưa đón',
    image: 'https://picsum.photos/101',
  },
];

export default function DhtkMenuKhaoSat() {
  const [filter, setFilter] = useState<'all' | 'progress' | 'done'>('all');

  const renderCard = ({ item }: { item: Tour }) => (
    <View style={styles.card}>
      {/* Nội dung và hình */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>Thời gian: {item.time}</Text>
          <Text style={styles.text}>Nhân viên điều hành: {item.dieuHanh}</Text>
          <Text style={styles.text}>Hướng dẫn viên: {item.huongDanVien}</Text>
          <Text style={styles.text}>Dịch vụ: {item.dichVu}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      {/* Nút Theo dõi */}
      <TouchableOpacity style={styles.followBtn}>
        <Ionicons
          name="eye-outline"
          size={18}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: '#fff', fontSize: 14 }}>Theo dõi</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      {/* Bộ lọc */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'all' && styles.activeBtn]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeText,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'progress' && styles.activeBtn]}
          onPress={() => setFilter('progress')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'progress' && styles.activeText,
            ]}
          >
            Đang tiến hành
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'done' && styles.activeBtn]}
          onPress={() => setFilter('done')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'done' && styles.activeText,
            ]}
          >
            Đã hoàn thành
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách */}
      <FlatList<Tour>
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
  },
  activeBtn: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  activeText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  text: { fontSize: 14, marginBottom: 2, color: '#555' },
  rightBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 10,
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },

});
