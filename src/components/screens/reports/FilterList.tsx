import { StyleSheet, Text, View, FlatList } from 'react-native';

import theme from '../../../utils/theme';
import FilterListItem from './FilterListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionText: {
    color: theme.text,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold'
  },
  flatList: {
    gap: 10,
    marginBottom: 40,
  }
})

interface Props {
  sectionName: string;
  onItemClick: (subject: string) => void;
  data: any[];
}

export default function FilterList({
  sectionName,
  onItemClick,
  data
}: Props) {


  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>{sectionName}</Text>
      </View>
      <View>
        <FlatList
          ItemSeparatorComponent={
            () => <View style={{ height: 15 }} />
          }
          style={styles.flatList}
          data={data}
          renderItem={
            ({ item }) => {
              if (item.subjects < 1) {
                return null;
              }
              return (
                <FilterListItem
                  onClick={() => onItemClick(item.period)}
                  title={item.period.replace(/_/g, ' ')}
                  icon='arrow-alt-circle-right'
                />
              );
            }}
        />
      </View>
    </View>
  );
}

