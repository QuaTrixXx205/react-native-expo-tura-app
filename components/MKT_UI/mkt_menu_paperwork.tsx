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

export default function MktMenuPaperwork() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const filters = ['Tất cả', 'Chờ duyệt', 'Đã ký', 'Đã gửi', 'Đã hủy'];

  // Dữ liệu mẫu biểu mẫu
  const forms = [
    {
      id: 1,
      name: 'Hợp đồng Tour Đà Lạt',
      content: 'Nội dung biểu mẫu: Tự động, chỉnh sửa',
      terms: ['Điều khoản A', 'Điều khoản B', 'Điều khoản C'],
      signature: 'Nguyễn Văn A',
    },
    {
      id: 2,
      name: 'Biểu mẫu Tour Hạ Long',
      content: 'Nội dung biểu mẫu: Tự động, chỉnh sửa',
      terms: ['Điều khoản X', 'Điều khoản Y'],
      signature: 'Trần Thị B',
    },
  ];

  return (
    <View style={{ padding: 16, backgroundColor: colors.background }}>
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

      {/* Danh sách biểu mẫu */}
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {forms.map(form => (
          <View key={form.id} style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{form.name}</Text>
            <Text style={{ color: colors.text, marginVertical: 4 }}>{form.content}</Text>

            <View style={{ marginVertical: 4 }}>
              <Text style={{ fontWeight: '600', color: colors.text }}>Điều khoản bắt buộc:</Text>
              {form.terms.map((term, idx) => (
                <Text key={idx} style={{ color: colors.text, marginLeft: 8 }}>• {term}</Text>
              ))}
            </View>

            <Text style={{ marginTop: 4, color: colors.text }}>
              Chữ ký điện tử: {form.signature}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                <Ionicons name="document-outline" size={16} color="#fff" style={{ marginRight: 4 }} />
                <Text style={{ color: '#fff' }}>Xuất PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#28a745', marginLeft: 8 }]}
              >
                <Ionicons name="share-social-outline" size={16} color="#fff" style={{ marginRight: 4 }} />
                <Text style={{ color: '#fff' }}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Nút thêm biểu mẫu */}
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 4 }} />
          <Text style={{ color: '#fff', fontWeight: '600' }}>Thêm biểu mẫu</Text>
        </TouchableOpacity>
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
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
});
