import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpSteps() {
    const { colors } = useTheme();

    const [step, setStep] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const khacAnim = useRef(new Animated.Value(0)).current; // animation cho input

    // State để toggle expand
    const [expanded, setExpanded] = useState(false);

    const [khacText, setKhacText] = useState("");

    const canProceed = () => {
        if (step === 0) {
            return Object.entries(selected).some(([key, val]) => {
                if (key === "khac") {
                    return val && khacText.trim().length > 0;
                }
                return val;
            });
        }
        if (step === 1) {
            return (
                formData.unitName.trim() &&
                formData.email.trim() &&
                formData.address.trim() &&
                formData.phone.trim() &&
                formData.bankAccount.trim() &&
                formData.repName.trim() &&
                formData.repPhone.trim() &&
                formData.repEmail.trim()
            );
        }
        return true;
    };

    // Step 1
    type ServiceKey =
        | "luutru"
        | "muasam"
        | "anUong"
        | "giaitri"
        | "vanchuyen"
        | "thamquan"
        | "khac";

    const [selected, setSelected] = useState<Record<ServiceKey, boolean>>({
        luutru: false,
        muasam: false,
        anUong: false,
        giaitri: false,
        vanchuyen: false,
        thamquan: false,
        khac: false,
    });

    const toggleCheck = (key: ServiceKey) => {
        const newValue = !selected[key];
        setSelected((prev) => ({ ...prev, [key]: newValue }));

        if (key === "khac") {
            Animated.timing(khacAnim, {
                toValue: newValue ? 1 : 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    };

    // Step 2
    const [formData, setFormData] = useState({
        unitName: "",
        email: "",
        address: "",
        phone: "",
        bankAccount: "",
        repName: "",
        repPhone: "",
        repEmail: "",
    });

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const serviceOptions: { key: ServiceKey; label: string; icon: any }[] = [
        { key: "luutru", label: "Lưu trú", icon: "bed-outline" },
        { key: "muasam", label: "Mua sắm", icon: "cart-outline" },
        { key: "anUong", label: "Ăn uống", icon: "restaurant-outline" },
        { key: "giaitri", label: "Vui chơi - giải trí", icon: "game-controller-outline" },
        { key: "vanchuyen", label: "Vận chuyển khách hàng", icon: "car-outline" },
        { key: "thamquan", label: "Tham quan hướng dẫn", icon: "map-outline" },
        { key: "khac", label: "Khác", icon: "ellipsis-horizontal-outline" },
    ];

    const steps = [
        <View style={styles.stepContainer} key="step1">
            <Text style={[styles.stepText, { color: colors.text }]}>
                Bạn là đơn vị kinh doanh phục vụ gì trong ngành du lịch?
            </Text>

            {/* Danh sách full-width buttons */}
            {serviceOptions.map((item) => (
                <View key={item.key} style={{ width: "100%", marginBottom: 15 }}>
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            {
                                borderColor: selected[item.key] ? "#2196F3" : colors.border,
                                backgroundColor: selected[item.key]
                                    ? "rgba(52, 140, 199, 0.1)"
                                    : "transparent",
                            },
                        ]}
                        onPress={() => toggleCheck(item.key)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={item.icon}
                            size={22}
                            color={selected[item.key] ? "#2196F3" : colors.text}
                            style={{ marginRight: 12 }}
                        />
                        <Text
                            style={{
                                color: selected[item.key] ? "#2196F3" : colors.text,
                                fontWeight: selected[item.key] ? "bold" : "normal",
                                flex: 1,
                                fontSize: 16,
                            }}
                        >
                            {item.label}
                        </Text>
                        {selected[item.key] && (
                            <Ionicons name="checkmark-circle" size={22} color="#2196F3" />
                        )}
                    </TouchableOpacity>

                    {/* Input cho "Khác" */}
                    {item.key === "khac" && (
                        <Animated.View
                            style={{
                                overflow: "hidden",
                                height: khacAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 60],
                                }),
                                opacity: khacAnim,
                                marginTop: 8,
                            }}
                        >
                            <TextInput
                                style={[
                                    styles.input,
                                    { borderColor: colors.border, color: colors.text },
                                ]}
                                placeholder="Nhập dịch vụ khác..."
                                placeholderTextColor="#999"
                                value={khacText}
                                onChangeText={setKhacText}
                            />
                        </Animated.View>
                    )}
                </View>
            ))}
        </View>,

        <View style={styles.stepContainer} key="step2">
            <Text style={[styles.stepText, { color: colors.text }]}>
                Thông tin cơ bản về đơn vị của bạn
            </Text>

            <View
                style={[
                    styles.card,
                    { backgroundColor: colors.card, borderColor: colors.border },
                ]}
            >
                {/* Tên đơn vị */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="business-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Tên đơn vị"
                        placeholderTextColor="#999"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.unitName}
                        onChangeText={text => handleChange("unitName", text)}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.email}
                        onChangeText={text => handleChange("email", text)}
                    />
                </View>

                {/* Địa chỉ */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="location-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Địa chỉ"
                        placeholderTextColor="#999"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.address}
                        onChangeText={text => handleChange("address", text)}
                    />
                </View>

                {/* Số điện thoại */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="call-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Số điện thoại"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.phone}
                        onChangeText={text => handleChange("phone", text)}
                    />
                </View>

                {/* STK thanh toán */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="card-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="STK thanh toán"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.bankAccount}
                        onChangeText={text => handleChange("bankAccount", text)}
                    />
                </View>

                {/* --- Người đại diện --- */}
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 20,
                        marginBottom: 10,
                        color: colors.text,
                    }}
                >
                    Thông tin người đại diện
                </Text>

                {/* Họ và tên */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="person-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Họ và tên"
                        placeholderTextColor="#999"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.repName}
                        onChangeText={text => handleChange("repName", text)}
                    />
                </View>

                {/* SĐT người đại diện */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="call-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="SĐT người đại diện"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.repPhone}
                        onChangeText={text => handleChange("repPhone", text)}
                    />
                </View>

                {/* Email người đại diện */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder="Email người đại diện"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        style={[styles.textInput, { color: colors.text }]}
                        value={formData.repEmail}
                        onChangeText={text => handleChange("repEmail", text)}
                    />
                </View>
            </View>
        </View>,

        <View style={styles.stepContainer} key="step3">
            <Text style={[styles.stepText, { color: colors.text }]}>
                Xác nhận thông tin đăng ký
            </Text>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        borderRadius: 16,
                        padding: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                    },
                ]}
            >
                {/* Avatar + thông tin */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "#E3F2FD",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 15,
                        }}
                    >
                        <Ionicons name="person-circle" size={50} color="#2196F3" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>
                            {formData.repName || "Chưa nhập tên người đại diện"}
                        </Text>
                        <Text style={{ color: colors.text, opacity: 0.7, marginTop: 4 }}>
                            {`Đơn vị: ` + formData.unitName || "Chưa nhập tên đơn vị"}
                        </Text>

                        {/* Chips dịch vụ */}
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
                            {serviceOptions.map((opt) => {
                                if (selected[opt.key]) {
                                    return (
                                        <View
                                            key={opt.key}
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                backgroundColor: "rgba(33,150,243,0.15)",
                                                paddingHorizontal: 12,
                                                paddingVertical: 6,
                                                borderRadius: 20,
                                                marginRight: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Ionicons
                                                name={opt.icon}
                                                size={16}
                                                color="#2196F3"
                                                style={{ marginRight: 5 }}
                                            />
                                            <Text style={{ color: "#2196F3", fontSize: 13 }}>
                                                {opt.key === "khac" ? khacText || "Khác" : opt.label}
                                            </Text>
                                        </View>
                                    );
                                }
                                return null;
                            })}
                        </View>
                    </View>
                </View>

                {/* Expansion button */}
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 12,
                        alignSelf: "flex-start",
                    }}
                >
                    <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={colors.text}
                    />
                    <Text style={{ marginLeft: 6, color: colors.text }}>
                        {expanded ? "Ẩn bớt" : "Xem chi tiết"}
                    </Text>
                </TouchableOpacity>

                {/* Thông tin thêm */}
                {expanded && (
                    <View style={{ marginTop: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="mail" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.email || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="location" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.address || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="call" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.phone || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="card" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.bankAccount || "Chưa nhập"}</Text>
                        </View>

                        <Text
                            style={{
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 6,
                                color: colors.text,
                            }}
                        >
                            Người đại diện
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="call" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.repPhone || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="mail" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>{formData.repEmail || "Chưa nhập"}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>,
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
            Animated.spring(translateX, {
                toValue: -(step + 1) * width,
                useNativeDriver: true,
            }).start();
        } else {
            try {
                Keyboard.dismiss();
                router.push("/welcome");
            } catch (error) {
                console.error("Lỗi đăng ký:", error);
            }
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
            Animated.spring(translateX, {
                toValue: -(step - 1) * width,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={require('@/assets/images/tura-logo.png')} resizeMode="contain" style={{ width: '100%', height: 100 }} ></Image>
            {/* Slider */}
            <View style={{ flex: 1, overflow: "hidden" }}>
                <Animated.View
                    style={{
                        flexDirection: "row",
                        width: width * steps.length,
                        transform: [{ translateX }],
                    }}
                >
                    {steps.map((s, index) => (
                        <View style={{ width, flex: 1 }} key={index}>
                            {s}
                        </View>
                    ))}
                </Animated.View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                {step > 0 && (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#ad1111ff" }]}
                        onPress={handleBack}
                    >
                        <Text style={[styles.buttonText, { color: "white" }]}>
                            Quay lại
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    disabled={!canProceed()}
                    style={[styles.button, { backgroundColor: canProceed() ? colors.primary : "#575656ff", }]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {step === steps.length - 1 ? "Đăng ký" : "Tiếp theo"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        overflow: "hidden",
    },
    stepContainer: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },
    stepText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 10
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 15,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 10,
        width: "100%"
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        width: "100%",
        fontSize: 15,
    },
    // Step 2 css
    card: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 12,
        paddingBottom: 6,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 6,
    },

});
