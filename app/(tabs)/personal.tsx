import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/components/UserContext';
import { useRouter } from "expo-router";

export default function Personal() {
  const { colors } = useTheme();
  const router = useRouter();
  const { setUser } = useUser();
  const { user } = useUser();

  const handleLogout = () => {
    setUser(null); // Xóa user
    router.replace("/welcome"); // Điều hướng
  };

  const menuItems = [
    { icon: 'person-circle-outline', label: 'Thông tin cá nhân', onPress: () => {} },
    { icon: 'analytics-outline', label: 'KPI', onPress: () => {} },
    { icon: 'time-outline', label: 'Lịch sử hoạt động', onPress: () => {} },
    { icon: 'alert-circle-outline', label: 'Báo cáo sự cố', onPress: () => {} },
    { icon: 'construct-outline', label: 'Công cụ và giới thiệu', onPress: () => {} },
    { icon: 'information-circle-outline', label: 'Phiên bản ứng dụng', onPress: () => {} },
    { icon: 'log-out-outline', label: 'Đăng xuất', onPress: handleLogout },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.headerCard}
      >
        <View style={styles.headerTop}>
          <Image
            source={require('@/assets/images/user-icon.png')} // Hình tĩnh
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.greeting}>Bộ phận: {user?.role === 'DHTK' ? 'Điều hành - thiết kế' : user?.role === 'HDV' ? 'Hướng dẫn viên' : user?.role === 'MKT' ? 'Marketing' : 'Dịch vụ'}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Menu */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon as any} size={22} color={colors.primary} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: colors.text }]}>{item.label}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.text} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerCard: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});
