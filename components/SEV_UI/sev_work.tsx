import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Customer = {
  id: string;
  name: string;
  gender: "Nam" | "Nữ";
  phone: string;
  cccd: string;
  note?: string;
};

type Tour = {
  id: string;
  title: string;
  code: string;
  date: string;
  quantity: number;
  services: string[];
  customers: Customer[];
};

const DATA: Tour[] = [
  {
    id: "1",
    title: "Tour Hà Nội - Hạ Long",
    code: "T001",
    date: "20/09/2025 - 22/09/2025",
    quantity: 25,
    services: ["Ăn uống", "Lưu trú", "Tham quan", "Mua sắm"],
    customers: [
      {
        id: "c1",
        name: "Nguyễn Văn A",
        gender: "Nam",
        phone: "0901234567",
        cccd: "123456789",
      },
      {
        id: "c2",
        name: "Trần Thị B",
        gender: "Nữ",
        phone: "0912345678",
        cccd: "987654321",
        note: "Ăn chay",
      },
    ],
  },
  {
    id: "2",
    title: "Tour Đà Nẵng - Hội An",
    code: "T002",
    date: "25/09/2025 - 28/09/2025",
    quantity: 30,
    services: ["Ăn uống", "Vui chơi", "Lưu trú"],
    customers: [
      {
        id: "c3",
        name: "Phạm Văn C",
        gender: "Nam",
        phone: "0933333333",
        cccd: "456123789",
      },
    ],
  },
  {
    id: "3",
    title: "Tour Sài Gòn - Cần Thơ",
    code: "T003",
    date: "05/10/2025 - 07/10/2025",
    quantity: 20,
    services: ["Ăn uống", "Tham quan", "Du thuyền"],
    customers: [
      { id: "c4", name: "Lê Thị D", gender: "Nữ", phone: "0988888881", cccd: "321654987" },
      { id: "c5", name: "Hoàng Văn E", gender: "Nam", phone: "0977777772", cccd: "654987321" },
    ],
  },
  {
    id: "4",
    title: "Tour Nha Trang - Đà Lạt",
    code: "T004",
    date: "10/10/2025 - 14/10/2025",
    quantity: 35,
    services: ["Ăn uống", "Lưu trú", "Mua sắm", "Spa"],
    customers: [
      { id: "c6", name: "Ngô Thị F", gender: "Nữ", phone: "0911111111", cccd: "888999111", note: "Không ăn hải sản" },
      { id: "c7", name: "Đỗ Văn G", gender: "Nam", phone: "0944444444", cccd: "111222333" },
    ],
  },
  {
    id: "5",
    title: "Tour Phú Quốc",
    code: "T005",
    date: "15/10/2025 - 18/10/2025",
    quantity: 28,
    services: ["Ăn uống", "Lặn biển", "Giải trí"],
    customers: [
      { id: "c8", name: "Nguyễn Thị H", gender: "Nữ", phone: "0939999999", cccd: "444555666" },
      { id: "c9", name: "Phan Văn I", gender: "Nam", phone: "0922222222", cccd: "777888999", note: "Bị dị ứng bụi" },
    ],
  },
  {
    id: "6",
    title: "Tour Hà Giang",
    code: "T006",
    date: "20/10/2025 - 24/10/2025",
    quantity: 18,
    services: ["Ăn uống", "Leo núi", "Tham quan"],
    customers: [
      { id: "c10", name: "Lương Văn J", gender: "Nam", phone: "0912340000", cccd: "121314151" },
      { id: "c11", name: "Mai Thị K", gender: "Nữ", phone: "0965656565", cccd: "212223224" },
    ],
  },
  {
    id: "7",
    title: "Tour Sapa - Lào Cai",
    code: "T007",
    date: "28/10/2025 - 31/10/2025",
    quantity: 22,
    services: ["Ăn uống", "Leo núi Fansipan", "Chợ phiên"],
    customers: [
      { id: "c12", name: "Ngô Văn L", gender: "Nam", phone: "0905555555", cccd: "313233334" },
      { id: "c13", name: "Đặng Thị M", gender: "Nữ", phone: "0933334444", cccd: "414243444" },
    ],
  },
  {
    id: "8",
    title: "Tour Huế - Quảng Bình",
    code: "T008",
    date: "02/11/2025 - 05/11/2025",
    quantity: 27,
    services: ["Ăn uống", "Tham quan di tích", "Lưu trú"],
    customers: [
      { id: "c14", name: "Trần Văn N", gender: "Nam", phone: "0971111111", cccd: "515253545" },
      { id: "c15", name: "Phạm Thị O", gender: "Nữ", phone: "0982222222", cccd: "616263646", note: "Mang theo trẻ nhỏ" },
    ],
  },
  {
    id: "9",
    title: "Tour Côn Đảo",
    code: "T009",
    date: "10/11/2025 - 13/11/2025",
    quantity: 16,
    services: ["Ăn uống", "Tham quan", "Tâm linh"],
    customers: [
      { id: "c16", name: "Đỗ Văn P", gender: "Nam", phone: "0910000000", cccd: "717273747" },
      { id: "c17", name: "Vũ Thị Q", gender: "Nữ", phone: "0921111111", cccd: "818283848" },
    ],
  },
  {
    id: "10",
    title: "Tour Tây Nguyên",
    code: "T010",
    date: "18/11/2025 - 22/11/2025",
    quantity: 24,
    services: ["Ăn uống", "Cồng chiêng", "Tham quan"],
    customers: [
      { id: "c18", name: "Nguyễn Văn R", gender: "Nam", phone: "0961111111", cccd: "919293949" },
      { id: "c19", name: "Đào Thị S", gender: "Nữ", phone: "0931234567", cccd: "101102103", note: "Không uống bia" },
    ],
  },
  {
    id: "11",
    title: "Tour Mũi Né - Bình Thuận",
    code: "T011",
    date: "25/11/2025 - 27/11/2025",
    quantity: 19,
    services: ["Ăn uống", "Lướt ván", "Nghỉ dưỡng"],
    customers: [
      { id: "c20", name: "Phạm Văn T", gender: "Nam", phone: "0941231234", cccd: "111213141" },
      { id: "c21", name: "Lê Thị U", gender: "Nữ", phone: "0919191919", cccd: "151617181" },
    ],
  },
  {
    id: "12",
    title: "Tour Miền Tây Sông Nước",
    code: "T012",
    date: "01/12/2025 - 04/12/2025",
    quantity: 26,
    services: ["Ăn uống", "Tham quan chợ nổi", "Lưu trú"],
    customers: [
      { id: "c22", name: "Nguyễn Văn V", gender: "Nam", phone: "0988881111", cccd: "192021222" },
      { id: "c23", name: "Trịnh Thị W", gender: "Nữ", phone: "0977778888", cccd: "232425262" },
    ],
  },
];

