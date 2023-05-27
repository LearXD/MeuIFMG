import { StyleSheet, Text, View } from 'react-native'
import theme from '../../../utils/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary,
    padding: 10,
  },
  text: {
    color: theme.text,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  }
})

interface Props {
  data: {
    name: string,
    grade: string,
    value: string,
    date?: string
  }
}

export default function SubjectItem({
  data: {
    name,
    grade,
    value,
    date
  }
}: Props) {

  const isBelowAverage = parseFloat(grade) < (parseFloat(value) * 0.6);

  return (
    <View style={styles.container}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          paddingVertical: 5,
          marginBottom: 10,
          color: theme.text,
          fontSize: 13,
          fontFamily: 'Montserrat-Bold',
          textAlign: 'center',
        }}>
          {name}
        </Text>
      </View>
      <View style={{
        gap: 5
      }}>
        {
          date && (
            <Value name="Data:" value={date} />
          )
        }

        <Value name="Valor Total:" value={value} />
        <Value
          name="Valor Obtido:"
          value={grade}
          isBelowAverage={isBelowAverage}
          arrondValue
        />
      </View>


    </View>
  )
}

const Value = (
  { name, value, isBelowAverage, arrondValue }: {
    name: string,
    value: string,
    isBelowAverage?: boolean
    arrondValue?: boolean
  }): JSX.Element => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }}>
    <Text style={{
      color: theme.text,
      textAlign: 'justify',
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
    }}>
      {name}
    </Text>
    <View style={{
      borderWidth: arrondValue ? 1 : 0,
      borderColor: value ? (isBelowAverage ? theme.belowGrade : theme.overGrade) : theme.text,
      borderRadius: 5,
      paddingHorizontal: 4
    }}>
      <Text style={{
        color:
          value ? ((isBelowAverage !== undefined) ?
            (isBelowAverage ? theme.belowGrade : theme.overGrade) : theme.text
          ) : theme.text,
        fontSize: 13,
        fontFamily: 'Montserrat-Regular'
      }}>
        {value || 'N/A'}
      </Text>
    </View>

  </View>
)