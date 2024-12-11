import { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';

import { api } from '@/services/api';
import { Categories } from '@/components/categories';
import type { CategoryData } from '@/components/category';
import { Places } from '@/components/places';
import type { PlaceData } from '@/components/place';

export default function Home() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [places, setPlaces] = useState<PlaceData[]>([]);

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

  async function fetchPlaces() {
    try {
      if (!selectedCategory) return;

      const { data } = await api.get(`/markets/category/${selectedCategory}`);
      setPlaces(data);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Erro ao obter dados', 'Não foi possível carregar os lugares');
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: '#CECECE' }}>
      <Categories data={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <Places data={places} />
    </View>
  );
}
