/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Cores verdes para o app de IMC
const tintColorLight = '#10B981'; // Verde principal
const tintColorDark = '#86EFAC'; // Verde claro

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#F0FDF4',
    tint: tintColorLight,
    icon: '#059669',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#10B981',
    primary: '#10B981',
    primaryDark: '#059669',
    primaryLight: '#D1FAE5',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  dark: {
    text: '#F0FDF4',
    background: '#064E3B',
    tint: tintColorDark,
    icon: '#10B981',
    tabIconDefault: '#A3E635',
    tabIconSelected: '#86EFAC',
    primary: '#10B981',
    primaryDark: '#059669',
    primaryLight: '#D1FAE5',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
