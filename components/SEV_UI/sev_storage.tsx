import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Status = "Đã xác nhận" | "Đã đặt cọc" | "Đã hoàn thành";

interface Order {
  id: string;
  code: string;
  date: string;
  company: string;
  value: string;
  status: Status;
  progress: number; // %
}

const DATA: Order[] = [
  {
    id: "1",
    code: "ORD-001",
    date: "20/9/2025 - 22/9/2025",
    company: "SaigonTourist",
    value: "120,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 30,
  },
  {
    id: "2",
    code: "ORD-002",
    date: "25/9/2025 - 28/9/2025",
    company: "Lửa Việt",
    value: "85,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 60,
  },
  {
    id: "3",
    code: "ORD-003",
    date: "10/10/2025 - 15/10/2025",
    company: "Suntravel",
    value: "200,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "4",
    code: "ORD-004",
    date: "01/11/2025 - 05/11/2025",
    company: "Saigontourist",
    value: "150,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 40,
  },
  {
    id: "5",
    code: "ORD-005",
    date: "12/11/2025 - 15/11/2025",
    company: "Hanoitourist",
    value: "95,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 55,
  },
  {
    id: "6",
    code: "ORD-006",
    date: "20/11/2025 - 25/11/2025",
    company: "Vietnam Travel",
    value: "210,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "7",
    code: "ORD-007",
    date: "05/12/2025 - 10/12/2025",
    company: "Fiditour",
    value: "180,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 35,
  },
  {
    id: "8",
    code: "ORD-008",
    date: "15/12/2025 - 20/12/2025",
    company: "TST Tourist",
    value: "125,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 65,
  },
  {
    id: "9",
    code: "ORD-009",
    date: "22/12/2025 - 25/12/2025",
    company: "BenThanh Tourist",
    value: "75,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "10",
    code: "ORD-010",
    date: "02/1/2026 - 06/1/2026",
    company: "Hồng Ngọc Hà Travel",
    value: "135,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 25,
  },
  {
    id: "11",
    code: "ORD-011",
    date: "08/1/2026 - 12/1/2026",
    company: "Viettour",
    value: "160,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 50,
  },
  {
    id: "12",
    code: "ORD-012",
    date: "18/1/2026 - 22/1/2026",
    company: "Golden Smile Travel",
    value: "220,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "13",
    code: "ORD-013",
    date: "01/2/2026 - 05/2/2026",
    company: "Phuong Nam Travel",
    value: "110,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 45,
  },
  {
    id: "14",
    code: "ORD-014",
    date: "10/2/2026 - 14/2/2026",
    company: "Vietcharm",
    value: "98,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 70,
  },
  {
    id: "15",
    code: "ORD-015",
    date: "18/2/2026 - 22/2/2026",
    company: "Lữ Hành ABC",
    value: "175,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "16",
    code: "ORD-016",
    date: "01/3/2026 - 06/3/2026",
    company: "Nam A Travel",
    value: "140,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 20,
  },
  {
    id: "17",
    code: "ORD-017",
    date: "10/3/2026 - 15/3/2026",
    company: "Du Lịch Việt",
    value: "190,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 55,
  },
  {
    id: "18",
    code: "ORD-018",
    date: "20/3/2026 - 25/3/2026",
    company: "An Bình Tourist",
    value: "205,000,000 VNĐ",
    status: "Đã hoàn thành",
    progress: 100,
  },
  {
    id: "19",
    code: "ORD-019",
    date: "05/4/2026 - 10/4/2026",
    company: "Happy Travel",
    value: "130,000,000 VNĐ",
    status: "Đã xác nhận",
    progress: 30,
  },
  {
    id: "20",
    code: "ORD-020",
    date: "15/4/2026 - 20/4/2026",
    company: "Tân Cảng Travel",
    value: "95,000,000 VNĐ",
    status: "Đã đặt cọc",
    progress: 60,
  },
];


export default function SevStorage() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string>("Tất cả");

  const filteredData =
    selected === "Tất cả" ? DATA : DATA.filter((item) => item.status === selected);

  const chips: (string | Status)[] = ["Tất cả", "Đã hoàn thành", "Đã đặt cọc", "Đã xác nhận"];

  const getStatusColor = (progress: number) => {
    if (progress === 100) return "#2e7d32"; // xanh lá
    if (progress >= 50) return "#f9a825"; // vàng
    return "#0277bd"; // xanh dương
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Menu Chip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipContainer}
      >
        {chips.map((chip) => (
          <TouchableOpacity
            key={chip}
            onPress={() => setSelected(chip)}
            style={[
              styles.chip,
              {
                backgroundColor: selected === chip ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: selected === chip ? "#fff" : colors.text,
                fontWeight: "600",
              }}
            >
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Card List */}
      <ScrollView style={{ flex: 1 }}>
        {filteredData.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <View style={styles.row}>
              <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
              <Text style={[styles.title, { color: colors.primary }]}>
                {item.code}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={18} color={colors.text} />
              <Text style={{ color: colors.text, marginLeft: 6 }}>{item.date}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="business-outline" size={18} color={colors.text} />
              <Text style={{ color: colors.text, marginLeft: 6 }}>{item.company}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="cash-outline" size={18} color={colors.text} />
              <Text style={{ color: colors.text, fontWeight: "bold", marginLeft: 6 }}>
                {item.value}
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${item.progress}%`,
                    backgroundColor: getStatusColor(item.progress),
                  },
                ]}
              />
            </View>
            <View style={styles.rowEnd}>
              <Ionicons
                name="time-outline"
                size={16}
                color={getStatusColor(item.progress)}
              />
              <Text style={{ color: colors.text, marginLeft: 4 }}>
                {item.status} - {item.progress}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  chipContainer: {
    flexGrow: 0,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  card: {
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rowEnd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  progressContainer: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    marginTop: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 6,
  },
});
