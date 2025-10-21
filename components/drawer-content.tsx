import { useDrawer } from '@/context/DrawerContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface DrawerItem {
  label: string;
  icon: string;
  route: string;
}

const DRAWER_ITEMS: DrawerItem[] = [
  {
    label: 'Início',
    icon: 'home',
    route: 'home',
  },
  {
    label: 'Histórico',
    icon: 'time',
    route: 'history',
  },
  {
    label: 'Configurações',
    icon: 'settings',
    route: 'settings',
  },
  {
    label: 'Sobre',
    icon: 'information-circle',
    route: 'about',
  },
];

export const DrawerContent: React.FC<{ state?: any; navigation?: any }> = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { closeDrawer } = useDrawer();

  const handleNavigate = (route: string) => {
    if (route === 'home') {
      router.push('/(drawer)/home');
    } else if (route === 'history') {
      router.push('/(drawer)/history');
    } else if (route === 'settings') {
      router.push('/(drawer)/settings');
    } else if (route === 'about') {
      router.push('/(drawer)/about');
    }
    closeDrawer();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name="calculator"
          size={40}
          color={theme.colors.primary}
        />
        <Text style={[styles.appTitle, { color: theme.colors.text }]}>
          IMC App
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.divider }]} />

      <View style={styles.menuContainer}>
        {DRAWER_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => handleNavigate(item.route)}
            style={[
              styles.menuItem,
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={theme.colors.primary}
              style={styles.menuIcon}
            />
            <Text
              style={[
                styles.menuLabel,
                {
                  color: theme.colors.text,
                  fontWeight: '500',
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.icon }]}>
          v1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
