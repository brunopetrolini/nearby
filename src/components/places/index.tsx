import { useRef } from 'react';
import { useWindowDimensions, Text } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { Place, PlaceData } from '../place';
import { styles } from './styles';

interface PlacesProps {
  data: PlaceData[];
}

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = { min: 278, max: dimensions.height - 128 };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => <Text style={styles.title}>Explore locais perto de você</Text>}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
