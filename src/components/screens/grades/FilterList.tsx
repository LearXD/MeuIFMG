import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
  }
})

interface Props {
  header?: JSX.Element;
  sectionName: string;
  onItemClick: (subject: string) => void;
  dataState: any;
}

export default function FilterList({
  header,
  sectionName,
  onItemClick,
  dataState
}: Props) {

  const [alphabetical, setAlphabetical] = useState<boolean | null>(null);
  const [data, setData] = dataState;

  const filter = () => {
    let filterData = [...data];
    filterData.sort((a, b) => {
      const letherA = a.subject.split(' ')[0]
      const letherB = b.subject.split(' ')[0]

      if (alphabetical) {
        if (letherA < letherB) return -1;
        if (letherA > letherB) return 1;
        return 0;
      }

      if (letherA > letherB) return -1;
      if (letherA < letherB) return 1;
      return 0;
    })
    setData(filterData);
  }

  useEffect(() => {
    if (alphabetical === null && data.length > 0) {
      setAlphabetical(true)
    }
  }, [data])
  useEffect(filter, [alphabetical])

  return (
    <View style={styles.container}>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ gap: 10, paddingVertical: 20 }}>
              {header}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>{sectionName}</Text>
                <TouchableOpacity
                  onPress={() => setAlphabetical(!alphabetical)}
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name={alphabetical ? 'sort-alpha-down' : 'sort-alpha-down-alt'}
                    color={theme.text}
                    size={25}
                  />
                </TouchableOpacity>

              </View>
            </View>}
          ItemSeparatorComponent={
            () => <View style={{ height: 15 }} />
          }
          style={styles.flatList}
          data={data}
          renderItem={
            ({ item }) => {

              const underAverage = item.info.underAverage;

              return (
                <FilterListItem
                  onClick={() => onItemClick(item.subject)}
                  title={item.subject}
                  desciption={underAverage ? `Você ficou abaixo da media em ${underAverage} ativiades!` : 'Sem atividades abaixo da media!'}
                  icon='arrow-alt-circle-right'
                />
              )
            }}
        />
      </View>
    </View>
  )
}

