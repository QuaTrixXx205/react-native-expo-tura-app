import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function MktReport() {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('window').width - 32;
    const [selectedChip, setSelectedChip] = useState('Tất cả');

    const chips = ["Tất cả", "Kênh Marketing", "Chiến dịch", "Doanh thu", "Phân khúc khách hàng"];

    // Sample data
    const card1Data = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
        datasets: [{ data: [120, 150, 100, 180] }],
    };

    const card2Data = {
        labels: ["Facebook", "Email", "Zalo", "TikTok"],
        datasets: [{ data: [80, 40, 60, 30] }],
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Chip buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {chips.map((chip, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => setSelectedChip(chip)}
                        style={[
                            styles.chip,
                            { backgroundColor: selectedChip === chip ? colors.primary : colors.card, borderColor: colors.border },
                        ]}
                    >
                        <Text style={{ color: selectedChip === chip ? '#fff' : colors.text }}>{chip}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Card 1 */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.leftContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Doanh thu nhận được (Tháng 08/2025)</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Số lượng khách hàng tiềm năng: 150</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Số lượng tour bán được: 45</Text>
                </View>
                <View style={styles.chartContainer}>
                    <LineChart
                        data={card1Data}
                        width={screenWidth - 32}
                        height={180}
                        fromZero
                        chartConfig={{
                            backgroundGradientFrom: colors.card,
                            backgroundGradientTo: colors.card,
                            color: (opacity = 1) => colors.primary || `rgba(0,0,0,${opacity})`,
                            labelColor: (opacity = 1) => colors.text,
                        }}
                        style={{ borderRadius: 8 }}
                    />
                </View>
            </View>

            {/* Card 2 */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.leftContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Báo cáo hiệu suất kênh Marketing - Sáng nay, 14/08</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Nguồn gốc khách hàng tiềm năng: 120</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Doanh thu theo kênh: 80 triệu</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Tỷ lệ chuyển đổi theo kênh: 25%</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Chi phí theo kênh: 30 triệu</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>ROI theo kênh: 2.5x</Text>
                    <Text style={[styles.statText, { color: colors.text }]}>Lượng truy cập tương tác: 450 lượt</Text>
                </View>
                <View style={styles.chartContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={card2Data}
                            width={Math.max(screenWidth, card2Data.labels.length * 60)}
                            height={180}
                            fromZero
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                color: (opacity = 1, index = 0) => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index % 4],
                                labelColor: (opacity = 1) => colors.text,
                                decimalPlaces: 0,
                            }}
                            style={{ borderRadius: 8 }}
                        />
                    </ScrollView>
                </View>
            </View>

            {/* Card 3 */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.leftContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Báo cáo hiệu suất chiến dịch - Sáng nay, 14/08
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Số khách hàng tiếp cận: 1200
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Số lượt đăng ký: 320
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Số chuyển đổi thành công: 80
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Chi phí chiến dịch: 50 triệu
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        ROI chiến dịch: 1.6x
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Lượt tương tác: 450 lượt
                    </Text>
                </View>
                <View style={styles.chartContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={{
                                labels: ["Khách hàng tiếp cận", "Đăng ký", "Chuyển đổi", "Tương tác"],
                                datasets: [
                                    { data: [1200, 320, 80, 450] }
                                ],
                            }}
                            width={Math.max(screenWidth, card2Data.labels.length * 60)}
                            height={180}
                            fromZero
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                color: (opacity = 1, index = 0) => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index % 4],
                                labelColor: (opacity = 1) => colors.text,
                                decimalPlaces: 0,
                            }}
                            style={{ borderRadius: 8 }}
                        />
                    </ScrollView>
                </View>
            </View>

            {/* Card 4 */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.leftContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Báo cáo hiệu suất doanh thu - Sáng nay, 14/08
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Doanh thu tổng: 250 triệu
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Số tour bán được: 35
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Số khách hàng: 120
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Chi phí hoạt động: 70 triệu
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Lợi nhuận: 180 triệu
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        ROI: 2.57x
                    </Text>
                </View>
                <View style={styles.chartContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={{
                                labels: ["Doanh thu", "Tour bán", "Khách hàng", "Chi phí", "Lợi nhuận"],
                                datasets: [
                                    { data: [250, 35, 120, 70, 180] }
                                ],
                            }}
                            width={Math.max(screenWidth, card2Data.labels.length * 60)}
                            height={180}
                            fromZero
                            yAxisLabel=""
                            yAxisSuffix=" triệu"
                            chartConfig={{
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                color: (opacity = 1, index = 0) => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'][index % 5],
                                labelColor: (opacity = 1) => colors.text,
                                decimalPlaces: 0,
                            }}
                            style={{ borderRadius: 8 }}
                        />
                    </ScrollView>
                </View>
            </View>

            {/* Card 5 */}
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.leftContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Báo cáo hiệu suất phân khúc khách hàng - Sáng nay, 14/08
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Khách hàng mới: 50
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Khách hàng quay lại: 70
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Khách hàng theo độ tuổi 18-25: 30
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Khách hàng theo độ tuổi 26-35: 60
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Doanh thu theo phân khúc: 120 triệu
                    </Text>
                    <Text style={[styles.statText, { color: colors.text }]}>
                        Tỷ lệ chuyển đổi: 28%
                    </Text>
                </View>
                <View style={styles.chartContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={{
                                labels: ["Mới", "Quay lại", "18-25", "26-35", "Doanh thu"],
                                datasets: [{ data: [50, 70, 30, 60, 120] }],
                            }}
                            width={Math.max(screenWidth, card2Data.labels.length * 60)}
                            height={180}
                            fromZero
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                color: (opacity = 1, index = 0) =>
                                    ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"][index % 5],
                                labelColor: (opacity = 1) => colors.text,
                                decimalPlaces: 0,
                            }}
                            style={{ borderRadius: 8 }}
                        />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
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
    leftContent: { marginBottom: 12 },
    chartContainer: { alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
    statText: { fontSize: 14, marginBottom: 4 },
});
