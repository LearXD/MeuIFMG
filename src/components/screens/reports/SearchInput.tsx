import { StyleSheet, TextInput, View } from 'react-native'
import theme from '../../../utils/theme'

import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row'
  }
})

interface Props {
  state: any[],
}

export default function SearchInput({
  state = [null, () => { }],
}: Props) {

  const [search, setSearch] = state;

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          flex: 1,
          color: theme.text,
          fontFamily: 'Montserrat-Regular',
          padding: 5,
          width: '100%'
        }}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={theme.textSecondary}
        placeholder='Pesquisar...'
      />
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
      }}>
        <Ionicons
          name="search-outline"
          size={25}
          color={theme.text}
        />
      </View>

    </View>
  )
}

