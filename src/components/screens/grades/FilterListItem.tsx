import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    padding: 30,
    height: 120,
    borderRadius: 5,
  },
  textsContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.text,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 11,
    color: theme.text,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

interface Props {
  title: string;
  desciption: string;
  onClick: () => void;
  icon: string;
}

export default function FilterListItem({
  title,
  desciption,
  icon,
  onClick
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onClick}
    >
      <View style={styles.textsContainer}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>
          {desciption}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome5
          solid
          style={{ alignSelf: 'center' }}
          name={icon}
          size={30}
          color={theme.text}
        />
      </View>
    </TouchableOpacity>
  )
}