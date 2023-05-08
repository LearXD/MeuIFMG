import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme'

import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchList from './SearchList'
import { useEffect } from 'react';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center'
  },
  modal: {
    width: '85%',
    height: '95%',
    backgroundColor: theme.background,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5
  }
})

interface Props {
  title: string;
  data: any;
  closeModal: () => void;
}

export default function ReportModal({
  title,
  data,
  closeModal
}: Props) {

  const [subjects, setSubjects] = React.useState<any[]>([])

  useEffect(() => {
    setSubjects(data.subjects)
  }, [data])

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          padding: 10,
          gap: 10
        }}>
          <View style={{
            flex: 1,
            borderColor: theme.primary,
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={closeModal}>
              <Ionicons
                name="close-outline"
                size={25}
                color={theme.text}
              />
            </TouchableOpacity>

          </View>
          <View style={{
            flex: 5,
            borderColor: theme.primary,
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10
          }}>
            <Text style={{
              color: theme.text,
            }}>
              {title.replace(/_/g, ' ')}
            </Text>
          </View>
        </View>
        <View style={{
          flex: 1
        }}>
          <SearchList data={subjects} />
        </View>
      </View>
    </View>
  );
}

