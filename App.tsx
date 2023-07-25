import React, { useState } from 'react';
import { SafeAreaView, Button, StyleSheet, View, FlatList, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment-hijri';

const App = () => {
  // hash map contains the selected buttons
  const [selected, setSelected] = useState(new Map<string, object>());

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#fff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e',
        }}
        current={new Date().toISOString().split('T')[0]}
        onDayPress={day => {
          const selectedDay = day.dateString;
          const newSelected = new Map(selected);
          // check if selected day is already in state
          if (selected.has(selectedDay)) {
            // remove selected day from state
            newSelected.delete(selectedDay);
            setSelected(newSelected);
          } else {
            // add selected day to state
            newSelected.set(selectedDay, {
              selected: true,
              selectedColor: '#00adf5',
              selectedTextColor: '#fff',
            });
            setSelected(newSelected);
          }
        }}
        markedDates={{
          // traverse over the hash map
          ...Object.fromEntries(selected),
        }}
      />
      {/* FlatList to show the selected days */}
      <View style={styles.selectedTitleView}>
        <Text style={styles.selectedTitleGregorian}>Selected Days</Text>
        <Text style={styles.selectedTitleHijri}>Hijri</Text>
      </View>
      <FlatList
        data={[...selected.keys()]}
        renderItem={({ item }) => (
          <View style={styles.dayCard}>
            <Text style={styles.day}>{item}</Text>
            <Text style={styles.day}>{moment(item).format('iDD iMMMM iYYYY')}</Text>
          </View>
        )}
        keyExtractor={item => item}
      />
      {/* buttons to clear selected days and go to current day */}
      {/* <View style={styles.buttons}> */}
        {/* add button to clear the selected days */}
        <Button
          title="Clear Selected Days"
          onPress={() => setSelected(new Map<string, object>())}
        />
        {/* add button to return to current day */}
        {/* <Button
          title="Go to Today"
          onPress={() => {
            // remove all selected days and mark only the current day and go to current day
            setSelected(new Map<string, object>());
            setSelected(
              new Map([
                [
                  new Date().toISOString().split('T')[0],
                  {
                    selected: true,
                    selectedColor: '#00adf5',
                    selectedTextColor: '#fff',
                  },
                ],
              ]),
            );
          }}
        /> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  buttons: {
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginBottom: 20,
    height: '10%',
  },
  calendar: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  dayCard: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#00adf5',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    fontSize: 20,
    color: 'white',
  },
  selectedTitleView: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedTitleGregorian : {
    fontSize: 20,
    color: '#00adf5',
  },
  selectedTitleHijri : {
    fontSize: 20,
    color: '#00adf5',
    paddingRight: 30,
  },
});

export default App;
