import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Item {
  title: string;
  info?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  children?: Item[];
}

const DATA: Item[] = [
  {
    title: "Dịch vụ lưu trú",
    icon: "bed-outline",
    children: [
      {
        title: "Twin Room",
        icon: "home-outline",
        children: [
          { title: "Số lượng phòng", info: "08", icon: "layers-outline" },
          { title: "Diện tích", info: "30-35m²", icon: "resize-outline" },
          {
            title: "Nội thất",
            info: "Giường, bàn trang điểm, sofa, tủ lạnh, két sắt...",
            icon: "cube-outline",
          },
        ],
      },
      { title: "Double Room", info: "Phòng giường đôi", icon: "person-outline" },
      { title: "Deluxe Room", info: "Phòng sang trọng", icon: "star-outline" },
    ],
  },
  {
    title: "Dịch vụ ăn uống",
    icon: "restaurant-outline",
    children: [
      {
        title: "Buffet sáng",
        info: "Đa dạng món Á & Âu",
        icon: "sunny-outline",
      },
      {
        title: "Buffet tối",
        info: "Thực đơn thay đổi hàng ngày",
        icon: "moon-outline",
      },
      {
        title: "Món chay",
        info: "Đậu hũ, rau củ, nấm, pasta, salad...",
        icon: "leaf-outline",
      },
      {
        title: "Tráng miệng",
        info: "Bánh ngọt, trái cây, kem",
        icon: "ice-cream-outline",
      },
    ],
  },
];

const InfoCard = ({ item, colors }: { item: Item; colors: any }) => (
  <View style={[styles.card, { backgroundColor: colors.card }]}>
    {/* Header */}
    <View style={styles.header}>
      {item.icon && (
        <Ionicons
          name={item.icon}
          size={22}
          color={colors.primary}
          style={styles.icon}
        />
      )}
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
    </View>

    {/* Info */}
    {item.info && (
      <View style={styles.row}>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color={colors.text}
          style={styles.iconSmall}
        />
        <Text style={[styles.info, { color: colors.text }]}>{item.info}</Text>
      </View>
    )}

    {/* Children */}
    {item.children?.map((child) => (
      <View key={child.title} style={styles.child}>
        <View style={styles.row}>
          {child.icon && (
            <Ionicons
              name={child.icon}
              size={18}
              color={colors.text}
              style={styles.iconSmall}
            />
          )}
          <Text style={[styles.childTitle, { color: colors.text }]}>
            {child.title}
          </Text>
        </View>
        {child.info && (
          <Text
            style={[styles.info, { color: colors.text, marginLeft: 28 }]}
          >
            • {child.info}
          </Text>
        )}
        {child.children?.map((sub) => (
          <View key={sub.title} style={styles.rowSub}>
            {sub.icon && (
              <Ionicons
                name={sub.icon}
                size={16}
                color={colors.text}
                style={styles.iconTiny}
              />
            )}
            <Text style={[styles.info, { color: colors.text }]}>
              {sub.title}: {sub.info}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

export default function SevMenuDichVuCungCap() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <InfoCard item={item} colors={colors} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => console.log("FAB Pressed")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  icon: { marginRight: 10 },
  iconSmall: { marginRight: 8 },
  iconTiny: { marginRight: 6 },
  title: { fontSize: 18, fontWeight: "700" },
  child: { marginLeft: 8, marginTop: 6 },
  childTitle: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rowSub: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 28,
    marginTop: 2,
  },
  info: { fontSize: 15 },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
