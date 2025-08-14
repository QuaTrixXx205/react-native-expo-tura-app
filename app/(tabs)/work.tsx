import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/components/UserContext';

// DHTK UI component
import DhtkWork from '../../components/DHTK_UI/dhtk_work';

// HDV UI Component
import HdvReport from '../../components/HDV_UI/hdv_report';

// MKT UI Component
import MktWork from '../../components/MKT_UI/mkt_work';

export default function Work() {
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
              {user?.role === 'DHTK' ? 'Công việc chung' : user?.role === 'HDV' ? 'Báo cáo' : user?.role === 'MKT' ? 'Công việc' : ''}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Nội dung - Role */}
      <View style={styles.content}>
        {/* DHTK Storage Component */}
        {user?.role === 'DHTK' && <DhtkWork />}
        {user?.role === 'HDV' && <HdvReport />}
        {user?.role === 'MKT' && <MktWork />}
      </View>

    </View>
  )
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