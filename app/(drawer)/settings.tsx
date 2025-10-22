import { Card } from '@/components/ui/card';
import { useDrawer } from '@/context/DrawerContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const { openDrawer } = useDrawer();
  const { currentTheme, setTheme, theme, availableThemes } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name="menu"
          size={28}
          color={theme.colors.primary}
          onPress={openDrawer}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Configurações
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Tema
          </Text>
          
          <View style={styles.themeGrid}>
            {availableThemes.map((t) => (
              <TouchableOpacity
                key={t.name}
                onPress={() => setTheme(t.name)}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: t.colors.background,
                    borderColor: currentTheme === t.name ? theme.colors.primary : theme.colors.divider,
                    borderWidth: currentTheme === t.name ? 3 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.themePreview,
                    {
                      backgroundColor: t.colors.primary,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.themeLabel,
                    {
                      color: t.colors.text,
                      fontWeight: currentTheme === t.name ? '700' : '500',
                    },
                  ]}
                >
                  {t.label}
                </Text>
                {currentTheme === t.name && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.colors.primary}
                    style={styles.checkmark}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sobre
          </Text>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.icon }]}>
              Versão
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              1.0.0
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.divider }]} />
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.icon }]}>
              Desenvolvedor
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              Seu Nome
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
    marginHorizontal: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  themeOption: {
    width: '31%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeLabel: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
});
