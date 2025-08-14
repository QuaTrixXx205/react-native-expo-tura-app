import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Activity = {
    id: number;
    time: string;
    activity: string;
    done: boolean;
};

type Schedule = {
    id: number;
    locationName: string;
    tourCode: string;
    dateRange: string;
    guests: number;
    transport: string;
    hotel: string;
    image: string;
    activities: Activity[];
};

export default function HdvSchedule() {
    const { colors } = useTheme();

    const [todaySchedule, setTodaySchedule] = useState<Schedule>({
        id: 1,
        locationName: 'Sân bay Tân Sơn Nhất',
        tourCode: 'DL234-56S',
        dateRange: '13/08/2025 - 16/08/2025',
        guests: 25,
        transport: 'Máy bay',
        hotel: 'Khách sạn ABC',
        image: 'https://dichung.vn/wp-content/uploads/2020/08/Thi%E1%BA%BFt-k%E1%BA%BF-kh%C3%B4ng-t%C3%AAn-2020-08-22T145821.095.jpg',
        activities: [
            { id: 1, time: '08:00', activity: 'Tập trung tại sân bay', done: true },
            { id: 2, time: '09:30', activity: 'Lên máy bay', done: false },
        ],
    });

    const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([
        {
            id: 2,
            locationName: 'Đà Lạt',
            tourCode: 'DL789-12A',
            dateRange: '20/08/2025 - 23/08/2025',
            guests: 15,
            transport: 'Xe khách',
            hotel: 'Khách sạn XYZ',
            image: 'https://vietnamdiscovery.com/wp-content/uploads/2025/06/how-to-get-to-dalat-from-ho-chi-minh.jpg',
            activities: [
                { id: 1, time: '07:00', activity: 'Khởi hành', done: false },
                { id: 2, time: '10:00', activity: 'Tham quan Thung lũng Tình Yêu', done: false },
            ],
        },
        {
            id: 3,
            locationName: 'Nha Trang',
            tourCode: 'NT345-78B',
            dateRange: '25/08/2025 - 28/08/2025',
            guests: 20,
            transport: 'Tàu hỏa',
            hotel: 'Khách sạn Nha Trang',
            image: 'https://bomanhatrang.com/wp-content/uploads/2023/03/dia-diem-du-lich-nha-trang-thumbnail-1.jpg',
            activities: [
                { id: 1, time: '08:00', activity: 'Tập trung tại ga', done: false },
                { id: 2, time: '09:30', activity: 'Khởi hành', done: false },
            ],
        },
    ]);

    const toggleActivityDone = (scheduleId: number, activityId: number, isToday: boolean) => {
        if (isToday) {
            setTodaySchedule(prev => ({
                ...prev,
                activities: prev.activities.map(act =>
                    act.id === activityId ? { ...act, done: !act.done } : act
                ),
            }));
        } else {
            setUpcomingSchedules(prev =>
                prev.map(schedule =>
                    schedule.id === scheduleId
                        ? {
                            ...schedule,
                            activities: schedule.activities.map(act =>
                                act.id === activityId ? { ...act, done: !act.done } : act
                            ),
                        }
                        : schedule
                )
            );
        }
    };

    const renderScheduleCard = (schedule: Schedule, isToday: boolean) => (
        <View
            key={schedule.id}
            style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.border }]}
        >
            {/* 2 cột: thông tin & hình */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Thông tin bên trái */}
                <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={[styles.title, { color: colors.text }]}>{schedule.locationName}</Text>
                    <Text style={[styles.text, { color: colors.text }]}>Mã tour: {schedule.tourCode}</Text>
                    <Text style={[styles.text, { color: colors.text }]}>Ngày: {schedule.dateRange}</Text>
                    <Text style={[styles.text, { color: colors.text }]}>Đoàn khách: {schedule.guests}</Text>
                    <Text style={[styles.text, { color: colors.text }]}>Phương tiện: {schedule.transport}</Text>
                    <Text style={[styles.text, { color: colors.text }]}>Khách sạn: {schedule.hotel}</Text>
                </View>

                {/* Hình bên phải */}
                <Image source={{ uri: schedule.image }} style={styles.image} resizeMode="cover" />
            </View>

            {/* Check activities - chiếm full width */}
            <View style={{ marginTop: 8 }}>
                {schedule.activities.map((act: Activity) => (
                    <View key={act.id} style={styles.row}>
                        <Text style={[styles.text, { color: colors.text }]}>{act.time} - {act.activity}</Text>
                        <TouchableOpacity
                            onPress={() => toggleActivityDone(schedule.id, act.id, isToday)}
                            style={{ marginLeft: 'auto' }}
                        >
                            {act.done
                                ? <Ionicons name="checkmark-circle" size={30} color="green" />
                                : <Ionicons name="ellipse-outline" size={30} color="gray" />}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Button Chi tiết - chiếm full width */}
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Chi tiết</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.header, { color: colors.text }]}>Lịch trình của bạn</Text>
            {renderScheduleCard(todaySchedule, true)}

            <Text style={[styles.header, { color: colors.text, marginTop: 16 }]}>Lịch trình sắp tới</Text>
            {upcomingSchedules.map(schedule => renderScheduleCard(schedule, false))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    card: {
        borderRadius: 12,
        padding: 12,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    infoContainer: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },
    detailBtn: {
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 6,
        width: '100%',
    },
});
