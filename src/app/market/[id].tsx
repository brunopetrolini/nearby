import { useEffect, useRef, useState } from 'react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Alert, Modal, ScrollView, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { IconScan } from '@tabler/icons-react-native';

import { api } from '@/services/api';
import { Loading } from '@/components/loading';
import { Cover } from '@/components/market/cover';
import { Details, DetailsData } from '@/components/market/details';
import { Coupon } from '@/components/market/coupon';
import { Button } from '@/components/button';

type EstablishmentData = DetailsData & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();

  const [establishment, setEstablishment] = useState<EstablishmentData>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [fetchingCoupon, setFetchingCoupon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const qrCodeLock = useRef(false);
  const [_, requestPermission] = useCameraPermissions();

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setEstablishment(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Não foi possível carregar os dados do estabelecimento', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera');
      }

      setIsVisibleCameraModal(!isVisibleCameraModal);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível abrir a câmera');
    }
  }

  async function getCoupon(id: string) {
    try {
      setFetchingCoupon(true);

      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert('Cupom', data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível resgatar o cupom');
    } finally {
      setFetchingCoupon(false);
      qrCodeLock.current = false;
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert('Cupom', 'Não é possível reutilizar um cupom resgatado. Deseja realmente utilizar esse cupom?', [
      {
        style: 'cancel',
        text: 'Não',
        onPress: () => {
          qrCodeLock.current = false;
        },
      },
      {
        text: 'Sim',
        onPress: () => getCoupon(id),
      },
    ]);
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  useEffect(() => {
    if (establishment?.coupons !== 0) {
      setCoupon('CUPOM10');
    }
  }, [establishment]);

  if (isLoading) {
    return <Loading />;
  }

  if (!establishment) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={establishment.cover} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Details data={establishment} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={() => handleOpenCamera()}>
          <Button.Icon icon={IconScan} />
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrCodeLock.current) {
              qrCodeLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={fetchingCoupon}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
