import { StyleSheet, View, Modal } from 'react-native'
import React from 'react'
import theme from '../../utils/theme';
import SummaryView from '../../components/screens/SummaryView';
import Header from '../../components/screens/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FilterList from '../../components/screens/reports/FilterList';
import ReportModal from '../../components/screens/reports/ReportModal';
import { reports } from '../../utils/api/api';
import AuthenticatedContext from '../../contexts/AuthenticatedContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  contents: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 20
  }
})

interface Props {
  navigation: NativeStackNavigationProp<{}>
}

export default function ReportScreen({
  navigation
}: Props) {

  const { token, loading } = React.useContext<any>(AuthenticatedContext);

  const [modalIsVisible, setModalIsVisible] = React.useState(false)
  const [data, setData] = React.useState<any[]>([])

  const [modalPeriod, setModalPeriod] = React.useState<string>('')

  React.useEffect(() => {
    (async () => {
      const stopLoading = loading.start("Carregando boletins...")
      const response = await reports(token)

      if (response.data) {
        setData(response.data)
        stopLoading();
      }
    })()
  }, [])

  const getPeriodData = (period: string) => {
    const found = data.find((item) => item.period === period)
    return found;
  }

  const openModal = (period: string) => {
    setModalPeriod(period)
    setModalIsVisible(true)
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalIsVisible} transparent>
        <ReportModal
          title={modalPeriod}
          data={getPeriodData(modalPeriod)}
          closeModal={() => setModalIsVisible(false)}
        />
      </Modal>
      <Header
        customTitle='Boletins'
        customLeftIcon='chevron-back-outline'
        customLeftIconClick={() => navigation.goBack()}
      />
      <View style={styles.contents}>
        <SummaryView
          title="Boletins"
          subtitle="Acompanhe seu desempenho"
          icon="box-open"
        />
        <FilterList
          sectionName="Seus boletins"
          onItemClick={openModal}
          data={data}
        />
      </View>
    </View>
  )
}

