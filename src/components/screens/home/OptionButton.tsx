import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from './../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular'
  }
});

interface Props {
  icon: string;
  text: string;
  onClick: () => void;
}

export default function OptionButton({
  icon,
  text,
  onClick
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={styles.container}>
      <>
        <FontAwesome5
          name={icon}
          solid
          size={70}
          color={theme.text}
        />
        <Text style={styles.text}>
          {text}
        </Text>
      </>
    </TouchableOpacity>
  )
}