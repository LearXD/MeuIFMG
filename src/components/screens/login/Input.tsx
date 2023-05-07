import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../utils/theme';

import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

interface Props {
  title: string;
  placeholder: string;
  state: any[];
  password?: boolean;
  icon?: string;
}

export default function Input({
  title,
  placeholder,
  password,
  state
}: Props) {

  const [hidePassword, setHidePassword] = useState(true)
  const [value, setValue] = state;

  return (
    <View style={styles.container}>
      <View style={{
        flex: 5,
        gap: 0,
        justifyContent: 'center',
      }}>
        <Text style={{
          color: theme.text,
          fontFamily: 'Montserrat-Regular',
          fontSize: 12,
          padding: 0
        }}>
          {title}
        </Text>
        <TextInput
          secureTextEntry={password && hidePassword}
          style={{
            color: theme.textSecondary,
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            padding: 0
          }}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={theme.textSecondary}
          placeholder={placeholder}
        />
      </View>
      {
        password && (
          <View style={{
            flex: 1
          }}>
            <Pressable style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={"#FFF"}
              />
            </Pressable>

          </View>
        )
      }

    </View>
  )
}