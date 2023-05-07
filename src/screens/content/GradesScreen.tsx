import { View, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../utils/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SummaryView from '../../components/screens/SummaryView';
import FilterList from '../../components/screens/grades/FilterList';
import SubjectHistoryModal from '../../components/screens/grades/SubjectHistoryModal';
import Header from '../../components/screens/Header';

import { listGrades } from '../../utils/api/if';
import AuthenticatedContext from '../../contexts/AuthenticatedContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20
  }
});

interface Props {
  navigation: NativeStackNavigationProp<{}>
}

export default function GradesScreen({
  navigation
}: Props) {

  const { token, loading } = React.useContext<any>(AuthenticatedContext)

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>([])

  const [modalSubject, setModalSubject] = useState<string>('')

  const getSubjectData = (subject: string) => {
    const [result] = data.filter((item: any) => item.subject === subject);
    if (!result) return []
    return result.data
  }

  const openModal = (subject: string) => {
    setModalSubject(subject)
    setModalVisible(true)
  }

  useEffect(() => {
    (async () => {

      const stopLoading = loading.start('Carregando notas...');
      const grades: any = await listGrades(token);

      const newData = grades.map((subject: any, i: number) => {

        const info = {
          underAverage: 0,
        }

        const regex = /Recupera[cç]ã?o/i;

        for (const semester of subject.data) {
          if (regex.test(semester.role)) {
            continue;
          }
          for (const activity of semester.activities) {
            if (regex.test(activity.name)) {
              continue;
            }
            const fixedGrade = parseFloat(activity.note.replace(/,/g, "."))
            const fixedValue = parseFloat(activity.value.replace(/,/g, "."))
            if (fixedGrade < (fixedValue * 0.6)) {
              info.underAverage++
            }
          }
        }

        return {
          ...subject,
          info
        }

      })

      stopLoading();
      setData(newData)
    })()
  }, [])

  return (
    <View style={styles.container}>

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
      >
        <SubjectHistoryModal
          subject={modalSubject}
          closeModal={() => setModalVisible(false)}
          sections={getSubjectData(modalSubject)}
        />
      </Modal>

      <Header
        customTitle='Notas'
        customLeftIcon='chevron-back-outline'
        customLeftIconClick={() => navigation.goBack()}
      />

      <View style={styles.contents}>
        <SummaryView
          icon='smile-beam'
          title='Resumo'
          subtitle='Parabéns! Suas notas estão muito boas. Continue assim...'
        />
        <FilterList
          sectionName={`Matérias (${data.length})`}
          onItemClick={openModal}
          dataState={[data, setData]}
        />
      </View>

    </View>
  )
}