import { Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from './../../../utils/theme';

import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#1A5723",
    borderBottomWidth: 5,
    //borderRightColor: "#1A5723",
    //borderRightWidth: 5,
  },
  text: {
    color: theme.text,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    overflow: 'hidden'
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

  const { height } = useWindowDimensions();

  const borderWidth = useSharedValue(styles.container.borderBottomWidth)
  const borderColor = useSharedValue(styles.container.borderBottomColor)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor: borderColor.value,
      borderBottomWidth: borderWidth.value,
      //borderRightColor: borderColor.value,
      //borderRightWidth: borderWidth.value,
    }
  })

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      onPressIn={() => {
        // change the border color to primary
        borderWidth.value = 0;
        borderColor.value = theme.primary;
      }}
      onPressOut={() => {
        borderWidth.value = styles.container.borderBottomWidth;
        borderColor.value = styles.container.borderBottomColor;
      }}
      style={[styles.container, animatedStyle]}>
      <>
        <FontAwesome5
          style={{ overflow: 'scroll' }}
          name={icon}
          solid
          size={height * 0.08}
          color={theme.text}
        />
        <Text style={styles.text}>
          {text}
        </Text>
      </>
    </AnimatedTouchableOpacity>
  )
}