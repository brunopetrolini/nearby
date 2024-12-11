import { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';

import { Categories } from '@/components/categories';
import type { CategoryData } from '@/components/category';
import { api } from '@/services/api';

export default function Home() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
      setSelectedCategory(data[0].id);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Erro ao obter dados', 'Não foi possível carregar as categorias');
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categories data={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
    </View>
  );
}
