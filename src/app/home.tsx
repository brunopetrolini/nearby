import { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { api } from '@/services/api';
import { Categories } from '@/components/categories';
import type { CategoryData } from '@/components/category';
import { Places } from '@/components/places';
import type { PlaceData } from '@/components/place';

const currentLocation = {
  latitude: -23.561423319576985,
  longitude: -46.656515760933374,
};

type MarketData = PlaceData & {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [places, setPlaces] = useState<MarketData[]>([]);

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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker identifier="current" coordinate={currentLocation} image={require('@/assets/location.png')} />
        {places.map((place) => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={{ longitude: place.longitude, latitude: place.latitude }}
            image={require('@/assets/pin.png')}
          />
        ))}
      </MapView>
      <Places data={places} />
    </View>
  );
}
