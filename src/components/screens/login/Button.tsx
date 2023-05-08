import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useState } from 'react';
import theme from '../../../utils/theme';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    color: theme.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  }
});

interface Props {
  text: string,
  isLoading?: boolean;
  onClick?: (stopLoading: CallableFunction) => void;
}

export default function Button({
  text,
  onClick,
  isLoading
}: Props) {

  const [loading, setLoading] = useState(false)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.container}
      onPress={() => {
        if (isLoading) {
          setLoading(true)
        }
        onClick && onClick(() => {
          setLoading(false)
        });
      }}
    >
      {
        (isLoading && loading) ? (
          <ActivityIndicator
            size={20}
            color="#FFF"
          />
        ) : (
          <Text style={style.text}>{text}</Text>
        )
      }

    </TouchableOpacity>
  )
}