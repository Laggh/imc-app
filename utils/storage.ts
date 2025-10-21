import { IMCRecord } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IMC_STORAGE_KEY = 'imc_records';

export const saveRecords = async (records: IMCRecord[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(IMC_STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Erro ao salvar registros de IMC:', error);
    throw error;
  }
};

export const loadRecords = async (): Promise<IMCRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(IMC_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as IMCRecord[];
  } catch (error) {
    console.error('Erro ao carregar registros de IMC:', error);
    return [];
  }
};

export const deleteRecord = async (records: IMCRecord[], id: string): Promise<IMCRecord[]> => {
  try {
    const filtered = records.filter(record => record.id !== id);
    await saveRecords(filtered);
    return filtered;
  } catch (error) {
    console.error('Erro ao deletar registro de IMC:', error);
    throw error;
  }
};
