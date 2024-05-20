import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const openCamera = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      resolve(image);
    }).catch((err) => {
      console.log('err err --> ', err);
      reject(err);
      Alert.alert("Error", err);
    });
  })
}