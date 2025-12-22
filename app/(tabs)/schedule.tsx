import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  venue?: string;
  speaker?: string;
  designation?: string;
  type: 'session' | 'break';
  details?: {
    role: string;
    name: string;
    designation: string;
  }[];
}

const SCHEDULE_DAY1: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 - 10:00',
    title: 'REGISTRATION & BREAKFAST',
    venue: 'Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik',
    type: 'break',
  },
  {
    id: '2',
    time: '10:00 - 11:00',
    title: 'Inauguration of Event',
    details: [
      {
        role: 'Inaugural Address',
        name: 'Hon. Shri. Sameer Bhujbal & Hon. Dr. Shefali Bhujbal',
        designation: 'CEO, Bhujbal Knowledge City, Mumbai Educational Trust, Nashik'
      },
      {
        role: 'Key Note',
        name: 'Dr. Sanjay J. Kshirsagar',
        designation: 'Principal, MET\'s Institute of Pharmacy, Nashik'
      },
      {
        role: 'Guest of Honor',
        name: 'Dr. Suchita Lokhande',
        designation: 'Scientist D, Department of Science & Technology, Govt of India, New Delhi'
      },
      {
        role: 'Chief Guest',
        name: 'Dr. Ulhas Dhuppad',
        designation: 'President and Head of Global Pharmaceutical Development, Glenmark Pharmaceuticals Limited, Nashik'
      }
    ],
    type: 'session',
  },
  {
    id: '3',
    time: '11:00 - 12:00',
    title: 'Natural non-antibiotic antimicrobials for the skincare treatment',
    speaker: 'Dr. Zyta Ziora',
    designation: 'IITC Institute for Molecular Bioscience, The University of Queensland, Australia',
    type: 'session',
  },
  {
    id: '4',
    time: '12:00 - 01:00',
    title: 'LUNCH BREAK (Poster Presentation)',
    venue: 'Meenatai Bhujbal School, MET Campus, Bhujbal Knowledge City, Nashik',
    type: 'break',
  },
];

const SCHEDULE_DAY2: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 - 10:00',
    title: 'BREAKFAST',
    venue: 'Meenatai Bhujbal School, M.P. Hall, MET Campus',
    type: 'break',
  },
  {
    id: '2',
    time: '10:00 - 11:00',
    title: 'Expert Session - Day 2',
    speaker: 'To Be Announced',
    type: 'session',
  },
  {
    id: '3',
    time: '11:00 - 12:00',
    title: 'Panel Discussion',
    venue: 'Main Hall',
    type: 'session',
  },
  {
    id: '4',
    time: '12:00 - 01:00',
    title: 'LUNCH BREAK',
    venue: 'Meenatai Bhujbal School, MET Campus',
    type: 'break',
  },
  {
    id: '5',
    time: '01:00 - 02:00',
    title: 'Closing Ceremony',
    type: 'session',
  },
];

