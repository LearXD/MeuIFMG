import { View, StyleSheet, Text } from 'react-native'
import React from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    padding: 30,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
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
  }
})

interface Props {
  icon: string;
  title: string;
  subtitle: string;
}

export default function SummaryView({
  icon,
  title,
  subtitle
}: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name={icon}
        solid
        size={100}
        color={theme.text}
      />
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 5
      }}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  )
}