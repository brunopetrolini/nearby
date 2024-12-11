import { FlatList } from 'react-native';

import { Category, type CategoryData } from '../category';
import { styles } from './styles';

interface CategoriesProps {
  data: CategoryData[];
  selected: string;
  onSelect: (id: string) => void;
}

export function Categories({ data, selected, onSelect }: CategoriesProps) {
  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
}
