import { Text, View } from 'react-native';

import { styles } from './styles';
import { Info } from '../info';
import { IconMapPin, IconPhone, IconTicket } from '@tabler/icons-react-native';

export type DetailsData = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

interface DetailsProps {
  data: DetailsData;
}

export function Details({ data }: DetailsProps) {
  function renderCouponText() {
    switch (data.coupons) {
      case 0:
        return 'Sem cupons disponíveis';
      case 1:
        return `${data.coupons} cupom disponível`;
      default:
        return `${data.coupons} cupons disponíveis`;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>
        <Info icon={IconTicket} description={renderCouponText()} />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {data.rules.map((rule) => (
          <Text key={rule.id} style={styles.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
