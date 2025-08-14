import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useColorScheme,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const statusButtons = [
  { label: 'Tất cả', count: 8, icon: 'list' },
  { label: 'Đang chuẩn bị', count: 2, icon: 'timer-outline' },
  { label: 'Đang diễn ra', count: 3, icon: 'play-circle-outline' },
  { label: 'Hoàn thành', count: 3, icon: 'checkmark-circle-outline' },
];

const cardData = [
  {
    id: '1',
    title: 'Tour Đà Lạt',
    status: 'Đang diễn ra',
    progress: 0,
    startDate: '23/07/2025',
    endDate: '30/07/2025',
    features: ['people', 'chatbubble-ellipses', 'help-circle', 'document-text'],
    staff: 3,
    customers: ['Nguyễn A', 'Trần B', 'Lê C'],
    suppliers: ['Công ty X', 'Công ty Y'],
  },
  {
    id: '2',
    title: 'Tour Hà Nội',
    status: 'Đang chuẩn bị',
    progress: 0,
    startDate: '23/07/2025',
    endDate: '30/07/2025',
    features: ['people', 'chatbubble-ellipses', 'help-circle', 'document-text'],
    staff: 3,
    customers: ['Phạm D', 'Hoàng E'],
    suppliers: ['Công ty Z'],
  },
  {
    id: '3',
    title: 'Tour Sài Gòn',
    status: 'Đang chuẩn bị',
    progress: 0,
    startDate: '25/07/2025',
    endDate: '31/07/2025',
    features: ['people', 'chatbubble-ellipses', 'help-circle', 'document-text'],
    staff: 2,
    customers: ['Trần F'],
    suppliers: ['Công ty Y', 'Công ty Z'],
  },
];

export default function DhtkWork() {
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [selectedTour, setSelectedTour] = useState<typeof cardData[0] | null>(null);

  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const filteredData =
    selectedStatus === 'Tất cả'
      ? cardData
      : cardData.filter((item) => item.status === selectedStatus);

  const openDetail = (tour: typeof cardData[0]) => setSelectedTour(tour);
  const closeDetail = () => setSelectedTour(null);

  const renderCard = ({ item }: { item: typeof cardData[0] }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#e6f0ff' },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${item.progress}%`, backgroundColor: '#2196F3' },
          ]}
        />
        <Text style={styles.progressText}>{item.progress}% Tiến độ</Text>
      </View>

      <View style={styles.datesRow}>
        <View style={styles.dateBox}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>Ngày thực hiện</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{item.startDate}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>Ngày kết thúc</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{item.endDate}</Text>
        </View>
      </View>

      <View style={styles.featuresRow}>
        {item.features.map((iconName, idx) => (
          <Ionicons key={idx} name={iconName as any} size={20} color="#2196F3" style={{ marginRight: 8 }} />
        ))}
      </View>

      <View style={styles.staffRow}>
        <Text style={{ color: colors.text }}>Nhân viên phụ trách:</Text>
        <View style={styles.staffIcons}>
          {Array.from({ length: item.staff }).map((_, idx) => (
            <Ionicons key={idx} name="person-circle" size={24} color="#2196F3" style={{ marginRight: 4 }} />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.detailButton} onPress={() => openDetail(item)}>
        <Ionicons name="chevron-forward-circle" size={28} color="#fff" />
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
      <View style={styles.statusContainer}>
        {statusButtons.map((btn) => {
          const isSelected = selectedStatus === btn.label;
          return (
            <TouchableOpacity
              key={btn.label}
              onPress={() => setSelectedStatus(btn.label)}
              style={[
                styles.statusChip,
                { backgroundColor: isSelected ? '#2196F3' : '#e6f0ff' },
              ]}
            >
              <Ionicons
                name={btn.icon as any}
                size={16}
                color={isSelected ? '#fff' : '#2196F3'}
                style={{ marginRight: 6 }}
              />
              <Text style={{ color: isSelected ? '#fff' : '#2196F3', fontSize: 14 }}>
                {btn.label} ({btn.count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal detail */}
      <Modal visible={!!selectedTour} animationType="slide">
        <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
          <TouchableOpacity onPress={closeDetail} style={{ marginBottom: 12 }}>
            <Ionicons name="close-circle" size={28} color="#2196F3" />
          </TouchableOpacity>
          <ScrollView>
            {selectedTour && (
              <>
                <Text style={styles.detailTitle}>{selectedTour.title}</Text>
                <Text>Ngày thực hiện: {selectedTour.startDate}</Text>
                <Text>Ngày kết thúc: {selectedTour.endDate}</Text>

                <Text style={styles.sectionTitle}>Danh sách khách hàng:</Text>
                {selectedTour.customers?.map((c, idx) => (
                  <Text key={idx}>- {c}</Text>
                ))}

                <Text style={styles.sectionTitle}>Danh sách nhà cung ứng:</Text>
                {selectedTour.suppliers?.map((s, idx) => (
                  <Text key={idx}>- {s}</Text>
                ))}

                <Text style={styles.sectionTitle}>Nhân viên phụ trách:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  {Array.from({ length: selectedTour.staff }).map((_, idx) => (
                    <Ionicons key={idx} name="person-circle" size={36} color="#2196F3" style={{ marginRight: 8 }} />
                  ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 }}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={{ color: '#fff' }}>Chat nội bộ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={{ color: '#fff' }}>Bản báo cáo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={{ color: '#fff' }}>Hoạt động ngày</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.actionBtn, { alignSelf: 'center', width: '97%', alignItems: 'center' }]}>
                  <Text style={{ color: '#fff' }}>Cập nhật</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  statusContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
    marginBottom: 8,
    width: '48%',
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  statusTag: { backgroundColor: '#a0e1f5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  statusText: { fontSize: 12, color: '#000' },
  progressBar: { height: 20, borderRadius: 10, backgroundColor: '#cce0ff', marginBottom: 8, overflow: 'hidden', justifyContent: 'center' },
  progressFill: { height: '100%' },
  progressText: { position: 'absolute', alignSelf: 'center', fontSize: 12, color: '#000' },
  datesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dateBox: { flex: 1 },
  dateLabel: { fontSize: 12 },
  dateValue: { fontSize: 14, fontWeight: 'bold' },
  featuresRow: { flexDirection: 'row', marginBottom: 8 },
  staffRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  staffIcons: { flexDirection: 'row', marginLeft: 8 },
  detailButton: { backgroundColor: '#2196F3', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  sectionTitle: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  actionBtn: { backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
});
