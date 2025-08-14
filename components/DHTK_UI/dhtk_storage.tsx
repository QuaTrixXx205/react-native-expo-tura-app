import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const menuItems = ['Tất cả', 'Tour ghép', 'Tour lẻ'];

const sampleData = [
  {
    id: '1',
    code: 'DL234-56S',
    startDate: '13/08/2025',
    endDate: '17/08/2025',
    guests: 12,
    staff: 'Nguyễn Văn A',
    icons: ['airplane', 'bus', 'restaurant', 'headset'],
  },
  {
    id: '2',
    code: 'HN987-12T',
    startDate: '20/08/2025',
    endDate: '22/08/2025',
    guests: 8,
    staff: 'Trần Thị B',
    icons: ['bus', 'restaurant'],
  },
  {
    id: '3',
    code: 'SG123-45L',
    startDate: '25/08/2025',
    endDate: '28/08/2025',
    guests: 15,
    staff: 'Lê Văn C',
    icons: ['airplane', 'headset'],
  },
];

export default function DhtkStorage() {
  const [selectedMenu, setSelectedMenu] = useState('Tất cả');
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const filteredData =
    selectedMenu === 'Tất cả'
      ? sampleData
      : sampleData.filter((item, idx) =>
          selectedMenu === 'Tour ghép' ? idx % 2 === 0 : idx % 2 !== 0
        );

  const renderCard = ({ item }: { item: typeof sampleData[0] }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#f0f4f7' },
      ]}
    >
      <Text
        style={[styles.codeText, { color: colors.text }]}
      >
        {item.code}
      </Text>
      <Text style={{ color: colors.text }}>
        Thời gian: {item.startDate} - {item.endDate}
      </Text>
      <Text style={{ color: colors.text }}>Số lượng khách: {item.guests}</Text>
      <Text style={{ color: colors.text }}>
        Nhân viên điều hành: {item.staff}
      </Text>
      <View style={styles.iconRow}>
        {item.icons.map((icon, idx) => (
          <Ionicons
            key={idx}
            name={icon as any}
            size={24}
            color="#2196F3"
            style={{ marginRight: 8 }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? '#252222ff' : '#fff' },
      ]}
    >
      {/* Menu Chip - cố định */}
      <View style={styles.menuRow}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedMenu === item ? '#2196F3' : 'transparent',
                borderColor: '#2196F3',
              },
            ]}
            onPress={() => setSelectedMenu(item)}
          >
            <Text
              style={{
                color: selectedMenu === item ? '#fff' : colors.text,
                fontWeight: '500',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  codeText: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  iconRow: { flexDirection: 'row', marginVertical: 8 },
  detailButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
});
