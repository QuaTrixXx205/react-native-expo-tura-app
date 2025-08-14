import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";

// Type cho 1 tour
type Tour = {
  id: number;
  title: string;
  type: string;
  customer: string;
  requirements: {
    people: number;
    hotel: string;
    location: string;
    services: string;
    transport: string;
    date: string;
  };
  status: "pending" | "confirmed" | "paid";
  image: string;
};

// Dữ liệu tab trạng thái
const STATUS_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Đang xác nhận" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "paid", label: "Đã thanh toán" },
];

// Dữ liệu mẫu
const TOURS: Tour[] = [
  {
    id: 1,
    title: "Tour Đà Lạt - Nha Trang",
    type: "Tour gia đình - 6 ngày 5 đêm",
    customer: "Phạm Trung Hải Đăng",
    requirements: {
      people: 4,
      hotel: "4*",
      location: "gần trung tâm",
      services: "Dã ngoại, sức khoẻ",
      transport: "đi xe - về xe",
      date: "01/08 - 07/08",
    },
    status: "paid",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
  },
  {
    id: 2,
    title: "Tour Tây Nguyên - Mã: DL245 - 546",
    type: "Tour bạn bè - 3 ngày 2 đêm",
    customer: "Trần Minh Hiếu",
    requirements: {
      people: 5,
      hotel: "3-4*",
      location: "<10km",
      services: "Dã ngoại, sức khoẻ, trải nghiệm",
      transport: "đi xe - về xe",
      date: "01/08 - 07/08",
    },
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
  },
];

// Hàm trả style dựa theo trạng thái
const getStatusStyle = (status: Tour["status"]) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#e0f7e9", color: "#2e7d32", text: "Đang xác nhận" };
    case "confirmed":
      return { backgroundColor: "#e3f2fd", color: "#1565c0", text: "Đã xác nhận" };
    case "paid":
      return { backgroundColor: "#e8eaf6", color: "#283593", text: "Đã thanh toán" };
    default:
      return { backgroundColor: "#eeeeee", color: "#424242", text: "" };
  }
};

// Component chính
export default function DhtkMenuDieuHanh() {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const filteredTours =
    selectedTab === "all"
      ? TOURS
      : TOURS.filter((t) => t.status === selectedTab);

  // Render từng tour
  const renderTour = ({ item }: { item: Tour }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>

          <View
            style={[
              styles.statusTag,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
          >
            <Text style={{ color: statusStyle.color, fontSize: 12 }}>
              {statusStyle.text}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{item.type}</Text>

        {/* Customer */}
        <Text style={styles.customer}>👤 {item.customer}</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.req}>
              Số lượng: {item.requirements.people} người
            </Text>
            <Text style={styles.req}>
              Lưu trú & ăn uống: {item.requirements.hotel}
            </Text>
            <Text style={styles.req}>
              Địa điểm tham quan: {item.requirements.location}
            </Text>
            <Text style={styles.req}>
              Dịch vụ: {item.requirements.services}
            </Text>
            <Text style={styles.req}>
              Phương tiện: {item.requirements.transport}
            </Text>
            <Text style={styles.req}>
              Lịch trình: {item.requirements.date}
            </Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Nhận</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Tabs dạng grid */}
      <View style={styles.tabContainer}>
        {STATUS_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setSelectedTab(tab.key)}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.tabActive,
            ]}
          >
            <Text
              style={{
                color: selectedTab === tab.key ? "white" : "#1565c0",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách */}
      <FlatList
        data={filteredTours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTour}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // cho phép xuống hàng
    padding: 10,
    backgroundColor: "white",
    gap: 8, // khoảng cách giữa các tab (React Native 0.71+)
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1565c0",
  },
  tabActive: {
    backgroundColor: "#1565c0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // để status luôn ở top
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    flex: 1, // chiếm hết phần còn lại
    flexWrap: "wrap", // cho phép xuống hàng
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  customer: {
    fontWeight: "500",
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  req: {
    fontSize: 12,
    color: "#333",
    marginBottom: 2,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 6,
    marginLeft: 8,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1565c0",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
});
