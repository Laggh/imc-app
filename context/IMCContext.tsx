import { IMCContextType, IMCRecord } from '@/types';
import {
    calculateIMC,
    calculateWeightDifference,
    getIMCCategory
} from '@/utils/imc-calculator';
import React, { createContext, useContext, useEffect, useState } from 'react';

const IMCContext = createContext<IMCContextType | undefined>(undefined);

export const IMCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<IMCRecord[]>([]);
  const [currentRecord, setCurrentRecord] = useState<IMCRecord | null>(null);

  // Carrega registros do storage ao inicializar
  useEffect(() => {
    loadRecordsFromStorage();
  }, []);

  const loadRecordsFromStorage = async () => {
    try {
      const saved = localStorage.getItem('imc_records');
      if (saved) {
        const parsed = JSON.parse(saved);
        setRecords(parsed);
        if (parsed.length > 0) {
          setCurrentRecord(parsed[parsed.length - 1]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  const saveRecordsToStorage = (newRecords: IMCRecord[]) => {
    try {
      console.log('[IMCContext] Salvando', newRecords.length, 'registros no localStorage');
      localStorage.setItem('imc_records', JSON.stringify(newRecords));
      console.log('[IMCContext] Registros salvos com sucesso no localStorage');
      return true;
    } catch (error) {
      console.error('Erro ao salvar registros:', error);
      return false;
    }
  };

  const addRecord = (weight: number, height: number): IMCRecord => {
    const imc = calculateIMC(weight, height);
    const category = getIMCCategory(imc);
    const weightDifference = calculateWeightDifference(weight, height);

    const newRecord: IMCRecord = {
      id: Date.now().toString(),
      weight,
      height,
      imc: Math.round(imc * 100) / 100,
      category,
      weightDifference: Math.round(weightDifference * 100) / 100,
      date: new Date().toLocaleString('pt-BR'),
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    setCurrentRecord(newRecord);
    saveRecordsToStorage(updatedRecords);

    return newRecord;
  };

  const getLastRecord = (): IMCRecord | null => {
    return currentRecord || (records.length > 0 ? records[records.length - 1] : null);
  };

  const getAllRecords = (): IMCRecord[] => {
    console.log('[IMCContext] getAllRecords chamado, registros disponíveis:', records.length);
    const result = [...records].reverse(); // Retorna em ordem reversa (mais recente primeiro)
    console.log('[IMCContext] Retornando registros revertidos:', result.length);
    return result;
  };

  const deleteRecord = (id: string) => {
    console.log('[IMCContext] Deletando registro com ID:', id);
    console.log('[IMCContext] Total de registros antes:', records.length);
    const filtered = records.filter(record => record.id !== id);
    console.log('[IMCContext] Total de registros depois:', filtered.length);
    
    // Salva no storage ANTES de atualizar o state
    const saved = saveRecordsToStorage(filtered);
    
    if (saved) {
      // Só atualiza o state APÓS confirmar salvação no storage
      setRecords(filtered);
      if (currentRecord?.id === id) {
        setCurrentRecord(filtered.length > 0 ? filtered[filtered.length - 1] : null);
      }
      console.log('[IMCContext] Registro deletado e estado atualizado');
    } else {
      console.error('[IMCContext] Falha ao salvar no storage, operação cancelada');
    }
  };

  const loadRecords = async () => {
    await loadRecordsFromStorage();
  };

  const value: IMCContextType = {
    records,
    currentRecord,
    addRecord,
    getLastRecord,
    getAllRecords,
    deleteRecord,
    loadRecords,
  };

  return <IMCContext.Provider value={value}>{children}</IMCContext.Provider>;
};

export const useIMC = () => {
  const context = useContext(IMCContext);
  if (!context) {
    throw new Error('useIMC deve ser usado dentro de IMCProvider');
  }
  return context;
};
