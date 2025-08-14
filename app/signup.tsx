import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from "expo-router";
import { callAPI } from '../scripts/axiosCall';

export default function SignUp() {
    const { colors } = useTheme();
    const router = useRouter();

    const [companyData, setCompanyData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [departmentData, setDepartmentData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<string | null>(null);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showRegisterButton, setShowRegisterButton] = useState(true);
    const [departmentMessage, setDepartmentMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    // Lấy danh sách company khi mount
    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await callAPI({ url: 'api/v1/company', method: 'GET' });
                const companiesArray = Array.isArray(res) ? res : res.data ?? [];
                // @ts-ignore
                const mapped = companiesArray.map(c => ({
                    ...c,
                    label: `${c.code} - ${c.name}`,
                    value: c.id,  // dùng id làm value cho dropdown
                }));
                setCompanyData(mapped);
            } catch (error) {
                console.error("Lỗi lấy company:", error);
            }
        }
        fetchCompanies();
    }, []);

    // Khi user chọn công ty -> gọi API lấy phòng ban tương ứng
    useEffect(() => {
        if (!selectedCompany) {
            setDepartmentData([]);
            setSelectedDepartment(null);
            setShowRegisterButton(true);
            setDepartmentMessage('');
            return;
        }

        async function fetchDepartments() {
            try {
                const res = await callAPI({ url: `api/v1/department/company/${selectedCompany}`, method: 'GET' });
                const depts = (res.data && Array.isArray(res.data)) ? res.data : [];

                if (depts.length === 0) {
                    setDepartmentData([]);
                    setSelectedDepartment(null);
                    setShowRegisterButton(false);
                    setDepartmentMessage('Công ty này chưa có phòng ban nào.');
                } else {
                    // @ts-ignore
                    const mappedDepts = depts.map(d => ({
                        label: d.name,
                        value: d.id,
                        code: d.code, 
                    }));
                    setDepartmentData(mappedDepts);
                    setSelectedDepartment(mappedDepts[0].value); // chọn mặc định phòng ban đầu tiên
                    setShowRegisterButton(true);
                    setDepartmentMessage('');
                }
            } catch (error) {
                console.error("Lỗi lấy phòng ban:", error);
                setDepartmentData([]);
                setSelectedDepartment(null);
                setShowRegisterButton(false);
                setDepartmentMessage('Lỗi khi lấy phòng ban.');
            }
        }

        fetchDepartments();
    }, [selectedCompany]);

    // Hàm xử lý khi bấm đăng ký
    const handleSignUp = async () => {
        if (!selectedCompany) {
            setErrorMessage("Vui lòng chọn doanh nghiệp.");
            return;
        }
        if (departmentData.length > 0 && !selectedDepartment) {
            setErrorMessage("Vui lòng chọn bộ phận.");
            return;
        }
        if (!fullName.trim()) {
            setErrorMessage("Vui lòng nhập họ và tên.");
            return;
        }
        if (!phone.trim()) {
            setErrorMessage("Vui lòng nhập số điện thoại.");
            return;
        }
        if (!email.trim()) {
            setErrorMessage("Vui lòng nhập email.");
            return;
        }
        if (!password.trim()) {
            setErrorMessage("Vui lòng nhập mật khẩu.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Mật khẩu nhập lại không khớp.");
            return;
        }

        // Nếu qua hết kiểm tra thì xóa thông báo lỗi
        setErrorMessage("");
        
        try {
            await callAPI({
                url: "api/v1/auth/register",
                method: "POST",
                data: {
                    "email": email,
                    "username": fullName,
                    "password": password,
                    "Phone": phone,
                    "departmentId": selectedDepartment,
                    "role": selectedDepartmentCode,
                }
            });
            // điều hướng qua trang login (welcome)
            Keyboard.dismiss();
            router.push("/welcome");

        } catch (error) {
            console.error("Lỗi đăng ký:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Image
                    source={require('../assets/images/tura-logo.png')}
                    style={{ width: 200, height: 100, marginBottom: 20 }}
                    resizeMode="contain"
                />

                {/* Dropdown Doanh nghiệp */}
                <Dropdown
                    style={[styles.dropdown, { borderColor: colors.border }]}
                    placeholderStyle={{ color: colors.text }}
                    selectedTextStyle={{ color: colors.text }}
                    data={companyData}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn doanh nghiệp"
                    value={selectedCompany}
                    onChange={item => setSelectedCompany(item.value)}
                />

                {/* Dropdown Bộ phận */}
                {departmentData.length > 0 && (
                    <Dropdown
                        style={[styles.dropdown, { borderColor: colors.border }]}
                        placeholderStyle={{ color: colors.text }}
                        selectedTextStyle={{ color: colors.text }}
                        data={departmentData}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn bộ phận"
                        value={selectedDepartment}
                        onChange={item => {setSelectedDepartment(item.value); setSelectedDepartmentCode(item.code);}}
                    />
                )}

                {departmentMessage ? (
                    <Text style={{ color: 'red', marginBottom: 10 }}>{departmentMessage}</Text>
                ) : null}

                {/* Các input còn lại */}
                <TextInput
                    style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                    placeholder="Họ và tên"
                    placeholderTextColor={colors.text}
                    value={fullName}
                    onChangeText={setFullName}
                />

                <TextInput
                    style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                    placeholder="Số điện thoại"
                    placeholderTextColor={colors.text}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <TextInput
                    style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                    placeholder="Email"
                    placeholderTextColor={colors.text}
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={[styles.passwordContainer, { borderColor: colors.border }]}>
                    <TextInput
                        style={[styles.passwordInput, { color: colors.text }]}
                        placeholder="Mật khẩu"
                        placeholderTextColor={colors.text}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[styles.passwordContainer, { borderColor: colors.border }]}>
                    <TextInput
                        style={[styles.passwordInput, { color: colors.text }]}
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor={colors.text}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons
                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>

                {errorMessage ? (
                    <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
                ) : null}

                {showRegisterButton && (
                    <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                        <Text style={styles.signupButtonText}>Đăng ký</Text>
                    </TouchableOpacity>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    input: {
        width: '95%',
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 12
    },
    dropdown: {
        width: '95%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
        justifyContent: 'center'
    },
    passwordContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12
    },
    passwordInput: {
        flex: 1,
        height: 50
    },
    signupButton: {
        backgroundColor: '#34C759',
        padding: 14,
        borderRadius: 8,
        width: '95%',
        alignItems: 'center',
        marginTop: 10
    },
    signupButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
