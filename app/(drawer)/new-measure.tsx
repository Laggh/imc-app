import { Card } from '@/components/ui/card';
import { CustomInput } from '@/components/ui/custom-input';
import { PrimaryButton } from '@/components/ui/primary-button';
import { useIMC } from '@/context/IMCContext';
import { useTheme } from '@/context/ThemeContext';
import {
    calculateIMC,
    calculateWeightDifference,
    formatNumber,
    getIMCCategory,
} from '@/utils/imc-calculator';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function NewMeasureScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addRecord } = useIMC();

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [preview, setPreview] = useState<any>(null);

  const handleCalculate = () => {
    if (!weight || !height) {
      Alert.alert('Erro', 'Por favor, preencha peso e altura');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w <= 0 || h <= 0) {
      Alert.alert('Erro', 'Peso e altura devem ser maiores que 0');
      return;
    }

    if (h > 3) {
      Alert.alert('Erro', 'Altura parece estar incorreta. Use valores em metros (ex: 1.75)');
      return;
    }

    const imc = calculateIMC(w, h);
    const category = getIMCCategory(imc);
    const weightDiff = calculateWeightDifference(w, h);

    setPreview({
      weight: w,
      height: h,
      imc: Math.round(imc * 100) / 100,
      category,
      weightDifference: Math.round(weightDiff * 100) / 100,
    });
  };

  const handleSave = () => {
    if (!preview) {
      handleCalculate();
      return;
    }

    try {
      addRecord(preview.weight, preview.height);
      Alert.alert('Sucesso', 'Medida salva com sucesso!', [
        {
          text: 'Voltar',
          onPress: () => {
            router.back();
          },
        },
      ]);
      setWeight('');
      setHeight('');
      setPreview(null);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar medida');
    }
  };

  const getWeightMessage = (): string => {
    if (!preview) return '';
    const diff = preview.weightDifference;
    if (diff > 0) {
      return `você está ${formatNumber(diff)}kg acima do peso ideal`;
    } else if (diff < 0) {
      return `você está ${formatNumber(Math.abs(diff))}kg abaixo do peso ideal`;
    }
    return 'seu peso está ideal!';
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
            name="chevron-back"
            size={28}
            color={theme.colors.primary}
            onPress={() => router.back()}
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Nova Medida
          </Text>
        </View>

        <Card style={styles.formCard}>
          <CustomInput
            label="Peso (kg)"
            value={weight}
            onChangeText={setWeight}
            placeholder="Ex: 75.5"
          />
          <CustomInput
            label="Altura (m)"
            value={height}
            onChangeText={setHeight}
            placeholder="Ex: 1.75"
          />

          {preview && (
            <Card style={styles.previewCard}>
              <View style={styles.previewRow}>
                <Text style={[styles.previewLabel, { color: theme.colors.icon }]}>
                  IMC
                </Text>
                <Text style={[styles.previewValue, { color: theme.colors.primary }]}>
                  {preview.imc}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.previewRow}>
                <Text style={[styles.previewLabel, { color: theme.colors.icon }]}>
                  Categoria
                </Text>
                <Text style={[styles.previewValue, { color: theme.colors.text }]}>
                  {preview.category}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.previewRow}>
                <Text style={[styles.previewLabel, { color: theme.colors.icon }]}>
                  Status de Peso
                </Text>
                <Text
                  style={[
                    styles.previewValue,
                    {
                      color: preview.weightDifference > 0 
                        ? '#EF4444' 
                        : preview.weightDifference < 0 
                        ? '#3B82F6' 
                        : theme.colors.primary,
                    },
                  ]}
                >
                  {getWeightMessage()}
                </Text>
              </View>
            </Card>
          )}
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={preview ? 'Salvar Medida' : 'Calcular'}
          onPress={preview ? handleSave : handleCalculate}
          style={styles.button}
        />
        {preview && (
          <PrimaryButton
            label="Voltar"
            onPress={() => setPreview(null)}
          />
        )}
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
    paddingBottom: 140,
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
  formCard: {
    paddingBottom: 20,
  },
  previewCard: {
    marginTop: 16,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
  },
});
