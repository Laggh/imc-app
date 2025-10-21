# IMC App - Calculadora de IMC 📱

Um aplicativo mobile moderno e intuitivo para calcular e acompanhar seu Índice de Massa Corporal (IMC).

## 🌟 Características

- ✅ **Cálculo de IMC**: Calcule com precisão seu Índice de Massa Corporal
- ✅ **Classificação Automática**: Saiba em qual faixa você se encontra (Abaixo do peso, Normal, Sobrepeso, etc.)
- ✅ **Análise de Peso Ideal**: Veja quantos kg você está acima ou abaixo do peso ideal
- ✅ **Histórico de Medidas**: Acompanhe todas as suas medições anteriores
- ✅ **Design Responsivo**: Interface bonita com tons de verde
- ✅ **Tema Claro/Escuro**: Suporte para modo claro e escuro
- ✅ **Armazenamento Local**: Seus dados são salvos no dispositivo

## 📋 Requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI

## 🚀 Como Começar

1. **Instale as dependências**

   ```bash
   npm install
   ```

2. **Inicie o aplicativo**

   ```bash
   npx expo start
   ```

3. **Execute em seu dispositivo**
   - Escaneie o código QR com o Expo Go (Android/iOS)
   - Ou pressione `i` para iOS simulator
   - Ou pressione `a` para Android emulator

## 📱 Telas do Aplicativo

### 1. Tela Principal (Home)
- Exibe o último IMC registrado em grande destaque
- Mostra a classificação do IMC (cor-codificada)
- Indica se você está acima ou abaixo do peso ideal
- Exibe peso, altura e data da última medição
- Botão flutuante para registrar nova medida

### 2. Tela de Nova Medida
- Formulário para registrar peso (kg) e altura (m)
- Preview do cálculo antes de salvar
- Mostra o IMC calculado, categoria e diferença de peso ideal
- Salva automaticamente no histórico

### 3. Tela de Histórico
- Lista todas as medidas anteriores
- Exibe IMC, categoria, peso, altura e data
- Possibilidade de deletar registros
- Ordenação por data (mais recente primeiro)

### 4. Tela Sobre
- Informações sobre o aplicativo
- Seus dados pessoais de desenvolvedor
- Recursos principais listados
- Aviso legal importante

## 🎨 Paleta de Cores

O app usa tons de verde como cor principal:
- **Verde Principal**: #10B981
- **Verde Escuro**: #059669
- **Verde Claro**: #D1FAE5
- **Fundo Claro**: #F0FDF4
- **Fundo Escuro**: #064E3B

## 📊 Faixas de IMC

- **Abaixo do peso**: IMC < 18.5
- **Peso normal**: 18.5 ≤ IMC < 25
- **Sobrepeso**: 25 ≤ IMC < 30
- **Obesidade Grau I**: 30 ≤ IMC < 35
- **Obesidade Grau II**: 35 ≤ IMC < 40
- **Obesidade Grau III**: IMC ≥ 40

## 🔒 Armazenamento de Dados

Os dados de IMC são armazenados localmente usando localStorage. Nenhum dado é enviado para servidores externos. Seus dados permanecem privados no seu dispositivo.

## 🤝 Contribuindo

Sinta-se livre para fazer fork deste projeto e contribuir com melhorias!

## ⚖️ Aviso Legal

Este aplicativo é apenas para fins informativos. **NÃO é um substituto para aconselhamento médico profissional**. Sempre consulte um profissional de saúde qualificado para orientação personalizada sobre seu peso e saúde.

## 📄 Licença

Este projeto está sob a licença MIT.

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