const TRACKS = ['All', 'Sessions', 'Breaks'];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentSchedule = () => {
    return selectedDay === 1 ? SCHEDULE_DAY1 : SCHEDULE_DAY2;
  };

  const getFilteredSchedule = () => {
    const schedule = getCurrentSchedule();
    if (selectedTrack === 'All') return schedule;
    if (selectedTrack === 'Sessions') return schedule.filter(item => item.type === 'session');
    if (selectedTrack === 'Breaks') return schedule.filter(item => item.type === 'break');
    return schedule;
  };

  const isHappeningNow = (timeSlot: string) => {
    const confDay = selectedDay === 1 ? 9 : 10;
    if (currentTime.getDate() !== confDay || currentTime.getMonth() !== 0 || currentTime.getFullYear() !== 2026) {
      return false;
    }

    const [startTime, endTime] = timeSlot.split(' - ');
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const currentMinutes = currentHour * 60 + currentMin;
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  };

  const handleExportCalendar = () => {
    Alert.alert(
      'Export to Calendar',
      'This will create calendar events for all sessions. Feature coming soon!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Scientific Schedule</Text>
          
          <View style={styles.daySelectorContainer}>
            <TouchableOpacity
              style={[styles.dayButton, selectedDay === 1 && styles.dayButtonActive]}
              onPress={() => setSelectedDay(1)}
            >
              <MaterialIcons name="calendar-today" size={18} color={selectedDay === 1 ? '#fff' : '#E31E24'} />
              <Text style={[styles.dayButtonText, selectedDay === 1 && styles.dayButtonTextActive]}>
                Day 1 (Jan 9)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dayButton, selectedDay === 2 && styles.dayButtonActive]}
              onPress={() => setSelectedDay(2)}
            >
              <MaterialIcons name="calendar-today" size={18} color={selectedDay === 2 ? '#fff' : '#E31E24'} />
              <Text style={[styles.dayButtonText, selectedDay === 2 && styles.dayButtonTextActive]}>
                Day 2 (Jan 10)
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.exportButton} onPress={handleExportCalendar}>
            <MaterialIcons name="file-download" size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export to Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TRACKS.map((track) => (
              <TouchableOpacity
                key={track}
                style={[styles.filterButton, selectedTrack === track && styles.filterButtonActive]}
                onPress={() => setSelectedTrack(track)}
              >
                <Text style={[styles.filterButtonText, selectedTrack === track && styles.filterButtonTextActive]}>
                  {track}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.timelineContainer}>
          {getFilteredSchedule().map((item) => {
            const onNow = isHappeningNow(item.time);
            return (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeText}>{item.time.split(' - ')[0]}</Text>
                  <Text style={styles.timeSubText}>{item.time.split(' - ')[1]}</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.contentColumn}>
                  <View style={[styles.card, item.type === 'break' ? styles.breakCard : styles.sessionCard, onNow && styles.onNowCard]}>
                    {onNow && (
                      <View style={styles.onNowBadge}>
                        <MaterialIcons name="play-circle-filled" size={16} color="#fff" />
                        <Text style={styles.onNowText}>ON NOW</Text>
                      </View>
                    )}
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    
                    {item.venue && (
                      <View style={styles.venueContainer}>
                        <MaterialIcons name="location-on" size={16} color="#666" />
                        <Text style={styles.venueText}>{item.venue}</Text>
                      </View>
                    )}

                    {item.speaker && (
                      <View style={styles.speakerContainer}>
                        <MaterialIcons name="person" size={16} color="#E31E24" style={{ marginTop: 2 }} />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.speakerName}>{item.speaker}</Text>
                          {item.designation && <Text style={styles.speakerDesignation}>{item.designation}</Text>}
                        </View>
                      </View>
                    )}

                    {item.details && item.details.map((detail, idx) => (
                      <View key={idx} style={styles.detailItem}>
                        <Text style={styles.detailRole}>{detail.role}</Text>
                        <Text style={styles.detailName}>{detail.name}</Text>
                        <Text style={styles.detailDesignation}>{detail.designation}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#E31E24',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  daySelectorContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  dayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  dayButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dayButtonText: {
    color: '#E31E24',
    fontWeight: '600',
    fontSize: 13,
  },
  dayButtonTextActive: {
    color: '#fff',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#E31E24',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  timelineContainer: {
    padding: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  timeSubText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  contentColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
  },
  sessionCard: {
    borderLeftColor: '#E31E24',
  },
  breakCard: {
    borderLeftColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  onNowCard: {
    borderWidth: 2,
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  onNowBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    gap: 5,
  },
  onNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  venueContainer: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5,
  },
  venueText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  speakerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  speakerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E31E24',
    flexWrap: 'wrap',
  },
  speakerDesignation: {
    fontSize: 12,
    color: '#555',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  detailItem: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  detailRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 2,
  },
  detailName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  detailDesignation: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
