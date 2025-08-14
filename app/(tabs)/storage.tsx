import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/components/UserContext';

// DHTK UI component
import DhtkStorage from '../../components/DHTK_UI/dhtk_storage';

// HDV UI Component
import HdvSchedule from '../../components/HDV_UI/hdv_schedule';

// MKT UI Component
import MktReport from '../../components/MKT_UI/mkt_report';

export default function Storage() {
  const { user } = useUser();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Card trên đầu */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.headerCard}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerText}>
              {user?.role === 'DHTK' ? 'Kho lưu trữ' : user?.role === 'HDV' ? 'Lịch trình' : user?.role === 'MKT' ? 'Báo cáo' : ''}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Nội dung - Role */}
      <View style={styles.content}>
        {/* DHTK Storage Component */}
        {user?.role === 'DHTK' && <DhtkStorage />}
        {user?.role === 'HDV' && <HdvSchedule />}
        {user?.role === 'MKT' && <MktReport />}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,

  },
});
