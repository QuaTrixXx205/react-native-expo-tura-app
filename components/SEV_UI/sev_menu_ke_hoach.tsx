import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    title: "Đoàn Vietravel - 224",
    code: "224-51",
    date: "20/9/2025 - 22/9/2025",
    people: "42 (38A - 4C)",
    services: "Ăn uống - Lưu trú",
  },
  {
    id: "2",
    title: "Đoàn Lửa Việt - 071",
    code: "071-22",
    date: "20/9/2025",
    people: "45 (45A)",
    services: "Ăn uống",
  },
  {
    id: "3",
    title: "Đoàn Suntravel - 109",
    code: "109-55",
    date: "22/9/2025 - 23/9/2025",
    people: "96 (80A - 16C)",
    services: "Ăn uống - Lưu trú",
  },
  {
    id: "4",
    title: "Đoàn Saigontourist - 332",
    code: "332-18",
    date: "25/9/2025 - 27/9/2025",
    people: "60 (55A - 5C)",
    services: "Lưu trú",
  },
  {
    id: "5",
    title: "Đoàn Fiditour - 411",
    code: "411-09",
    date: "28/9/2025 - 30/9/2025",
    people: "35 (30A - 5C)",
    services: "Ăn uống - Lưu trú",
  },
  {
    id: "6",
    title: "Đoàn Bến Thành - 503",
    code: "503-44",
    date: "1/10/2025 - 3/10/2025",
    people: "50 (48A - 2C)",
    services: "Ăn uống",
  },
  {
    id: "7",
    title: "Đoàn Hanoitourist - 278",
    code: "278-15",
    date: "2/10/2025 - 5/10/2025",
    people: "70 (65A - 5C)",
    services: "Ăn uống - Lưu trú",
  },
  {
    id: "8",
    title: "Đoàn Phú Quốc Travel - 199",
    code: "199-77",
    date: "6/10/2025 - 8/10/2025",
    people: "28 (25A - 3C)",
    services: "Lưu trú",
  },
  {
    id: "9",
    title: "Đoàn Đất Việt - 350",
    code: "350-88",
    date: "10/10/2025 - 12/10/2025",
    people: "55 (50A - 5C)",
    services: "Ăn uống",
  },
  {
    id: "10",
    title: "Đoàn Saigon Travel - 412",
    code: "412-63",
    date: "15/10/2025 - 18/10/2025",
    people: "90 (85A - 5C)",
    services: "Ăn uống - Lưu trú",
  },
];

const FILTERS = ["Tất cả", "Lưu trú", "Ăn uống"];

export default function SevMenuKeHoach() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");

  const filteredData = useMemo(() => {
    if (selectedFilter === "Tất cả") return DATA;
    return DATA.filter((item) => item.services.includes(selectedFilter));
  }, [selectedFilter]);

  const renderChip = (label: string) => {
    const isActive = selectedFilter === label;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.chip,
          {
            backgroundColor: isActive ? "#1976D2" : colors.card,
            borderColor: "#1976D2",
          },
        ]}
        onPress={() => setSelectedFilter(label)}
      >
        <Text
          style={{
            color: isActive ? "#fff" : colors.text,
            fontWeight: isActive ? "600" : "400",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: "#0D47A1" }]}>{item.title}</Text>

      <View style={styles.row}>
        <Ionicons name="qr-code-outline" size={18} color={colors.text} />
        <Text style={[styles.text, { color: colors.text }]}> Mã tour: {item.code}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={18} color={colors.text} />
        <Text style={[styles.text, { color: colors.text }]}> Thời gian: {item.date}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="people-outline" size={18} color={colors.text} />
        <Text style={[styles.text, { color: colors.text }]}> Số lượng: {item.people}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="restaurant-outline" size={18} color={colors.text} />
        <Text style={[styles.text, { color: colors.text }]}> Dịch vụ: {item.services}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Truy cập</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      {/* Chip Filter */}
      <View style={styles.chipContainer}>{FILTERS.map(renderChip)}</View>

      {/* List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 8,
    marginTop: 10
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 6,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  text: {
    fontSize: 14,
    marginLeft: 6,
  },
  button: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    width: '100%'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: 'center'
  },
});
