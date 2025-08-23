import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SevMenuLienLac() {
  const { colors } = useTheme();

  const data = [
    "Đoàn Vietravel - 224",
    "Đoàn Vietravel - 205",
    "Đoàn Vietravel - 113",
    "Đoàn Vietravel - 012",
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: colors.card }]}
          activeOpacity={0.8}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="call" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.text }]}>{item}</Text>
            <Text style={styles.subtitle}>Ấn để gọi</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4CAF50", // xanh lá nổi bật
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});
