import { View } from 'react-native';
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native';

import { Welcome } from '@/components/welcome';
import { Steps } from '@/components/steps';
import { Step } from '@/components/step';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps>
        <Step
          icon={IconMapPin}
          title="Encontre estabelecimentos"
          description="Veja locais perto de você que são parceiros Nearby"
        />
        <Step
          icon={IconQrcode}
          title="Ative o cupom com QR Code"
          description="Escaneie o código no estabelecimento para usar o benefício"
        />
        <Step
          icon={IconTicket}
          title="Garanta vantagens perto de você"
          description="Ative cupons onde estiver, em diferentes tipos de estabelecimento"
        />
      </Steps>
    </View>
  );
}
