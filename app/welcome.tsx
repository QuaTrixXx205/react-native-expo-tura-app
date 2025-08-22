import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, Animated, Easing, Alert, Keyboard } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { callAPI } from '../scripts/axiosCall';
import { useUser } from '@/components/UserContext';

export default function WelcomeScreen() {
    const { setUser } = useUser();
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Animated values
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true })
            ]),
            Animated.parallel([
                Animated.timing(formOpacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                Animated.timing(formTranslateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true })
            ])
        ]).start();
    }, []);

    // Hàm xử lý đăng nhập
    const handleLogin = async () => {
        // if (!email.trim()) {
        //     Alert.alert("Lỗi", "Vui lòng nhập email");
        //     return;
        // }
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     Alert.alert("Lỗi", "Vui lòng nhập email hợp lệ");
        //     return;
        // }
        // if (!password.trim()) {
        //     Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
        //     return;
        // }

        // try {
        //     const res = await callAPI({
        //         url: 'api/v1/auth/login',
        //         method: 'POST',
        //         data: { email, password }
        //     });

        //     if (res?.data?.user) {
        //         Keyboard.dismiss();
        //         setUser(res.data.user); // Lưu vào context
        //         router.push("/(tabs)");
        //         setEmail('');
        //         setPassword('');
        //     } else {
        //         Alert.alert("Lỗi", "Sai thông tin đăng nhập.");
        //     }
        // } catch (err) {
        //     console.error("Lỗi API đăng nhập:", err);
        //     Alert.alert("Lỗi", "Tài khoản không tồn tại hoặc thông tin đăng nhập sai.");
        // }

        // simulate dữ liệu trả về
        const fakeUser = { username: 'Nguyễn Hào Quang', role: 'SEV' }; 

        setUser(fakeUser); 
        Keyboard.dismiss();
        router.push("/(tabs)");
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Logo */}
                <Animated.Image
                    source={require('@/assets/images/tura-logo.png')}
                    style={{
                        width: 250,
                        height: 150,
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }]
                    }}
                    resizeMode="contain"
                />

                {/* Form */}
                <Animated.View style={{
                    alignItems: 'center',
                    width: '100%',
                    opacity: formOpacity,
                    transform: [{ translateY: formTranslateY }]
                }}>
                    {/* Email */}
                    <TextInput
                        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* Mật khẩu */}
                    <View style={{
                        width: '95%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        marginBottom: 12
                    }}>
                        <TextInput
                            style={{ flex: 1, height: 50, color: colors.text }}
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

                    {/* Nút Đăng nhập */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            backgroundColor: '#2196F3',
                            padding: 12,
                            borderRadius: 6,
                            width: '95%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 8
                        }}
                    >
                        <Ionicons name="log-in-outline" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng nhập</Text>
                    </TouchableOpacity>

                    {/* Text đăng ký */}
                    <View style={styles.signupContainer}>
                        <Text style={{ color: colors.text }}>Chưa có tài khoản? </Text>
                        <Link href="/signup" asChild>
                            <TouchableOpacity>
                                <Text style={[styles.signupText, { color: '#007AFF' }]}>
                                    Đăng ký ngay!
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
    input: {
        width: '95%',
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 12
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupText: {
        fontWeight: 'bold',
        fontSize: 15
    }
});
