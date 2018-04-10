import { AsyncStorage } from 'react-native';
import Constant from '../utils/Constant';

const getCart = async () => {
  try {
    const arrayCart = await AsyncStorage.getItem(Constant.ASYN_CART);
    console.log('get cart array:' + arrayCart);
    if (arrayCart !== null) {
      console.log("Cart array local:" + JSON.stringify(arrayCart));
      return JSON.parse(arrayCart);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export default getCart;
