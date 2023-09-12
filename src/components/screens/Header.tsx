import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../../utils/theme';
import { useRoute } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import AuthenticatedContext from '../../contexts/AuthenticatedContext';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: theme.primary,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});

interface Props {
  customTitle?: string;
  customLeftIcon?: string;
  customLeftIconSize?: number;
  customLeftIconClick?: () => void;
  customRightIcon?: string;
  customRightIconClick?: () => void;
  customRightIconSize?: number;
}

export default function Header({
  customTitle,
  customRightIcon,
  customRightIconClick,
  customRightIconSize,
  customLeftIcon,
  customLeftIconSize,
  customLeftIconClick
}: Props) {

  const { token } = useContext(AuthenticatedContext) as any
  const { name } = useRoute();

  return (
    <View style={styles.container}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {
          customLeftIcon && (
            <TouchableOpacity
              onPress={customLeftIconClick}
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Ionicons
                name={customLeftIcon}
                size={customLeftIconSize || 30}
                color={theme.text}
              />
            </TouchableOpacity>
          )
        }
      </View>
      <View style={{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: theme.text,
          fontSize: 20,
          fontFamily: 'Montserrat-Regular',
        }}>
          {customTitle || name}
        </Text>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {
          (customRightIcon && token !== "googletoken") && (
            <TouchableOpacity
              onPress={customRightIconClick}
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Ionicons
                name={customRightIcon}
                size={customRightIconSize || 30}
                color={theme.text}
              />
            </TouchableOpacity>

          )
        }
      </View>
    </View>
  )
}