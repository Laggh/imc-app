import { DrawerContent } from '@/components/drawer-content';
import { DrawerProvider, useDrawer } from '@/context/DrawerContext';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

function DrawerLayoutContent() {
  const { isOpen, closeDrawer } = useDrawer();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="new-measure" />
        <Stack.Screen name="history" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="about" />
      </Stack>

      {isOpen && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={closeDrawer}
            activeOpacity={1}
          />
          <View
            style={[
              styles.drawerContainer,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <DrawerContent
              state={{ index: 0 }}
              navigation={{
                navigate: () => {
                  closeDrawer();
                },
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <DrawerProvider>
      <DrawerLayoutContent />
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 11,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
