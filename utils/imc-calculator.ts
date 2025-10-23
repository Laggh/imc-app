// Funções para calcular IMC e categoria
export const calculateIMC = (weight: number, height: number): number => {
  if (height <= 0 || weight <= 0) return 0;
  return weight / (height * height);
};

export const getIMCCategory = (imc: number): string => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade Grau I';
  if (imc < 40) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
};

// Calcula o peso ideal baseado na altura e IMC atual
// Se IMC >= 25: calcula com IMC 25 (quanto falta para descer)
// Se IMC < 20: calcula com IMC 20 (quanto falta para subir)
// Se 20 <= IMC < 25: está na faixa ideal
export const calculateIdealWeight = (height: number, weight: number): number => {
  const currentIMC = calculateIMC(weight, height);
  
  if (currentIMC >= 25) {
    // Acima do peso: calcula com IMC 25
    return height * height * 25;
  } else if (currentIMC < 20) {
    // Abaixo do peso: calcula com IMC 20
    return height * height * 20;
  } else {
    // Na faixa ideal: retorna o peso atual
    return weight;
  }
};

// Calcula a diferença de peso (positivo = acima, negativo = abaixo)
// Também fornece informação sobre qual IMC limite está sendo usado
export const calculateWeightDifference = (weight: number, height: number): number => {
  const idealWeight = calculateIdealWeight(height, weight);
  return weight - idealWeight;
};

// Formata um número para 2 casas decimais
export const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

// Obtém a cor baseada na categoria de IMC
export const getIMCColor = (category: string): string => {
  switch (category) {
    case 'Abaixo do peso':
      return '#3B82F6'; // Azul
    case 'Peso normal':
      return '#10B981'; // Verde
    case 'Sobrepeso':
      return '#F59E0B'; // Amarelo
    case 'Obesidade Grau I':
      return '#EF4444'; // Vermelho
    case 'Obesidade Grau II':
      return '#DC2626'; // Vermelho escuro
    case 'Obesidade Grau III':
      return '#7F1D1D'; // Vermelho muito escuro
    default:
      return '#6B7280'; // Cinza
  }
};
