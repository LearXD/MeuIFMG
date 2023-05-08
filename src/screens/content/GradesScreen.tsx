import { View, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../utils/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SummaryView from '../../components/screens/SummaryView';
import FilterList from '../../components/screens/grades/FilterList';
import SubjectHistoryModal from '../../components/screens/grades/SubjectHistoryModal';
import Header from '../../components/screens/Header';

import { listGrades } from '../../utils/api/api';
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

  const [achievement, setAchievement] = useState<number>(0)

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

      let totalActivities = 0;
      let underAverageActivities = 0;

      const newData = grades.map((subject: any, i: number) => {

        const info = {
          underAverage: 0,
          activities: 0,
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
            info.activities++
            const fixedGrade = parseFloat(activity.note.replace(/,/g, "."))
            const fixedValue = parseFloat(activity.value.replace(/,/g, "."))
            if (fixedGrade < (fixedValue * 0.6)) {
              info.underAverage++
            }
          }
        }

        totalActivities += info.activities
        underAverageActivities += info.underAverage

        return {
          ...subject,
          info
        }
      })

      stopLoading();

      if (totalActivities) {
        setAchievement((totalActivities - underAverageActivities) / totalActivities)
      }

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
          icon={
            achievement >= 0.8 ? 'smile-beam' : (
              achievement >= 0.6 ? 'smile' : 'meh'
            )
          }
          title='Resumo'
          subtitle={
            (achievement >= 0.8 ? 'Parabéns, seu aproveitamento está otimo. Continue assim!' : (
              achievement >= 0.6 ? 'Você pode melhorar, mas não está tão ruim assim!' :
                'Você precisa melhorar, mas não desanime!'
            )) + `\n\nAproveitamento de: ${Math.round(achievement * 100)}%`
          }
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