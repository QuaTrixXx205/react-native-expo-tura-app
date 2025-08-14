import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

export default function MktChat() {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Chào bạn, hôm nay có chiến dịch mới không?', sender: 'other' },
    { id: '2', text: 'Có, mai chúng ta sẽ chạy email marketing', sender: 'me' },
    { id: '3', text: 'Ok mình sẽ chuẩn bị nội dung', sender: 'other' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: inputText.trim(),
      sender: 'me',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    // scroll to bottom
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start',
          backgroundColor: item.sender === 'me' ? colors.primary : colors.card,
        },
      ]}
    >
      <Text style={{ color: item.sender === 'me' ? '#fff' : colors.text }}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.text + '99'}
          style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
});
