import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function HdvReport() {
  const { colors, dark } = useTheme();

  // Dữ liệu tĩnh
  const reportData = {
    date: 'Ngày 1 - Hà Giang (26/07)',
    diChuyen: 'Đúng giờ',
    anUong: 'Thiếu phần chay',
    diemThamQuan: '-',
    luuTru: 'Đủ phòng',
    phanHoi: 'Khách say xe nhẹ - đã hỗ trợ thuốc',
    hinhAnh: 'Tải ảnh từ thư viện'
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Chọn ngày chặng:</Text>
      <View style={[styles.dateBox, { backgroundColor: dark ? '#444' : '#e6f0ff' }]}>
        <Text style={{ color: colors.text }}>{reportData.date}</Text>
        <Ionicons name="chevron-down" size={20} color={colors.text} />
      </View>

      <View style={[styles.card, { backgroundColor: dark ? '#555' : '#e6f0ff' }]}>
        {/* Di chuyển */}
        <View style={styles.row}>
          <Ionicons name="train" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Di chuyển</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.diChuyen}</Text>
        <View style={[styles.separator, { backgroundColor: dark ? '#777' : '#ccc' }]} />

        {/* Ăn uống */}
        <View style={styles.row}>
          <Ionicons name="restaurant" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Ăn uống</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.anUong}</Text>
        <View style={[styles.separator, { backgroundColor: dark ? '#777' : '#ccc' }]} />

        {/* Điểm tham quan */}
        <View style={styles.row}>
          <Ionicons name="map" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Điểm tham quan</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.diemThamQuan}</Text>
        <View style={[styles.separator, { backgroundColor: dark ? '#777' : '#ccc' }]} />

        {/* Lưu trú */}
        <View style={styles.row}>
          <Ionicons name="home" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Lưu trú</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.luuTru}</Text>
        <View style={[styles.separator, { backgroundColor: dark ? '#777' : '#ccc' }]} />

        {/* Phản hồi khách hàng */}
        <View style={styles.row}>
          <Ionicons name="chatbox-ellipses" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Phản hồi khách hàng</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.phanHoi}</Text>
        <View style={[styles.separator, { backgroundColor: dark ? '#777' : '#ccc' }]} />

        {/* Hình ảnh đính kèm */}
        <View style={styles.row}>
          <Ionicons name="camera" size={20} style={[styles.icon, { color: colors.text }]} />
          <Text style={[styles.heading, { color: colors.text }]}>Hình ảnh đính kèm</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>{reportData.hinhAnh}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.reportButton]}>
          <Text style={styles.buttonText}>+ BÁO CÁO SỰ CỐ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>LƯU</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.summaryButton}>
        <Text style={styles.summaryText}>TỔNG KẾT TOUR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15
  },
  card: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    marginRight: 8
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16
  },
  text: {
    marginLeft: 28,
    marginVertical: 3
  },
  separator: {
    height: 1,
    marginVertical: 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5
  },
  reportButton: {
    backgroundColor: '#0d6efd'
  },
  saveButton: {
    backgroundColor: '#3399ff'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  summaryButton: {
    backgroundColor: '#3399ff',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center'
  },
  summaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
