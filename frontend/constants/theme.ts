/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2563EB'; // Professional "Action" Blue
const tintColorDark = '#60A5FA';  // Lighter blue for dark mode visibility

export const Colors = {
  light: {
    title: '#1E293B',
    text: '#1E293B',        // Slate Dark (Better than pure black)
    navBackground: '#dbdbdb',
    background: '#F8FAFC',  // Light Grey-Blue background
    tint: tintColorLight,
    icon: '#64748B',        // Muted Slate for inactive icons
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorLight,
    // Adding POS specific functional colors
    success: '#10B981',
    danger: '#EF4444',
    border: '#E2E8F0',
  },
  dark: {
    title: '#F1F5F9',
    text: '#F1F5F9',        // Soft white
    navBackground: '#2b2b2b',
    background: '#0F172A',  // Deep Navy (Professional Dark Mode)
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorDark,
    success: '#34D399',
    danger: '#F87171',
    border: '#1E293B',
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
