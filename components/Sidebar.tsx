import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { title: 'Home', path: '/(tabs)/index', icon: 'house.fill' },
  { title: 'About', path: '/(tabs)/about', icon: 'info.circle.fill' },
  { title: 'Speakers', path: '/(tabs)/speakers', icon: 'person.3.fill' },
  { title: 'Schedule', path: '/(tabs)/schedule', icon: 'calendar' },
  { title: 'Registration', path: '/(tabs)/registration', icon: 'doc.text.fill' },
  { title: 'Contact', path: '/(tabs)/explore', icon: 'envelope.fill' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  return (
    <View style={styles.sidebar}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MET-I-CON</Text>
          <Text style={styles.headerSubtitle}>2026</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => navigateTo(item.path)}
              >
                <IconSymbol
                  name={item.icon as any}
                  size={20}
                  color={isActive ? '#E31E24' : '#666'}
                />
                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventDate}>9-10 Jan 2026</Text>
          <Text style={styles.eventLocation}>Pharmaceutical Conference</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E31E24',
    fontWeight: 'bold',
  },
  menu: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#E31E24',
  },
  menuText: {
    fontSize: 16,
    color: '#666',
  },
  menuTextActive: {
    color: '#E31E24',
    fontWeight: 'bold',
  },
  eventInfo: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E31E24',
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
  },
});
