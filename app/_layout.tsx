import { DarkTheme as NavigationDarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from '@/components/UserContext';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#252222ff', // nền chính
    card: '#1E1E1E',       // header / tab background
    text: '#FFFFFF',       // chữ trắng
    border: '#FFFFFF',     // viền xám tối
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  const theme = colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme;

  return (
    <UserProvider>
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            // Giữ background đồng bộ ngay khi chuyển trang
            contentStyle: { backgroundColor: theme.colors.background },
            headerStyle: { backgroundColor: theme.colors.card },
            headerTintColor: theme.colors.text,
          }}
        >
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: true, title: "Đăng ký tài khoản" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* DHTK menu */}
          <Stack.Screen name="DhtkMenuThietKe" options={{
            title: 'Thiết kế',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="DhtkMenuDieuHanh" options={{
            title: 'Điều hành',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="DhtkMenuKhaoSat" options={{
            title: 'Khảo sát',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="DhtkMenuDoiTac" options={{
            title: 'Đối tác',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          {/*************/}
          {/* MKT menu */}
          <Stack.Screen name="MktMenuProduct" options={{
            title: 'Sản phẩm',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="MktMenuCustomer" options={{
            title: 'Dữ liệu KH',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="MktMenuPaperwork" options={{
            title: 'Xử lý hợp đồng',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          {/************/}
          <Stack.Screen name="SevMenuDichVuCungCap" options={{
            title: 'Dịch vụ cung cấp',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="SevMenuKeHoach" options={{
            title: 'Kế hoạch',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="SevMenuYeuCau" options={{
            title: 'Yêu cầu',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="SevMenuLienLac" options={{
            title: 'Liên lạc',
            headerStyle: {
              backgroundColor: '#1565C0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          {/* Menu Sev */}
          {/************/}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar
          style={colorScheme === 'dark' ? 'light' : 'dark'}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

