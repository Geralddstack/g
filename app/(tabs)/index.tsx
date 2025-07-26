import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Send, Bot, User, Mic, Image, CirclePlus as PlusCircle } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'symptom' | 'prescription';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI health assistant. I can help you with health questions, symptom analysis, and general medical guidance. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  const quickActions = [
    { id: 1, text: 'Symptom Check', icon: 'search' },
    { id: 2, text: 'Medication Info', icon: 'pill' },
    { id: 3, text: 'Health Tips', icon: 'heart' },
    { id: 4, text: 'Emergency', icon: 'phone' },
  ];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('headache') || lowerInput.includes('pain')) {
      return "I understand you're experiencing pain. Can you describe the location and intensity of your headache on a scale of 1-10? Also, when did it start and have you taken any medication for it?";
    }
    
    if (lowerInput.includes('fever') || lowerInput.includes('temperature')) {
      return "A fever can indicate various conditions. Have you measured your temperature? If it's above 100.4°F (38°C), you should monitor it closely. Are you experiencing any other symptoms like chills, body aches, or fatigue?";
    }
    
    if (lowerInput.includes('cough') || lowerInput.includes('cold')) {
      return "Coughs can be caused by various factors. Is it a dry cough or are you producing mucus? How long have you had this cough? Are you experiencing any shortness of breath or chest pain?";
    }
    
    if (lowerInput.includes('stomach') || lowerInput.includes('nausea')) {
      return "Stomach issues can have various causes. Are you experiencing nausea, vomiting, or diarrhea? When did these symptoms start? Have you eaten anything unusual recently?";
    }
    
    return "Thank you for sharing that information. Based on what you've told me, I'd recommend monitoring your symptoms closely. If they persist or worsen, please consider consulting with a healthcare professional. Is there anything specific about your symptoms you'd like me to help clarify?";
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage,
        ]}>
        <View style={[
          styles.messageContent,
          isUser ? styles.userMessageContent : styles.aiMessageContent,
        ]}>
          <View style={styles.messageHeader}>
            {isUser ? (
              <User size={16} color="#0066CC" />
            ) : (
              <Bot size={16} color="#00AA44" />
            )}
            <Text style={styles.senderName}>
              {isUser ? 'You' : 'AI Assistant'}
            </Text>
          </View>
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.aiMessageText,
          ]}>
            {message.text}
          </Text>
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessage]}>
      <View style={[styles.messageContent, styles.aiMessageContent]}>
        <View style={styles.messageHeader}>
          <Bot size={16} color="#00AA44" />
          <Text style={styles.senderName}>AI Assistant</Text>
        </View>
        <View style={styles.typingIndicator}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                  transform: [{
                    scale: typingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  }],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Bot size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Health AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Available 24/7</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}>
          {messages.map(renderMessage)}
          {isTyping && renderTypingIndicator()}
        </ScrollView>

        <View style={styles.quickActionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionButton}
                onPress={() => setInputText(action.text)}>
                <Text style={styles.quickActionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachButton}>
              <PlusCircle size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Describe your symptoms or ask a question..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
            />
            
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() ? styles.sendButtonActive : {},
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}>
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    marginVertical: 6,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    maxWidth: '85%',
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userMessageContent: {
    backgroundColor: '#0066CC',
    borderBottomRightRadius: 8,
  },
  aiMessageContent: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(107, 114, 128, 0.7)',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B7280',
    marginRight: 6,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  quickActionButton: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0066CC',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  attachButton: {
    padding: 10,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  micButton: {
    padding: 10,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#9CA3AF',
    borderRadius: 24,
    padding: 12,
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#0066CC',
  },
});