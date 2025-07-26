import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Activity, Heart, Thermometer, Droplets, Weight, Calendar, TrendingUp, Plus, Clock, CircleAlert as AlertCircle, Pill, Brain, Eye } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  notes: string;
}

export default function HealthScreen() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'symptoms' | 'history'>('metrics');

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: Heart,
      color: '#EF4444',
      trend: 'stable',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: Activity,
      color: '#0066CC',
      trend: 'down',
      lastUpdated: '1 day ago',
    },
    {
      id: '3',
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      icon: Thermometer,
      color: '#F59E0B',
      trend: 'stable',
      lastUpdated: '4 hours ago',
    },
    {
      id: '4',
      name: 'Weight',
      value: '165',
      unit: 'lbs',
      icon: Weight,
      color: '#10B981',
      trend: 'up',
      lastUpdated: '1 week ago',
    },
    {
      id: '5',
      name: 'Sleep',
      value: '7.5',
      unit: 'hours',
      icon: Brain,
      color: '#8B5CF6',
      trend: 'up',
      lastUpdated: '12 hours ago',
    },
    {
      id: '6',
      name: 'Steps',
      value: '8,432',
      unit: 'steps',
      icon: Activity,
      color: '#06B6D4',
      trend: 'up',
      lastUpdated: '1 hour ago',
    },
  ];

  const symptoms: Symptom[] = [
    {
      id: '1',
      name: 'Headache',
      severity: 'medium',
      date: '2 days ago',
      notes: 'Mild tension headache, started after work',
    },
    {
      id: '2',
      name: 'Fatigue',
      severity: 'low',
      date: '1 week ago',
      notes: 'Feeling tired in the afternoons',
    },
    {
      id: '3',
      name: 'Sore Throat',
      severity: 'high',
      date: '2 weeks ago',
      notes: 'Resolved after 3 days with rest',
    },
    {
      id: '4',
      name: 'Back Pain',
      severity: 'medium',
      date: '3 days ago',
      notes: 'Lower back pain after exercise',
    },
  ];

  const renderMetricCard = (metric: HealthMetric) => (
    <TouchableOpacity key={metric.id} style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${metric.color}15` }]}>
          <metric.icon size={24} color={metric.color} />
        </View>
        <View style={styles.trendIndicator}>
          <TrendingUp 
            size={16} 
            color={metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280'} 
          />
        </View>
      </View>
      <Text style={styles.metricValue}>
        {metric.value} <Text style={styles.metricUnit}>{metric.unit}</Text>
      </Text>
      <Text style={styles.metricName}>{metric.name}</Text>
      <Text style={styles.metricTime}>{metric.lastUpdated}</Text>
    </TouchableOpacity>
  );

  const renderSymptomCard = (symptom: Symptom) => {
    const severityColor = symptom.severity === 'high' ? '#EF4444' : 
                          symptom.severity === 'medium' ? '#F59E0B' : '#10B981';
    
    return (
      <View key={symptom.id} style={styles.symptomCard}>
        <View style={styles.symptomHeader}>
          <View style={styles.symptomInfo}>
            <Text style={styles.symptomName}>{symptom.name}</Text>
            <View style={[styles.severityBadge, { backgroundColor: `${severityColor}15` }]}>
              <Text style={[styles.severityText, { color: severityColor }]}>
                {symptom.severity.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.symptomDate}>{symptom.date}</Text>
        </View>
        <Text style={styles.symptomNotes}>{symptom.notes}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Dashboard</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {[
          { id: 'metrics', title: 'Metrics', icon: Activity },
          { id: 'symptoms', title: 'Symptoms', icon: AlertCircle },
          { id: 'history', title: 'History', icon: Calendar },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id as any)}>
            <tab.icon 
              size={16} 
              color={activeTab === tab.id ? '#0066CC' : '#6B7280'} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'metrics' && (
          <View style={styles.metricsContainer}>
            <View style={styles.metricsGrid}>
              {healthMetrics.map(renderMetricCard)}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.actionCard}>
                  <Droplets size={24} color="#0066CC" />
                  <Text style={styles.actionText}>Log Water</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCard}>
                  <Heart size={24} color="#EF4444" />
                  <Text style={styles.actionText}>Heart Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCard}>
                  <Weight size={24} color="#10B981" />
                  <Text style={styles.actionText}>Weight</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCard}>
                  <Thermometer size={24} color="#F59E0B" />
                  <Text style={styles.actionText}>Temperature</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCard}>
                  <Pill size={24} color="#8B5CF6" />
                  <Text style={styles.actionText}>Medication</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCard}>
                  <Brain size={24} color="#06B6D4" />
                  <Text style={styles.actionText}>Sleep</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'symptoms' && (
          <View style={styles.symptomsContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Symptoms</Text>
              {symptoms.map(renderSymptomCard)}
            </View>
            
            <TouchableOpacity style={styles.addSymptomButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addSymptomText}>Log New Symptom</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.historyContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Health History</Text>
              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Clock size={20} color="#6B7280" />
                  <Text style={styles.historyTitle}>Last 30 Days</Text>
                </View>
                <Text style={styles.historyText}>
                  4 symptoms logged, 18 health metrics recorded
                </Text>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>Avg Heart Rate: 74 bpm</Text>
                  <Text style={styles.historyStat}>Sleep: 7.2 hrs/night</Text>
                  <Text style={styles.historyStat}>Steps: 8,200/day</Text>
                </View>
              </View>
              
              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Calendar size={20} color="#6B7280" />
                  <Text style={styles.historyTitle}>This Month</Text>
                </View>
                <Text style={styles.historyText}>
                  Overall health trending positive with consistent metrics
                </Text>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>Weight: Stable</Text>
                  <Text style={styles.historyStat}>Blood Pressure: Normal</Text>
                  <Text style={styles.historyStat}>Activity: Above average</Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
  addButton: {
    backgroundColor: '#0066CC',
    borderRadius: 20,
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066CC',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  activeTabText: {
    color: '#0066CC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  metricsContainer: {
    paddingVertical: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendIndicator: {
    padding: 2,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  metricName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 4,
  },
  metricTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginTop: 8,
  },
  symptomsContainer: {
    paddingVertical: 16,
  },
  symptomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  symptomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symptomName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  symptomDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  symptomNotes: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  addSymptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
  },
  addSymptomText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  historyContainer: {
    paddingVertical: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  historyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  historyStats: {
    gap: 4,
  },
  historyStat: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
});