import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const menuItems = ['Tất cả', 'Học sinh', 'Nhân viên', 'Tour'];

const notifications = [
  {
    id: '1',
    logo: require('@/assets/images/tura-logo.png'),
    message: 'Tour Đà Lạt sẽ bắt đầu vào 23/07/2025',
    date: 'Thứ 4, 23/07/2025',
  },
  {
    id: '2',
    logo: require('@/assets/images/tura-logo.png'),
    message: 'Nguyễn Văn A đã đăng ký Tour Hà Nội',
    date: 'Thứ 7, 20/07/2025',
  },
  {
    id: '3',
    logo: require('@/assets/images/tura-logo.png'),
    message: 'Tour Sài Gòn đã hoàn tất báo cáo',
    date: 'Thứ 2, 31/07/2025',
  },
];

export default function DhtkNotification() {
  const [selectedMenu, setSelectedMenu] = useState('Tất cả');
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const filteredData =
    selectedMenu === 'Tất cả'
      ? notifications
      : notifications.filter((_, idx) =>
        selectedMenu === 'Học sinh' ? idx % 2 === 0 : idx % 2 !== 0
      );

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#f0f4f7' },
      ]}
    >
      <View style={styles.row}>
        <Image source={item.logo} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.message, { color: colors.text }]}>{item.message}</Text>
          <Text style={[styles.date, { color: colors.text }]}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#252222ff' : '#fff' }]}
    >
      {/* Menu Chip */}
      <View style={styles.menuRow}>
        {menuItems.map((item) => {
          const isSelected = selectedMenu === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? '#2196F3' : 'transparent',
                  borderColor: '#2196F3',
                },
              ]}
              onPress={() => setSelectedMenu(item)}
            >
              <Text style={{ color: isSelected ? '#fff' : colors.text, fontWeight: '500' }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notification Cards */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  menuRow: { flexDirection: 'row', marginBottom: 16 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, marginRight: 12, borderRadius: 8, resizeMode: 'contain' },
  message: { fontSize: 14, marginBottom: 4 },
  date: { fontSize: 12, color: '#888' },
});
