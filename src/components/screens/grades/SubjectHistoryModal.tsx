import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme'

import Ionicons from 'react-native-vector-icons/Ionicons'
import SubjectSectionList from './SubjectsSectionList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modal: {
    height: '80%',
    width: '80%',
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary
  }
})

interface Props {
  subject: string,
  closeModal: () => void,
  sections: any
}

export default function SubjectHistoryModal({
  subject,
  closeModal,
  sections
}: Props) {

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={{
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          gap: 10
        }}>
          <View style={{
            flex: 1,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TouchableOpacity
              onPress={closeModal}
            >
              <Ionicons
                name="close-outline"
                size={25}
                color={theme.text}
              />
            </TouchableOpacity>
          </View>
          <View style={{
            flex: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10
          }}>
            <Text style={{
              color: theme.text,
              fontSize: 12,
              fontFamily: 'Montserrat-Bold',
              textAlign: 'center'
            }}>
              {subject ?? 'Não encontrado'}
            </Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          width: '100%',
          padding: 10,
        }}>
          <SubjectSectionList sections={sections} />
        </View>
      </View>
    </View>
  )
}

