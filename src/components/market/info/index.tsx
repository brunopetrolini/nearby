import { Text, View } from 'react-native';
import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react-native';

import { styles } from './styles';
import { colors } from '@/styles/theme';

interface InfoProps {
  description: string;
  icon: ComponentType<IconProps>;
}

export function Info({ description, icon: Icon }: InfoProps) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
