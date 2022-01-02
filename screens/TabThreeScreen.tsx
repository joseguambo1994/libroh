import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function TabThreeScreen() {



  return (
   <View style={styles.container}>
     <Text style={styles.label}>Name:</Text>
     <TextInput style={styles.textInput}></TextInput>
     <Text style={styles.label}>Author:</Text>
     <TextInput   style={styles.textInput}></TextInput>
     <Text style={styles.label}>Current Page:</Text>
     <TextInput keyboardType='numeric' style={styles.textInput}></TextInput>
     <Text style={styles.label}>Total Pages:</Text>
     <TextInput keyboardType='numeric'   style={styles.textInput}></TextInput>
     <TouchableOpacity style={styles.addButton}>
       <Text>Agregar</Text>
     </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'purple',
    flexDirection:'column'
  },
  textInput:{
    width:'95%',
    height: windowHeight / 7,
    backgroundColor:'white',
    padding:20,
    borderRadius:20,
  },
  addButton:{
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginHorizontal:10
  },
  label:{
    color:'white',
    fontSize: 20
  }
});
