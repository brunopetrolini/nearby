import { Image, Text, TouchableOpacity, type TouchableOpacityProps, View } from 'react-native';
import { IconTicket } from '@tabler/icons-react-native';

import { colors } from '@/styles/theme';
import { styles } from './styles';

export type PlaceData = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};

type PlaceProps = TouchableOpacityProps & {
  data: PlaceData;
};

export function Place({ data, ...props }: PlaceProps) {
  function renderTicketLabel() {
    if (data.coupons === 0) {
      return 'Sem cupons disponíveis';
    }

    if (data.coupons === 1) {
      return `${data.coupons} cupom disponível`;
    }

    return `${data.coupons} cupons disponíveis`;
  }

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image source={{ uri: data.cover }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={styles.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={styles.tickets}>{renderTicketLabel()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
