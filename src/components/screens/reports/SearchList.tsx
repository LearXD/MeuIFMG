import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import SearchInput from './SearchInput'
import SearchListItem from './SearchListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 20
  },
  flatList: {
    gap: 10,
  }
})

interface Props {
  data: any[];
}

export default function SearchList(props: Props) {

  const [search, setSearch] = React.useState('');

  const getOrderedData = () => {
    if (search) {
      return props.data.filter(item => item.name.includes(search))
    }
    return props.data;
  }

  return (
    <View style={styles.container}>
      <SearchInput state={[search, setSearch]} />
      <FlatList
        ItemSeparatorComponent={
          () => <View style={{ height: 15 }} />
        }
        style={styles.flatList}
        data={getOrderedData()}
        renderItem={({ item }) => {
          return <SearchListItem data={item} />
        }}
      />
    </View>
  )
}

