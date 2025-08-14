import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import { useNavigation } from 'expo-router';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Khai báo toàn bộ tên screen ở đây
type RootStackParamList = {
  Home: undefined;
  DhtkMenuThietKe: undefined;
  // thêm các screen khác...
};

// Type cho navigation object
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// DHTK UI component
import DhtkMain from '../../components/DHTK_UI/dhtk_home';

// HDV UI Component
import HdvHome from '../../components/HDV_UI/hdv_home';

// MKT UI Component
import MktHome from '../../components/MKT_UI/mkt_home';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUser();
  const { colors } = useTheme();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const days = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    setCurrentDate(`${dayName}, ngày ${day}/${month}`);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Card trên đầu */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.headerCard}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.helloText}>Xin chào 👋</Text>
            <Text style={styles.userName}>{user?.username}</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Nội dung - Role */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Menu action*/}
          <View>
            {user?.role === 'DHTK' && (
              <>
                {/* Menu cho DHTK */}
                <View style={styles.featureBox}>
                  {[
                    { icon: 'construct-outline', label: 'Thiết kế', screen: 'DhtkMenuThietKe' },
                    { icon: 'people-outline', label: 'Đối tác', screen: 'DhtkMenuDoiTac' },
                    { icon: 'people-outline', label: 'Khảo sát', screen: 'DhtkMenuKhaoSat' },
                    { icon: 'settings-outline', label: 'Điều hành', screen: 'DhtkMenuDieuHanh' },
                  ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.featureItem} onPress={() => navigation.navigate(item.screen as any)}>
                      <Ionicons name={item.icon as any} size={32} color="#fff" />
                      <Text style={styles.featureText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {user?.role === 'HDV' && (
              <>
                {/* Menu cho HDV */}
                <View style={styles.featureBox}>
                  {[
                    { icon: 'language', label: 'Phiên dịch' },
                    { icon: 'document-text-outline', label: 'Ghi chú' },
                    { icon: 'headset-outline', label: 'Dịch vụ' },
                    { icon: 'call', label: 'Hỗ trợ' },
                  ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.featureItem}>
                      <Ionicons name={item.icon as any} size={32} color="#fff" />
                      <Text style={styles.featureText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {user?.role === 'MKT' && (
              <>
                {/* Menu cho MKT */}
                <View style={styles.featureBox}>
                  {[
                    { icon: 'cube-outline', label: 'Sản phẩm', screen: 'MktMenuProduct' },
                    { icon: 'people-outline', label: 'Dữ liệu KH', screen: 'MktMenuCustomer' },
                    { icon: 'headset-outline', label: 'CSKH' },
                    { icon: 'receipt-outline', label: 'Xử lý HĐ', screen: 'MktMenuPaperwork' },
                  ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.featureItem} onPress={() => item.screen && navigation.navigate(item.screen as any)}>
                      <Ionicons name={item.icon as any} size={32} color="#fff" />
                      <Text style={styles.featureText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Content with roles*/}
          <View>
            {user?.role === 'DHTK' && <DhtkMain />}
            {user?.role === 'HDV' && <HdvHome />}
            {user?.role === 'MKT' && <MktHome />}
          </View>
        </ScrollView>
      </View>

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helloText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9
  },
  content: {
    flex: 1,
    marginVertical: 20,
  },
  // Small menu actions
  featureBox: {
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 10,
    justifyContent: 'space-around',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1
  },
  featureIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
    textAlign: 'center'
  },
});
