import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

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
    fontWeight: 'bold',
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
  dataState: any;
}

export default function FilterList({
  sectionName,
  onItemClick,
  dataState
}: Props) {

  const [alphabetical, setAlphabetical] = useState<boolean>(true);
  const [data, setData] = dataState;

  useEffect(() => {
    let filterData = [...data];
    filterData.sort((a, b) => {
      if (alphabetical) {
        if (a.subject < b.subject) { return -1; }
        if (a.subject > b.subject) { return 1; }
        return 0;
      }
      if (a.subject > b.subject) { return -1; }
      if (a.subject < b.subject) { return 1; }
      return 0;
    })
    setData(filterData);
  }, [alphabetical])



  return (
    <View style={styles.container}>
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
      <View>
        <FlatList
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

