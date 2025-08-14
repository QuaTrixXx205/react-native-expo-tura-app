import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

export default function MktHome() {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('window').width - 32;

    // Data card 1
    const lineChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ data: [20, 45, 28, 80, 99, 43, 50] }],
    };

    // Data card 2
    const barChartData = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [{ data: [80, 55, 70, 60] }],
    };
    const barColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

    const tableData = [
        { month: "Q1", customers: 120, trend: "Đi biển" },
        { month: "Q2", customers: 95, trend: "Đi núi" },
        { month: "Q3", customers: 150, trend: "Kết hợp nghỉ dưỡng" },
        { month: "Q4", customers: 80, trend: "Tour ngắn hạn" },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header card 1 */}
            <Text style={[styles.header, { color: colors.text }]}>Bài viết hôm nay</Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={[styles.leftContent, { flex: 1 }]}>
                    <Text style={[styles.title, { color: colors.text }]}>Đo lường hiệu quả</Text>
                    <View style={styles.statRow}>
                        <Ionicons name="people-outline" size={16} color={colors.text} />
                        <Text style={[styles.statText, { color: colors.text }]}> 120 người quan tâm</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Ionicons name="call-outline" size={16} color={colors.text} />
                        <Text style={[styles.statText, { color: colors.text }]}> 45 người liên hệ</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Ionicons name="card-outline" size={16} color={colors.text} />
                        <Text style={[styles.statText, { color: colors.text }]}> 30 người thanh toán</Text>
                    </View>
                </View>
                <View style={[styles.rightContent, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <LineChart
                            data={lineChartData}
                            width={Math.max(screenWidth, lineChartData.labels.length * 80)} // mỗi label ~80px
                            height={200}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                color: (opacity = 1) => colors.primary || `rgba(0,0,0,${opacity})`,
                                labelColor: (opacity = 1) => colors.text,
                                propsForDots: { r: "3", strokeWidth: "1", stroke: colors.primary || "#000" },
                            }}
                            bezier
                            style={{ borderRadius: 8 }}
                        />
                    </ScrollView>
                </View>
            </View>

            {/* Card 2 */}
            <View style={[styles.card, { backgroundColor: colors.card, flexDirection: 'column' }]}>
                {/* Text */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Dữ liệu khảo sát thị trường - khách hàng
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        80% số lượng khách hàng có xu hướng đi biển trong tháng này
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        60% khách hàng quan tâm đến các tour kết hợp nghỉ dưỡng và giải trí
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        40% khách hàng thích đặt tour ngắn hạn trong 3 ngày
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        25% khách hàng mới lần đầu tham gia tour
                    </Text>
                </View>

                {/* Chart nằm dưới text */}
                <LineChart
                    data={{
                        labels: ["Q1", "Q2", "Q3", "Q4"],
                        datasets: [{ data: [80, 55, 70, 60] }],
                    }}
                    width={screenWidth - 32} // chiếm toàn bộ chiều ngang card
                    height={150}
                    fromZero
                    chartConfig={{
                        backgroundGradientFrom: colors.card,
                        backgroundGradientTo: colors.card,
                        color: (opacity = 1) => colors.primary || `rgba(0,0,0,${opacity})`,
                        labelColor: (opacity = 1) => colors.text,
                        decimalPlaces: 0,
                        propsForDots: { r: "4", strokeWidth: "1", stroke: colors.primary || "#000" },
                    }}
                    style={{ borderRadius: 8 }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 16,
    },
    leftContent: { justifyContent: 'center', flex: 1 },
    rightContent: { flex: 1 },
    title: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
    statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    statText: { fontSize: 14, marginBottom: 6 },
    detailButton: {
        width: '100%',
        marginTop: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    tableRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 0.5 },
    tableHeader: { fontWeight: 'bold' },
    tableCell: {},
});
