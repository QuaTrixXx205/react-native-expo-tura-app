import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MktWork() {
    const { colors } = useTheme();
    const [selectedTab, setSelectedTab] = useState<'Chiến lược' | 'Thư viện' | 'Quảng cáo'>('Chiến lược');

    const chipTabs: ('Chiến lược' | 'Thư viện' | 'Quảng cáo')[] = ['Chiến lược', 'Thư viện', 'Quảng cáo'];

    const renderTimeline = () => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {['Khởi tạo', 'Đang chạy', 'Đánh giá', 'Hoàn thành'].map((step, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: idx <= 1 ? '#36A2EB' : '#ccc', // ví dụ bước hiện tại
                        }}
                    />
                    <Text style={{ marginHorizontal: 6, color: colors.text }}>{step}</Text>
                    {idx < 3 && <View style={{ width: 30, height: 2, backgroundColor: idx < 1 ? '#36A2EB' : '#ccc' }} />}
                </View>
            ))}
        </ScrollView>
    );


    const renderCardStrategy = () => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Chiến dịch Summer Sale - #CS001</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
                {['Gắn thẻ', 'Quyền truy cập', 'Thêm ảnh & video'].map((chip, idx) => (
                    <View key={idx} style={[styles.smallChip, { backgroundColor: colors.primary }]}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>{chip}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{ marginVertical: 8 }}>
                <Text style={[styles.statText, { color: colors.text }]}>Mục tiêu: Tăng doanh thu 20%</Text>
                <Text style={[styles.statText, { color: colors.text }]}>Phụ trách: Marketing Team</Text>
                <Text style={[styles.statText, { color: colors.text }]}>Kế hoạch: Email + Social Media</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: '#fff' }}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745', marginLeft: 8 }]}>
                    <Text style={{ color: '#fff' }}>Tạo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderCardAds = () => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Quảng cáo Facebook - #AD001</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
                {['Gắn thẻ', 'Quyền truy cập', 'Thêm ảnh & video'].map((chip, idx) => (
                    <View key={idx} style={[styles.smallChip, { backgroundColor: colors.primary }]}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>{chip}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{ marginVertical: 8 }}>
                <Text style={[styles.statText, { color: colors.text }]}>Nội dung chương trình: Giảm 50% cho khách hàng mới</Text>
                <Text style={[styles.statText, { color: colors.text }]}>Tiến độ: 75%</Text>
                <View style={{borderRadius: 8, marginTop: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://media.sproutsocial.com/uploads/2025/02/Facebook-statistics-marketers-should-know-in-2025-Final.jpg' }} // link ảnh ví dụ
                        style={{
                            width: '100%',
                            height: 150,
                            borderRadius: 8,
                            marginTop: 8,
                        }}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: '#fff' }}>Theo dõi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745', marginLeft: 8 }]}>
                    <Text style={{ color: '#fff' }}>Đăng bài</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ padding: 16, backgroundColor: colors.background }}>
            {/* Chip tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {chipTabs.map((tab, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => setSelectedTab(tab)}
                        style={[
                            styles.chip,
                            { backgroundColor: selectedTab === tab ? colors.primary : colors.card, borderColor: colors.border },
                        ]}
                    >
                        <Text style={{ color: selectedTab === tab ? '#fff' : colors.text }}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Nội dung */}
            <ScrollView contentContainerStyle={{ marginTop: 26, alignItems: 'stretch' }}>
                {selectedTab === 'Chiến lược' && (
                    <>
                        {renderTimeline()}
                        {renderCardStrategy()}
                    </>
                )}
                {selectedTab === 'Quảng cáo' && renderCardAds()}
                {selectedTab === 'Thư viện' && (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: colors.text }}>Không có dữ liệu</Text>
                    </View>
                )}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        minWidth: 60,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 16,
    },
    cardTitle: { fontSize: 16, fontWeight: '600' },
    smallChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, marginRight: 8 },
    statText: { fontSize: 14, marginBottom: 4 },
    button: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
});
