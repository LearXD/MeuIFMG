import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import theme from '../../utils/theme'
import SummaryView from '../../components/screens/SummaryView'
import Header from '../../components/screens/Header'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AuthenticatedContext from '../../contexts/AuthenticatedContext'
import { listGrades } from '../../utils/api/api'
import { reports } from '../../utils/api/api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,

  },
  contents: {
    flex: 1,
    padding: 10,
    gap: 10
  }
})

interface Props {
  navigation: NativeStackNavigationProp<{}>
}

export default function AbsencesScreen({
  navigation
}: Props) {

  const { token } = React.useContext<any>(AuthenticatedContext)
  const [absences, setAbsences] = React.useState<any>([])

  React.useEffect(() => {
    (async () => {
      const absences: any = await reports(token)
      console.log(absences.data)
      setAbsences(absences)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Header
        customTitle='Faltas'
        customLeftIcon='chevron-back-outline'
        customLeftIconClick={() => navigation.goBack()}
      />
      <View style={styles.contents}>
        <SummaryView
          title="Faltas"
          subtitle={`Você tem um total de 0 faltas.`}
          icon='calendar-check'
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10
        }}>
          <Circle color='red' />
          <Circle color='yellow' />
          <Circle color='green' />
        </View>
        <Text style={{
          color: theme.textSecondary,
          fontSize: 10,
          fontFamily: 'Montserrat-Regular',
        }}>
          Fique atento! Alguns professores não lançam as faltas na platafoma, mas de alguma forma elas podem estar sendo contabilizadas...
        </Text>
        <FlatList
          style={{
            flex: 1,
          }}
          data={absences}
          renderItem={({ item }) => {
            console.log(item)
            return null
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    </View>
  )
}

const Circle = ({ color }: { color: string }) => {
  const colors: any = {
    red: '#F00',
    yellow: '#EBFF00',
    green: '#32A041'
  }

  return (
    <View style={{
      height: 25,
      width: 25,
      borderRadius: 12.5,
      backgroundColor: colors[color] ?? '#F00'
    }} />
  )
}