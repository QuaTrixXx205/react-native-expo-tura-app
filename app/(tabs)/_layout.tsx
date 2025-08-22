import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUser } from '@/components/UserContext';

const menuByRole = {
  DHTK: [
    { name: 'index', title: 'Trang chủ', icon: 'home' },
    { name: 'storage', title: 'Kho lưu trữ', icon: 'albums' },
    { name: 'work', title: 'Công việc', icon: 'briefcase' },
    { name: 'message', title: 'Thông báo', icon: 'notifications' },
    { name: 'personal', title: 'Cá nhân', icon: 'person' },
  ],
  HDV: [
    { name: 'index', title: 'Trang chủ', icon: 'home' },
    { name: 'storage', title: 'Lịch trình', icon: 'calendar' },
    { name: 'work', title: 'Báo cáo', icon: 'newspaper' },
    { name: 'message', title: 'Tin nhắn', icon: 'chatbubble-ellipses' },
    { name: 'personal', title: 'Cá nhân', icon: 'person' },
  ],
  MKT: [
    { name: 'index', title: 'Trang chủ', icon: 'home' },
    { name: 'storage', title: 'Báo cáo', icon: 'newspaper' },
    { name: 'work', title: 'Công việc', icon: 'briefcase' },
    { name: 'message', title: 'Tin nhắn', icon: 'chatbubble-ellipses' },
    { name: 'personal', title: 'Cá nhân', icon: 'person' },
  ],
  SEV: [
    { name: 'index', title: 'Trang chủ', icon: 'home' },
    { name: 'storage', title: 'Kho lưu trữ', icon: 'albums' },
    { name: 'work', title: 'Công việc', icon: 'briefcase' },
    { name: 'message', title: 'Tin nhắn', icon: 'chatbubble-ellipses' },
    { name: 'personal', title: 'Cá nhân', icon: 'person' },
  ]
} as const;

export default function TabLayout() {
  const { user } = useUser();  
  const colorScheme = useColorScheme();

  const menus = user?.role ? menuByRole[user.role as keyof typeof menuByRole] : [];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {menus.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}