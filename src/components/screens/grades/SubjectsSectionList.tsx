import { StyleSheet, View, Text, SectionList } from 'react-native'
import SubjectItem from './SubjectItem';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})

export interface Props {
  sections: any
}


export default function SubjectSectionList({
  sections
}: Props) {

  const parseSections = () => {
    const newSections = sections.map((semester: any) => {

      if (
        semester.activities &&
        !semester.activities.find((activity: any) => activity.name === `Nota final de ${semester.role}`)
      ) {
        let total = 0;
        let sum = 0;

        semester.activities.forEach((activity: any) => {
          if (activity.value && activity.note) {
            total += parseFloat(activity.value.replace(/,/g, '.'));
            sum += parseFloat(activity.note.replace(/,/g, '.'));
          }
        })

        if (total > 0 && sum) {
          semester.activities.push({
            name: `Nota final de ${semester.role}`,
            note: sum,
            value: total,
          })
        }

      }


      return {
        title: semester.role,
        data: semester.activities
      }
    })

    return newSections;
  }

  return (
    <SectionList
      style={styles.container}
      sections={parseSections()}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      SectionSeparatorComponent={() => (
        <View style={{
          height: 20,
        }} />
      )}
      ItemSeparatorComponent={() => (
        <View style={{
          height: 10,
        }} />
      )}
      renderItem={
        ({ item }) => {
          return (<SubjectItem data={item} />)
        }
      }
      renderSectionHeader={({ section }) => {
        if (section.data.length === 0) return (<></>);
        return (
          <Text style={{
            color: theme.text,
            fontSize: 16,
            fontFamily: 'Montserrat-Bold',
            width: '100%',
          }}>
            {section.title}
          </Text>)
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  )
}
