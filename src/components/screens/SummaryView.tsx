import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'

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
    color: theme.text,
    fontFamily: 'Montserrat-Bold',
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
  style?: StyleProp<ViewStyle>
  icon: string;
  title: string;
  subtitle: string;
}

export default function SummaryView({
  style,
  icon,
  title,
  subtitle
}: Props) {
  return (
    <View style={[styles.container, style]}>
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