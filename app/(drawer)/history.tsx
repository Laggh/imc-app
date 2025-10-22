import { Card } from '@/components/ui/card';
import { useDrawer } from '@/context/DrawerContext';
import { useIMC } from '@/context/IMCContext';
import { useTheme } from '@/context/ThemeContext';
import { IMCRecord } from '@/types';
import { getIMCColor } from '@/utils/imc-calculator';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HistoryScreen() {
  const { openDrawer } = useDrawer();
  const { theme } = useTheme();
  const { getAllRecords, deleteRecord } = useIMC();
  const [records, setRecords] = useState<IMCRecord[]>([]);

  const loadRecords = useCallback(() => {
    console.log('[History] Carregando registros...');
    const allRecords = getAllRecords();
    console.log('[History] Registros carregados:', allRecords.length);
    console.log('[History] Dados dos registros:', allRecords);
    setRecords(allRecords);
  }, [getAllRecords]);

  useFocusEffect(
    React.useCallback(() => {
      loadRecords();
    }, [loadRecords])
  );

  const handleDelete = (id: string) => {
    console.log('[History] Tentando deletar registro com ID:', id);
    const confirmed = window.confirm('Você tem certeza que deseja deletar este registro?');
    
    if (confirmed) {
      console.log('[History] Usuário confirmou a deleção');
      console.log('[History] Executando deleteRecord com ID:', id);
      deleteRecord(id);
      console.log('[History] deleteRecord executado, chamando loadRecords');
      setTimeout(() => {
        console.log('[History] Timeout 500ms chamando loadRecords');
        loadRecords();
        console.log('[History] loadRecords executado');
      }, 500);
    } else {
      console.log('[History] Deleção cancelada pelo usuário');
    }
  };

  const getDaysAgo = (dateString: string): string => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Formato da data: "DD/MM/YYYY, HH:MM:SS"
      // Extrai apenas "DD/MM/YYYY"
      const datePart = dateString.split(',')[0].trim();
      const [day, month, year] = datePart.split('/').map(Number);
      
      console.log('[History] getDaysAgo - datePart:', datePart, 'day:', day, 'month:', month, 'year:', year);
      
      const recordDate = new Date(year, month - 1, day);
      recordDate.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - recordDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      console.log('[History] getDaysAgo - diffDays:', diffDays);
      
      if (diffDays === 0) return 'Hoje';
      if (diffDays === 1) return 'Ontem';
      if (diffDays < 7) return 'Essa semana';
      return `Há ${diffDays} dias`;
    } catch (error) {
      console.error('[History] Erro em getDaysAgo:', error);
      return 'Data inválida';
    }
  };

  const renderRecord = ({ item }: { item: IMCRecord }) => (
    <Card style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.recordInfo}>
          <View style={styles.recordRow}>
            <Text style={[styles.recordLabel, { color: theme.colors.icon }]}>
              IMC
            </Text>
            <Text
              style={[
                styles.recordValue,
                { color: getIMCColor(item.category) },
              ]}
            >
              {item.imc}
            </Text>
          </View>
          <Text style={[styles.recordCategory, { color: theme.colors.text }]}>
            {item.category}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('[History] TouchableOpacity pressionado com ID:', item.id);
            handleDelete(item.id);
          }}
          activeOpacity={0.6}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.recordDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.icon }]}>
            Peso
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {item.weight}kg
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.icon }]}>
            Altura
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {item.height}m
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.icon }]}>
            Peso ideal
          </Text>
          <Text
            style={[
              styles.detailValue,
              {
                color: item.weightDifference > 0 ? '#EF4444' : '#10B981',
              },
            ]}
          >
            {item.weightDifference > 0 ? '+' : ''}{item.weightDifference.toFixed(2)}kg ({item.weightDifference > 0 ? 'acima' : 'abaixo'})
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.icon }]}>
            Data
          </Text>
          <View style={styles.dateContainer}>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.date}
            </Text>
            <Text style={[styles.daysAgo, { color: theme.colors.icon }]}>
              {getDaysAgo(item.date)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

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
          Histórico
        </Text>
      </View>

      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-text-outline"
            size={48}
            color={theme.colors.primary}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={[
              styles.emptyText,
              { color: theme.colors.text },
            ]}
          >
            Nenhum registro encontrado
          </Text>
        </View>
      ) : (
        <FlatList
          data={records}
          renderItem={renderRecord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
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
    paddingHorizontal: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  recordCard: {
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recordRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  recordLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  recordValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  recordCategory: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  daysAgo: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
