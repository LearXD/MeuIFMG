import { View, StyleSheet, Image, Modal, Pressable, Dimensions } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme';

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
          <Image
            style={{
              width: width * 0.90,
              height: width * 0.90,
            }}
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