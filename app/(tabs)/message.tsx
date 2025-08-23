import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/components/UserContext';

// DHTK UI component
import DhtkMessage from '../../components/DHTK_UI/dhtk_notification';

// HDV UI component
import HdvChat from '../../components/HDV_UI/hdv_chat';

// MKT UI component
import MktChat from '../../components/MKT_UI/mkt_chat';

export default function Mesage() {
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
                  {user?.role === 'DHTK' ? 'Thông báo' : user?.role === 'HDV' ? 'Chat' : user?.role === 'MKT' ? 'Chat' : 'Tin nhắn'}
                </Text>
              </View>
            </View>
          </LinearGradient>
    
          {/* Nội dung - Role */}
          <View style={styles.content}>
            {/* DHTK Storage Component */}
            {user?.role === 'DHTK' && <DhtkMessage />}
            {user?.role === 'HDV' && <HdvChat />}
            {user?.role === 'MKT' && <MktChat />}
            {user?.role === 'SEV' && <MktChat />}
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