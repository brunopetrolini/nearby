import { Pressable, Text, type PressableProps } from 'react-native';

import { styles } from './styles';
import { categoriesIcons } from '@/utils/categories-icons';
import { colors } from '@/styles/theme';

export type CategoryData = {
  id: string;
  name: string;
};

type CategoryProps = PressableProps & {
  iconId: string;
  name: string;
  isSelected?: boolean;
};

export function Category({ iconId, name, isSelected = false, ...props }: CategoryProps) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable style={[styles.container, isSelected && styles.selectedContainer]} {...props}>
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styles.name, isSelected && styles.selectedName]}>{name}</Text>
    </Pressable>
  );
}
