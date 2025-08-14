import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DhtkMenuThietKe() {
  return (
    <ScrollView style={styles.container}>

      {/* Bộ filter nút tròn */}
      <View style={styles.filterRow}>
        {['Tất cả', 'Gần đây', 'Tour đơn', 'Tour ghép'].map((label, i) => (
          <TouchableOpacity key={i} style={[styles.filterButton, i === 1 && styles.filterActive]}>
            <Text style={[styles.filterText, i === 1 && styles.filterTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Thẻ tour */}
      <View style={styles.card}>
        <Text style={styles.tourCode}>
          Mã DL567 - 98B <Ionicons name="qr-code-outline" size={20} />
        </Text>
        <Text style={styles.tourName}>Tour Singapore 4N3D</Text>

        {/* Thông tin chính */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Thời gian</Text>
            <Text>01/08 - 05/08</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Số lượng</Text>
            <Text>25</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Giá tour</Text>
            <Text>10.000.000</Text>
          </View>
        </View>

        {/* Lịch trình */}
        <Text style={styles.sectionTitle}>Lịch trình chi tiết</Text>
        <View style={styles.scheduleItem}>
          <Text style={styles.dayLabel}>Ngày 1, 01/08</Text>
          <Text>06:00 - Tại VP công ty</Text>
          <Text>08:30 - Sân bay Tân Sơn Nhất</Text>
          <Text>12:00 - Ăn trưa</Text>
          <Text>15:00 - Vườn Quốc Gia</Text>
        </View>

        {/* Nút hành động */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text>Chi tiết chi phí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text>Xem báo cáo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text>Danh sách</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Đăng tải</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEFFF',
    padding: 10
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#cfd8dc',
    marginRight: 8
  },
  filterActive: {
    backgroundColor: '#4285F4'
  },
  filterText: {
    color: '#000'
  },
  filterTextActive: {
    color: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },
  tourCode: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  tourName: {
    backgroundColor: '#f1f1f1',
    padding: 4,
    borderRadius: 5,
    marginBottom: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  infoBox: {
    flex: 1,
    alignItems: 'center'
  },
  infoLabel: {
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 6
  },
  scheduleItem: {
    marginBottom: 10
  },
  dayLabel: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  actionButton: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
