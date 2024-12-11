import { Text, View } from 'react-native';
import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react-native';

import { styles } from './styles';
import { colors } from '@/styles/colors';

interface StepProps {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export function Step({ icon: Icon, title, description }: StepProps) {
  return (
    <View style={styles.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
