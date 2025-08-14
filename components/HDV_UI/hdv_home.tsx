import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HdvHome() {
  const { colors } = useTheme();

  const schedules = [
    {
      id: 1,
      startTime: '08:30',
      location: 'Sân bay Tân Sơn Nhất',
      dateRange: '13/08/2025 - 16/08/2025',
      guests: 25,
      checkedIn: 20,
      image:
        'https://dichung.vn/wp-content/uploads/2020/08/Thi%E1%BA%BFt-k%E1%BA%BF-kh%C3%B4ng-t%C3%AAn-2020-08-22T145821.095.jpg',
    },
    {
      id: 2,
      startTime: '10:00',
      location: 'Khách sạn Rex',
      dateRange: '13/08/2025 - 16/08/2025',
      guests: 30,
      checkedIn: 28,
      image:
        'https://www.rexhotelsaigon.com/wp-content/uploads/sites/174/2017/08/DSC01288-1-FINISH.jpg',
    },
    {
      id: 3,
      startTime: '14:00',
      location: 'Bảo tàng Hồ Chí Minh',
      dateRange: '13/08/2025 - 16/08/2025',
      guests: 20,
      checkedIn: 19,
      image:
        'https://cdn.tienphong.vn/images/a6bf4f60924201126af6849ca45a3980e16d134b23ea33303d2993c30166faab6b152b7a45e600f357e93970318a02c6965d7cbc845c9b530642e994e1d0a1d3b93ea1e9c383afa69156fd07d937097a/tau-latoche-05-2096-914-8336.jpg',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        Lịch trình hôm nay của bạn
      </Text>

      {schedules.map((schedule) => (
        <View
          key={schedule.id}
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.border }]}
        >
          {/* Nội dung bên trái */}
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
              <Text style={[styles.text, styles.bold, { color: colors.text }]}>
                {schedule.startTime}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={18} color={colors.primary} />
              <Text style={[styles.text, { color: colors.text }]}>{schedule.location}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              <Text style={[styles.text, { color: colors.text }]}>{schedule.dateRange}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="people-outline" size={18} color={colors.primary} />
              <Text style={[styles.text, { color: colors.text }]}>Đoàn khách: {schedule.guests}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="checkmark-circle-outline" size={18} color={colors.primary} />
              <Text style={[styles.text, { color: colors.text }]}>Điểm danh: {schedule.checkedIn}</Text>
            </View>
          </View>

          {/* Hình ảnh bên phải */}
          <Image
            source={{ uri: schedule.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    flex: 1,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginLeft: 10,
  },
});
