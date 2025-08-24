import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
    Animated,
    Dimensions,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import { callAPI } from "@/scripts/axiosCall";
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';

export async function getBanks() {
    const res = await axios.get("https://api.vietqr.io/v2/banks");
    return res.data;
}


const { width } = Dimensions.get("window");

export default function SignUpSteps() {
    const { colors } = useTheme();
    // Scroll to top
    const scrollViewRef = useRef(null)

    const [step, setStep] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const khacAnim = useRef(new Animated.Value(0)).current; // animation cho input
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // State để toggle expand
    const [expanded, setExpanded] = useState(false);

    const [khacText, setKhacText] = useState("");

    // gọi API ngân hàng
    const [banks, setBanks] = useState<any[]>([]);
    useEffect(() => {
        getBanks().then((res) => setBanks(res.data || []));
    }, []);


    const canProceed = () => {
        if (step === 0) {
            const hasOther = selected.khac;
            const hasOtherValid = hasOther && khacText.trim().length > 0;

            // Lấy danh sách các key khác "khac"
            const hasNormalSelected = Object.entries(selected).some(
                ([key, val]) => key !== "khac" && val
            );

            // Điều kiện pass:
            // 1. Nếu chỉ chọn "khac" → phải có text
            // 2. Nếu chọn "khac" + item khác → thì khac cũng phải có text
            // 3. Nếu chỉ chọn item khác → pass luôn
            return hasNormalSelected
                ? !hasOther || hasOtherValid
                : hasOtherValid;
        }
        if (step === 1) {
            return (
                formData.tenDonVi.trim() &&
                formData.emailDonVi.trim() &&
                formData.diaChiDonVi.trim() &&
                formData.sdtDonVi.trim() &&
                formData.nganHangDonVi.trim() &&
                formData.stkDonVi.trim() &&
                formData.hoTenNguoiDaiDien.trim() &&
                formData.sdtNguoiDaiDien.trim() &&
                formData.emailNguoiDaiDien.trim()
            );
        } if (step === 2) {
            return (
                formData.password.trim() &&
                formData.confirmPassword.trim() &&
                formData.password === formData.confirmPassword
            )
        }
        return true;
    };

    // Step 1
    type ServiceKey =
        | "luuTru"
        | "muaSam"
        | "anUong"
        | "giaiTri"
        | "vanChuyen"
        | "thamQuan"
        | "khac";

    const [selected, setSelected] = useState<Record<ServiceKey, boolean>>({
        luuTru: false,
        muaSam: false,
        anUong: false,
        giaiTri: false,
        vanChuyen: false,
        thamQuan: false,
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
        tenDonVi: "",
        emailDonVi: "",
        diaChiDonVi: "",
        nganHangDonVi: "",
        sdtDonVi: "",
        stkDonVi: "",
        hoTenNguoiDaiDien: "",
        sdtNguoiDaiDien: "",
        emailNguoiDaiDien: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const serviceOptions: { key: ServiceKey; label: string; icon: any }[] = [
        { key: "luuTru", label: "Lưu trú", icon: "bed-outline" },
        { key: "muaSam", label: "Mua sắm", icon: "cart-outline" },
        { key: "anUong", label: "Ăn uống", icon: "restaurant-outline" },
        { key: "giaiTri", label: "Vui chơi - giải trí", icon: "game-controller-outline" },
        { key: "vanChuyen", label: "Vận chuyển khách hàng", icon: "car-outline" },
        { key: "thamQuan", label: "Tham quan hướng dẫn", icon: "map-outline" },
        { key: "khac", label: "Khác", icon: "ellipsis-horizontal-outline" },
    ];

    // Map ra Object cho select
    const buildSelectedArray = () => {
        return serviceOptions.map((item) => ({
            key: item.key,
            label:
                item.key === "khac" && selected[item.key] && khacText.trim() !== ""
                    ? khacText
                    : item.label,
            isSelected: selected[item.key],
        }));
    };


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
                                marginTop: 20,
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
                Thông tin cơ bản về đơn vị
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
                        value={formData.tenDonVi}
                        onChangeText={text => handleChange("tenDonVi", text)}
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
                        value={formData.emailDonVi}
                        onChangeText={text => handleChange("emailDonVi", text)}
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
                        value={formData.diaChiDonVi}
                        onChangeText={text => handleChange("diaChiDonVi", text)}
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
                        value={formData.sdtDonVi}
                        onChangeText={text => handleChange("sdtDonVi", text)}
                    />
                </View>

                {/* Ngân hàng + STK */}
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 20,
                        marginBottom: 10,
                        color: colors.text,
                    }}
                >
                    Thông tin thanh toán
                </Text>

                {/* Select ngân hàng */}
                <View style={styles.inputRow}>
                    <Ionicons
                        name="business-outline"
                        size={20}
                        color={colors.text}
                        style={styles.inputIcon}
                    />
                    <Dropdown
                        style={[styles.textInput]}
                        placeholderStyle={{ color: "#999" }}
                        selectedTextStyle={{ color: colors.text }}
                        data={banks.map((bank) => ({
                            label: bank.shortName || bank.name,
                            value: bank.code || bank.id,
                        }))}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn ngân hàng"
                        searchPlaceholder="Tìm ngân hàng..."
                        value={formData.nganHangDonVi}
                        onChange={(item) => handleChange("nganHangDonVi", item.value)}
                    />
                </View>

                {/* Nhập STK */}
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
                        value={formData.stkDonVi}
                        onChangeText={text => handleChange("stkDonVi", text)}
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
                        value={formData.hoTenNguoiDaiDien}
                        onChangeText={text => handleChange("hoTenNguoiDaiDien", text)}
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
                        value={formData.sdtNguoiDaiDien}
                        onChangeText={text => handleChange("sdtNguoiDaiDien", text)}
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
                        value={formData.emailNguoiDaiDien}
                        onChangeText={text => handleChange("emailNguoiDaiDien", text)}
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
                        marginBottom: 20
                    },
                ]}
            >
                {/* Avatar + thông tin */}
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 15,
                        }}
                    >
                        {/* <Ionicons name="person-circle" size={50} color="#2196F3" /> */}
                        <Image source={require('@/assets/images/user-icon.png')} resizeMode="cover" style={{ height: 60, width: 60, borderRadius: 30 }} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>
                            {formData.hoTenNguoiDaiDien || "Chưa nhập tên người đại diện"}
                        </Text>
                        <Text style={{ color: colors.text, opacity: 0.7, marginTop: 4 }}>
                            {`Đơn vị: ` + formData.tenDonVi || "Chưa nhập tên đơn vị"}
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
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 6,
                                color: colors.text,
                            }}
                        >
                            Thông tin đơn vị
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="mail" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Email: {formData.emailDonVi || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="location" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Địa chỉ: {formData.diaChiDonVi || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="call" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Số điện thoại: {formData.sdtDonVi || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="card" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Số tài khoản: {formData.stkDonVi || "Chưa nhập"} - {formData.nganHangDonVi}</Text>
                        </View>

                        <Text
                            style={{
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 6,
                                color: colors.text,
                            }}
                        >
                            Thông tin người đại diện
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="call" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Số điện thoại: {formData.sdtNguoiDaiDien || "Chưa nhập"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                            <Ionicons name="mail" size={18} color={colors.text} style={{ marginRight: 8 }} />
                            <Text style={{ color: colors.text }}>Email: {formData.emailNguoiDaiDien || "Chưa nhập"}</Text>
                        </View>
                    </View>
                )}
            </View>

            <View style={{ gap: 12 }}>
                {/* Mật khẩu */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: colors.border,
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                >
                    <TextInput
                        placeholder="Mật khẩu"
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            color: colors.text,
                        }}
                        value={formData.password}
                        onChangeText={(text) => handleChange("password", text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={22}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>

                {/* Nhập lại mật khẩu */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: colors.border,
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                >
                    <TextInput
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            color: colors.text,
                        }}
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange("confirmPassword", text)}
                        secureTextEntry={!showConfirm}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                        <Ionicons
                            name={showConfirm ? "eye-off" : "eye"}
                            size={22}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>,
    ];

    const handleNext = async () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
            Animated.spring(translateX, {
                toValue: -(step + 1) * width,
                useNativeDriver: true,
            }).start();
            // @ts-ignore
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        } else {
            try {
                await callAPI({
                    url: "api/v1/office/create",
                    method: "POST",
                    data: {
                        "tenDonVi": formData.tenDonVi,
                        "diaChiDonVi": formData.diaChiDonVi,
                        "emailDonVi": formData.emailDonVi,
                        "sdtDonVi": formData.sdtDonVi,
                        "nganHangDonVi": formData.nganHangDonVi,
                        "stkDonVi": formData.stkDonVi,
                        "hoTenNguoiDaiDien": formData.hoTenNguoiDaiDien,
                        "emailNguoiDaiDien": formData.emailNguoiDaiDien,
                        "sdtNguoiDaiDien": formData.sdtNguoiDaiDien,
                        "password": formData.password,
                        "service": buildSelectedArray().reduce((acc, item) => {
                            acc[item.key] = item.isSelected ? item.label : "false";
                            return acc;
                        }, {} as Record<string, string>)
                    }
                });
                // điều hướng qua trang login (welcome)
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
            // @ts-ignore
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        // <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView ref={scrollViewRef}>
                <Image source={require('@/assets/images/tura-logo.png')} resizeMode="contain" style={{ width: '100%', height: 80 }} ></Image>
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
            </ScrollView>
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
        // </KeyboardAvoidingView>
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
        marginBottom: 10,
        marginTop: 10
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 60,
        marginTop: 20
    },
    button: {
        flex: 1,
        padding: 12,
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
        paddingVertical: 10,
        paddingHorizontal: 14,
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
