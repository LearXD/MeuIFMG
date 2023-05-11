import { View, StyleSheet, Image, Modal, Pressable, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import theme from '../../../utils/theme';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    height: width * 0.60,
    width: width * 0.60,
    borderRadius: (width * 0.60) / 2,
    borderWidth: 1,
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface Props {
  image: string;
}

export default function Picture({
  image
}: Props) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const imageReference = image ? { uri: image } : require('../../../assets/images/learxd.jpg')

  const imageSize = useSharedValue(0);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: imageSize.value,
      height: imageSize.value,
      //transform: [
      //  {
      //    rotate: interpolate(
      //      imageSize.value,
      //      [width * 0.20, width * 0.95],
      //      [0, 360]
      //    ) + 'deg'
      //  }
      //],
    }
  })

  useEffect(() => {
    if (modalVisible) {
      imageSize.value = withTiming(width * 0.95, { duration: 1200 })
    } else {
      imageSize.value = 0.20
    }
  }, [modalVisible])

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
          <Animated.Image
            style={imageStyle}
            source={imageReference}
          />
        </Pressable>

      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: '95%',
            height: '95%',
            borderRadius: (width * 0.60) / 2,
          }}
          source={imageReference}
        />
      </Pressable>

    </View>
  )
}