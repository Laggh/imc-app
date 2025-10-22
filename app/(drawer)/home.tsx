import { Card } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/primary-button';
import { useDrawer } from '@/context/DrawerContext';
import { useIMC } from '@/context/IMCContext';
import { useTheme } from '@/context/ThemeContext';
import { getIMCColor } from '@/utils/imc-calculator';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const { theme } = useTheme();
  const { currentRecord } = useIMC();

  const handleNewMeasure = () => {
    router.push('/(drawer)/new-measure');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="menu"
            size={28}
            color={theme.colors.primary}
            onPress={openDrawer}
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Seu IMC
          </Text>
        </View>

        {currentRecord ? (
          <>
            <Card style={styles.imcCard}>
              <Text
                style={[
                  styles.imcCategoryBig,
                  { color: getIMCColor(currentRecord.category) },
                ]}
              >
                {currentRecord.category} (IMC {currentRecord.imc})
              </Text>
            </Card>

            <Card style={styles.infoCard}>
              <Text style={[styles.infoTextLabel, { color: theme.colors.icon }]}>
                Peso Ideal
              </Text>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoTextPrefix, { color: theme.colors.text }]}>
                  Você está
                </Text>
                <Text
                  style={[
                    styles.infoTextBold,
                    {
                      color: currentRecord.weightDifference > 0 ? '#EF4444' : '#10B981',
                    },
                  ]}
                >
                  {Math.abs(currentRecord.weightDifference).toFixed(2)}kg
                </Text>
                <Text style={[styles.infoTextSuffix, { color: theme.colors.text }]}>
                  {(() => {
                    console.log('[Home] weightDifference:', currentRecord.weightDifference);
                    return currentRecord.weightDifference > 0 ? 'acima' : 'abaixo';
                  })()} do peso ideal
                </Text>
              </View>
            </Card>

            <View style={styles.measurementCard}>
              <View style={styles.measurementRow}>
                <Text style={[styles.measurementLabel, { color: theme.colors.icon }]}>
                  Peso
                </Text>
                <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                  {currentRecord.weight}kg
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.measurementRow}>
                <Text style={[styles.measurementLabel, { color: theme.colors.icon }]}>
                  Altura
                </Text>
                <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                  {currentRecord.height}m
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.measurementRow}>
                <Text style={[styles.measurementLabel, { color: theme.colors.icon }]}>
                  Data
                </Text>
                <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                  {currentRecord.date}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Card style={styles.noDataCard}>
            <Ionicons
              name="information-circle-outline"
              size={48}
              color={theme.colors.primary}
              style={{ marginBottom: 12, alignSelf: 'center' }}
            />
            <Text
              style={[
                styles.noDataText,
                { color: theme.colors.text },
              ]}
            >
              Nenhuma medida registrada ainda.
            </Text>
            <Text
              style={[
                styles.noDataSubtext,
                { color: theme.colors.icon },
              ]}
            >
              Registre sua primeira medida para começar!
            </Text>
          </Card>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="+ Nova Medida"
          onPress={handleNewMeasure}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  imcCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    marginBottom: 20,
  },
  imcValue: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 8,
  },
  imcCategory: {
    fontSize: 18,
    fontWeight: '600',
  },
  imcCategoryBig: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  infoCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoTextLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  infoTextPrefix: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoTextBold: {
    fontSize: 24,
    fontWeight: '700',
  },
  infoTextSuffix: {
    fontSize: 18,
    fontWeight: '500',
  },
  measurementCard: {
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  measurementLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  noDataCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noDataSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
  },
});
