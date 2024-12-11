import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { styles } from './styles';

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veja como funciona:</Text>
      {children}
    </View>
  );
}