export default function SevWork() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<"all" | "today" | "upcoming">("all");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderChip = (label: string, value: "all" | "today" | "upcoming") => (
    <TouchableOpacity
      key={value}
      style={[
        styles.chip,
        {
          backgroundColor: filter === value ? colors.primary : colors.card,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={{
          color: filter === value ? "#fff" : colors.text,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Menu chip */}
      <View style={styles.chipRow}>
        {renderChip("Tất cả", "all")}
        {renderChip("Hôm nay", "today")}
        {renderChip("Sắp tới", "upcoming")}
      </View>

      {/* List Tour */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedCards.includes(item.id);
          return (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              {/* Title */}
              <Text style={[styles.title, { color: colors.primary }]}>
                {item.title}
              </Text>

              {/* Info */}
              <Text style={{ color: colors.text }}>Mã tour: {item.code}</Text>
              <Text style={{ color: colors.text }}>Thời gian: {item.date}</Text>
              <Text style={{ color: colors.text }}>
                Số lượng khách: {item.quantity}
              </Text>
              <Text style={{ color: colors.text }}>
                Dịch vụ: {item.services.join(", ")}
              </Text>

              {/* Button xem chi tiết */}
              <TouchableOpacity
                style={[
                  styles.detailButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => toggleExpand(item.id)}
              >
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#fff"
                />
                <Text style={{ color: "#fff", marginLeft: 5 }}>
                  {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                </Text>
              </TouchableOpacity>

              {/* Danh sách khách hàng */}
              {isExpanded && (
                <View style={styles.customerList}>
                  <Text style={[styles.subTitle, { color: colors.primary }]}>
                    Danh sách khách hàng
                  </Text>
                  {item.customers.map((c, index) => (
                    <View
                      key={c.id}
                      style={[
                        styles.customerItem,
                        { borderColor: colors.border },
                      ]}
                    >
                      <Text style={[styles.customerText, { color: colors.text }]}>
                        {index + 1}. {c.name}
                      </Text>
                      <View style={styles.customerRow}>
                        <Ionicons
                          name={c.gender === "Nữ" ? "female" : "male"}
                          size={16}
                          color={c.gender === "Nữ" ? "pink" : "#2196F3"}
                        />
                        <Text style={[styles.customerText, { color: colors.text }]}>
                          {c.gender}
                        </Text>
                      </View>
                      <Text style={[styles.customerText, { color: colors.text }]}>
                        SĐT: {c.phone}
                      </Text>
                      <Text style={[styles.customerText, { color: colors.text }]}>
                        CCCD: {c.cccd}
                      </Text>
                      {c.note && (
                        <Text
                          style={[styles.customerText, { color: colors.text }]}
                        >
                          Ghi chú: {c.note}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        }}
        extraData={expandedCards}
        contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
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
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  customerList: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  customerItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  customerText: {
    fontSize: 14,
    marginLeft: 6,
  },
});
