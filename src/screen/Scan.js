import { ActivityIndicator, Linking, StyleSheet, Text,
   Dimensions, View, TouchableOpacity, Alert,  } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get('window');
import { useDispatch } from "react-redux";
import { productbarcodeDispatch } from "../../reducers/HomeReducer";
import { useNavigation } from "@react-navigation/native";

const Scan = () => {
  const device = useCameraDevice('back');
  const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const camera = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [textValue, settextValue] = useState('');
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);

  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      alert('Camera permission is required to use the camera. Please grant permission in your device settings.');
      Linking.openSettings();
    }
  };

  useEffect(() => {
    if (!cameraHasPermission) {
      handleCameraPermission();
    }
  }, [cameraHasPermission]);

  

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-128'],
    onCodeScanned: (codes) => {
      if (enableOnCodeScanned && codes.length > 0) {
        let value = codes[0]?.value;
        let type = codes[0]?.type;

        if (type === 'qr') {
          Alert.alert('Please Scan Barcode');
          navigation.goBack();
        } else if (value) {
          setIsScanning(true);
          settextValue(value);
          onBarcodeRead(value);
        }

        setEnableOnCodeScanned(false);
      }
    },
  });

  const onBarcodeRead = (value) => {
    dispatch(productbarcodeDispatch(value, navigation));
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={torchOn ? 'on' : 'off'}
        frameProcessorFps={5}
        onTouchEnd={() => setEnableOnCodeScanned(true)}
      />

      <TouchableOpacity style={{ position: 'absolute', top: 40, left: 20 }} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="white" />
      </TouchableOpacity>

      <View style={{ top: 40, right: 20, position: 'absolute' }}>
        <TouchableOpacity onPress={() => setTorchOn(!torchOn)}>
          <MaterialCommunityIcons name={torchOn ? "flashlight" : "flashlight-off"} size={35} color="white" />
        </TouchableOpacity>
      </View>

      {enableOnCodeScanned && (
        <View style={{ width: 200, position: 'absolute', top: height / 2, left: width / 2 - 100 }}>
          <Text style={{ fontSize: 30, color: 'white' }}>Scanning...</Text>
        </View>
      )}

      {isScanning && (
        <View style={{ position: 'absolute', top: height / 2 - 50, left: width / 2 - 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  camerButton: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});