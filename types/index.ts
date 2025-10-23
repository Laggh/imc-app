export interface IMCRecord {
  id: string;
  weight: number; // em kg
  height: number; // em metros
  imc: number;
  category: string;
  weightDifference: number; // positivo = acima do peso, negativo = abaixo
  date: string;
}

export interface IMCContextType {
  records: IMCRecord[];
  currentRecord: IMCRecord | null;
  addRecord: (weight: number, height: number) => IMCRecord;
  getLastRecord: () => IMCRecord | null;
  getAllRecords: () => IMCRecord[];
  deleteRecord: (id: string) => Promise<boolean>;
  loadRecords: () => Promise<void>;
}
