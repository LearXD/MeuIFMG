import { StyleSheet, Text, View } from 'react-native'
import theme from '../../../utils/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
  },
  title: {
    color: theme.text,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
})

interface Props {
  data: any,
}

export default function SearchListItem({
  data
}: Props) {
  return (
    <View style={styles.container}>
      <View style={{
        paddingTop: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={styles.title}>{data.name}</Text>
      </View>
      <View>
        <KeyValueView
          name="Situação"
          value={data.data["Situação"]}
        />
        <KeyValueView
          name="Nota Final"
          value={data.data.Nota}
          rounded
        />
      </View>
    </View>
  )
}

const KeyValueView = ({ name = "", value = "N/D", rounded = false }: { name: string; value: string; rounded?: boolean }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 5,
    }}>
      <Text style={{
        color: theme.text,
        fontFamily: 'Montserrat-Regular'
      }}>
        {name}
      </Text>
      <View style={{
        borderRadius: rounded ? 5 : 0,
        borderWidth: rounded ? 1 : 0,
        borderColor: (parseFloat(value.replace(/,/, '.')) < 60) ? theme.belowGrade : theme.overGrade,
      }}>
        <Text style={{
          paddingHorizontal: 5,
          paddingVertical: 1,
          color: rounded ? ((parseFloat(value.replace(/,/, '.')) < 60) ? theme.belowGrade : theme.overGrade) : theme.text,
          fontFamily: 'Montserrat-Regular'
        }}>
          {value}
        </Text>
      </View>

    </View>
  );
}