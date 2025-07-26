import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { Phone, MapPin, TriangleAlert as AlertTriangle, Heart, Activity, Clock, User, Navigation, Shield, Zap, Hospital, Stethoscope, Ambulance, PhoneCall } from 'lucide-react-native';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  type: 'personal' | 'medical' | 'emergency';
}

interface EmergencyService {
  id: string;
  name: string;
  description: string;
  phone: string;
  icon: React.ComponentType<any>;
  color: string;
  urgent: boolean;
}

export default function EmergencyScreen() {
  const [location, setLocation] = useState('Current Location Available');

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      type: 'personal',
    },
    {
      id: '2',
      name: 'Dr. Smith',
      relationship: 'Primary Care Physician',
      phone: '+1 (555) 123-7890',
      type: 'medical',
    },
    {
      id: '3',
      name: 'Emergency Services',
      relationship: 'Local Emergency',
      phone: '911',
      type: 'emergency',
    },
    {
      id: '4',
      name: 'Mom',
      relationship: 'Mother',
      phone: '+1 (555) 456-7890',
      type: 'personal',
    },
  ];

  const emergencyServices: EmergencyService[] = [
    {
      id: '1',
      name: 'Call 911',
      description: 'Life-threatening emergencies',
      phone: '911',
      icon: PhoneCall,
      color: '#EF4444',
      urgent: true,
    },
    {
      id: '2',
      name: 'Poison Control',
      description: 'Poisoning emergencies 24/7',
      phone: '1-800-222-1222',
      icon: AlertTriangle,
      color: '#F59E0B',
      urgent: true,
    },
    {
      id: '3',
      name: 'Crisis Hotline',
      description: 'Mental health crisis support',
      phone: '988',
      icon: Heart,
      color: '#8B5CF6',
      urgent: true,
    },
    {
      id: '4',
      name: 'Nurse Hotline',
      description: '24/7 medical advice line',
      phone: '1-800-NURSE-24',
      icon: Stethoscope,
      color: '#0066CC',
      urgent: false,
    },
    {
      id: '5',
      name: 'Ambulance',
      description: 'Non-emergency transport',
      phone: '1-800-AMBULANCE',
      icon: Ambulance,
      color: '#10B981',
      urgent: false,
    },
  ];

  const handleCall = (phone: string, name: string) => {
    Alert.alert(
      'Place Call',
      `Call ${name} at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phone}`);
          },
        },
      ]
    );
  };

  const handleShareLocation = () => {
    Alert.alert(
      'Share Location',
      'Your current location will be shared with emergency contacts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => {} },
      ]
    );
  };

  const renderEmergencyService = (service: EmergencyService) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceCard,
        service.urgent && styles.urgentServiceCard,
      ]}
      onPress={() => handleCall(service.phone, service.name)}>
      <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
        <service.icon size={24} color={service.color} />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={[styles.serviceName, service.urgent && styles.urgentText]}>
          {service.name}
        </Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <Text style={styles.servicePhone}>{service.phone}</Text>
      </View>
      {service.urgent && (
        <View style={styles.urgentBadge}>
          <Zap size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmergencyContact = (contact: EmergencyContact) => {
    const getContactColor = (type: string) => {
      switch (type) {
        case 'emergency': return '#EF4444';
        case 'medical': return '#0066CC';
        case 'personal': return '#10B981';
        default: return '#6B7280';
      }
    };

    return (
      <TouchableOpacity
        key={contact.id}
        style={styles.contactCard}
        onPress={() => handleCall(contact.phone, contact.name)}>
        <View style={[styles.contactIcon, { backgroundColor: `${getContactColor(contact.type)}15` }]}>
          <User size={20} color={getContactColor(contact.type)} />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactRelationship}>{contact.relationship}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>
        </View>
        <Phone size={20} color="#6B7280" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency</Text>
        <TouchableOpacity style={styles.locationButton} onPress={handleShareLocation}>
          <MapPin size={16} color="#FFFFFF" />
          <Text style={styles.locationButtonText}>Share Location</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Shield size={20} color="#EF4444" />
            <Text style={styles.alertTitle}>Emergency Ready</Text>
          </View>
          <Text style={styles.alertText}>
            Your medical information and emergency contacts are set up. 
            In case of emergency, first responders can access your critical health data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          <View style={styles.servicesGrid}>
            {emergencyServices.map(renderEmergencyService)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.contactsList}>
            {emergencyContacts.map(renderEmergencyContact)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.medicalCard}>
            <View style={styles.medicalHeader}>
              <Activity size={20} color="#0066CC" />
              <Text style={styles.medicalTitle}>Quick Access Medical Data</Text>
            </View>
            <View style={styles.medicalInfo}>
              <View style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>Blood Type:</Text>
                <Text style={styles.medicalValue}>O+</Text>
              </View>
              <View style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>Allergies:</Text>
                <Text style={styles.medicalValue}>Penicillin, Shellfish</Text>
              </View>
              <View style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>Medications:</Text>
                <Text style={styles.medicalValue}>Multivitamin, Vitamin D</Text>
              </View>
              <View style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>Emergency Contact:</Text>
                <Text style={styles.medicalValue}>Jane Doe - (555) 987-6543</Text>
              </View>
              <View style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>Height/Weight:</Text>
                <Text style={styles.medicalValue}>5'10" / 165 lbs</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Services</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Navigation size={20} color="#10B981" />
              <Text style={styles.locationTitle}>Current Location</Text>
            </View>
            <Text style={styles.locationText}>{location}</Text>
            <View style={styles.locationActions}>
              <TouchableOpacity style={styles.locationActionButton}>
                <Hospital size={16} color="#0066CC" />
                <Text style={styles.locationActionText}>Find Hospitals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.locationActionButton}>
                <MapPin size={16} color="#0066CC" />
                <Text style={styles.locationActionText}>Share Location</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F1D1D',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  urgentServiceCard: {
    borderWidth: 2,
    borderColor: '#FEE2E2',
    backgroundColor: '#FFFBEB',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  urgentText: {
    color: '#EF4444',
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  servicePhone: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  urgentBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactRelationship: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  medicalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  medicalInfo: {
    gap: 8,
  },
  medicalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  medicalLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    flex: 1,
  },
  medicalValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    flex: 2,
    textAlign: 'right',
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  locationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  locationActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  locationActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0066CC',
    marginLeft: 4,
  },
});