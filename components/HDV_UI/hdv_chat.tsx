import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function HdvChat() {
  const { colors, dark } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào bạn', sender: 'other' },
    { id: 2, text: 'Chào bạn, hôm nay tour thế nào rồi?', sender: 'user' },
    { id: 3, text: 'Mọi thứ đều ok, chỉ có một số khách hơi mệt', sender: 'other' },
    { id: 4, text: 'ok để mình sẽ chuẩn bị thuốc hỗ trợ nhé', sender: 'user' }
  ]);

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  // Scroll xuống cuối mỗi khi messages thay đổi
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingVertical: 10 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'user'
                  ? { backgroundColor: '#3399ff', alignSelf: 'flex-end', borderTopRightRadius: 0 }
                  : { backgroundColor: dark ? '#666' : '#e6e6e6', alignSelf: 'flex-start', borderTopLeftRadius: 0 }
              ]}
            >
              <Text style={{ color: msg.sender === 'user' ? '#fff' : colors.text, fontSize: 16 }}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: dark ? '#222' : '#fff', borderTopColor: dark ? '#444' : '#ccc' }]}>
          <TextInput
            style={[styles.input, { backgroundColor: dark ? '#333' : '#f0f0f0', color: colors.text }]}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={dark ? '#aaa' : '#888'}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16
  },
  sendButton: {
    backgroundColor: '#3399ff',
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
