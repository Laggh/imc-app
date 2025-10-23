import { Alert, Platform } from 'react-native';

/**
 * Mostra um alerta adaptado à plataforma
 * - Em plataformas nativas (iOS, Android): usa Alert.alert do React Native
 * - Na web: usa window.alert
 * @param title - Título do alerta
 * @param message - Mensagem do alerta
 */
export const showAlert = (title: string, message?: string): void => {
  if (Platform.OS === 'web') {
    // Na web, usa o alert nativo do navegador
    if (message) {
      window.alert(`${title}\n\n${message}`);
    } else {
      window.alert(title);
    }
  } else {
    // Em plataformas nativas (iOS, Android), usa Alert.alert
    if (message) {
      Alert.alert(title, message);
    } else {
      Alert.alert(title);
    }
  }
};

/**
 * Mostra um alerta de sucesso
 * @param message - Mensagem de sucesso
 */
export const showSuccessAlert = (message: string): void => {
  showAlert('Sucesso', message);
};

/**
 * Mostra um alerta de erro
 * @param message - Mensagem de erro
 */
export const showErrorAlert = (message: string): void => {
  showAlert('Erro', message);
};

/**
 * Mostra um alerta de confirmação com callbacks
 * @param title - Título do alerta
 * @param message - Mensagem do alerta
 * @param onConfirm - Callback quando o usuário confirma
 * @param onCancel - Callback quando o usuário cancela (opcional)
 */
export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  if (Platform.OS === 'web') {
    // Na web, usa window.confirm
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  } else {
    // Em plataformas nativas, usa Alert.alert com botões
    Alert.alert(title, message, [
      {
        text: 'Cancelar',
        onPress: onCancel || (() => {}),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: onConfirm,
        style: 'default',
      },
    ]);
  }
};
