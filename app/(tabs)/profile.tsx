import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Camera, Calendar, Phone, Mail, MapPin, Activity, Heart, TriangleAlert as AlertTriangle, FileText, Award } from 'lucide-react-native';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string;
  medications: string;
  height: string;
  weight: string;
}

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    age: '35',
    location: 'New York, NY',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    bloodType: 'O+',
    allergies: 'Penicillin, Shellfish',
    medications: 'Multivitamin, Vitamin D',
    height: '5\'10"',
    weight: '165 lbs',
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  const renderEditableField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: React.ComponentType<any>,
    multiline: boolean = false
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <icon size={16} color="#6B7280" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing ? (
        <TextInput
          style={[styles.fieldInput, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderSettingsItem = (
    title: string,
    subtitle: string,
    icon: React.ComponentType<any>,
    onPress: () => void,
    hasSwitch: boolean = false,
    switchValue: boolean = false
  ) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIcon}>
          <icon size={20} color="#6B7280" />
        </View>
        <View>
          <Text style={styles.settingsTitle}>{title}</Text>
          <Text style={styles.settingsSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#E5E7EB', true: '#BFDBFE' }}
          thumbColor={switchValue ? '#0066CC' : '#FFFFFF'}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? (
            <Text style={styles.editButtonText}>Save</Text>
          ) : (
            <Edit size={20} color="#0066CC" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={40} color="#6B7280" />
              </View>
              {isEditing && (
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={16} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileEmail}>{profileData.email}</Text>
              <View style={styles.profileBadge}>
                <Award size={14} color="#10B981" />
                <Text style={styles.profileBadgeText}>Verified Patient</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            {renderEditableField(
              'Full Name',
              profileData.name,
              (text) => setProfileData({ ...profileData, name: text }),
              User
            )}
            {renderEditableField(
              'Email',
              profileData.email,
              (text) => setProfileData({ ...profileData, email: text }),
              Mail
            )}
            {renderEditableField(
              'Phone',
              profileData.phone,
              (text) => setProfileData({ ...profileData, phone: text }),
              Phone
            )}
            {renderEditableField(
              'Age',
              profileData.age,
              (text) => setProfileData({ ...profileData, age: text }),
              Calendar
            )}
            {renderEditableField(
              'Location',
              profileData.location,
              (text) => setProfileData({ ...profileData, location: text }),
              MapPin
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Information</Text>
          <View style={styles.card}>
            {renderEditableField(
              'Height',
              profileData.height,
              (text) => setProfileData({ ...profileData, height: text }),
              Activity
            )}
            {renderEditableField(
              'Weight',
              profileData.weight,
              (text) => setProfileData({ ...profileData, weight: text }),
              Activity
            )}
            {renderEditableField(
              'Blood Type',
              profileData.bloodType,
              (text) => setProfileData({ ...profileData, bloodType: text }),
              Heart
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.card}>
            {renderEditableField(
              'Allergies',
              profileData.allergies,
              (text) => setProfileData({ ...profileData, allergies: text }),
              AlertTriangle,
              true
            )}
            {renderEditableField(
              'Current Medications',
              profileData.medications,
              (text) => setProfileData({ ...profileData, medications: text }),
              Heart,
              true
            )}
            {renderEditableField(
              'Emergency Contact',
              profileData.emergencyContact,
              (text) => setProfileData({ ...profileData, emergencyContact: text }),
              Phone
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.card}>
            {renderSettingsItem(
              'Notifications',
              'Health reminders and AI responses',
              Bell,
              () => {},
              true,
              notificationsEnabled
            )}
            {renderSettingsItem(
              'Privacy & Security',
              'Data protection and privacy settings',
              Shield,
              () => Alert.alert('Privacy Settings', 'Privacy settings would open here')
            )}
            {renderSettingsItem(
              'App Preferences',
              'Theme, language, and display options',
              Settings,
              () => Alert.alert('App Settings', 'App settings would open here')
            )}
            {renderSettingsItem(
              'Medical Records',
              'Export and manage health data',
              FileText,
              () => Alert.alert('Medical Records', 'Medical records would open here')
            )}
            {renderSettingsItem(
              'Help & Support',
              'FAQs, tutorials, and contact support',
              HelpCircle,
              () => Alert.alert('Help & Support', 'Help section would open here')
            )}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#0066CC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    paddingVertical: 4,
  },
  fieldInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  settingsSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
});