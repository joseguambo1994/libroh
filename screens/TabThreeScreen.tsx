import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { collection, addDoc, setDoc, deleteDoc } from "firebase/firestore"; 
import db from '../firebase';
import { useEffect, useState } from 'react';
import _ from 'lodash'; 
import { doc, getDoc } from "firebase/firestore";
import { RootTabScreenProps } from '../types';

const windowHeight = Dimensions.get('window').height;

export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabThree'>) {

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDocumentById(getBookId())
    });
    return unsubscribe;
  }, [navigation]);


  function getBookId():string {
    const variableObj= navigation.getState().routes[2].params;
    if (!_.isNil(variableObj)){
      const bookIdString = Object.values(variableObj)[0];
      return bookIdString;
    } else {
      return ''
    }
  }

  async function getDocumentById(bookId: string){
    if (bookId != ''){
      const docRef = doc(db, "books", bookId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const selectedDoc = docSnap.data()
        setName(()=>selectedDoc['name']);
        setAuthor(()=>selectedDoc['author']);
        setCurrentPage(()=>selectedDoc['currentPage']);
        setTotalPages(()=>selectedDoc['totalPages']);
      } else {
        console.log("No such document!");
      }
    }else{
      setName('');
        setAuthor('');
        setCurrentPage(0);
        setTotalPages(0);
    }
  }

  const areFieldsEmpty = ():boolean => {
    return (_.isNil(name) || name == '') && (_.isNil(author) || author == '')
  }

  const addData = async () => {
    if (!areFieldsEmpty()){
      const docRef = await addDoc(collection(db, "books"), {
        name: name,
        author: author,
        currentPage: currentPage,
        totalPages: totalPages,
      });
      console.log("Document written with ID: ", docRef.id);
  }
  }

  const updateData = async () => {
      const docRef = await setDoc(doc(db, "books", getBookId()), {
        name: name,
        author: author,
        currentPage: currentPage,
        totalPages: totalPages,
      });
      docRef;
  }

  const deleteData = async () => {
    const docRef = await deleteDoc(doc(db, "books", getBookId()));
    docRef;
}

  function navigateToSecondScreen(){
    navigation.navigate('TabTwo');
  }

  return (
   <View style={styles.container}>
     <Text style={styles.label}>Name:</Text>
     <TextInput style={styles.textInput} 
      onChangeText={value => setName(value)}
      defaultValue={name}
     ></TextInput>
     <Text style={styles.label}>Author:</Text>
     <TextInput style={styles.textInput} 
      onChangeText={value => setAuthor(value)}
      defaultValue={author}
      ></TextInput>
     <Text style={styles.label}>Current Page:</Text>
     <TextInput style={styles.textInput} 
      onChangeText={value => setCurrentPage(Number(value))}
      defaultValue={currentPage.toString()}
      keyboardType='numeric'
      ></TextInput>
     <Text style={styles.label}>Total Pages:</Text>
     <TextInput style={styles.textInput} 
      onChangeText={value => setTotalPages(Number(value))}
      defaultValue={totalPages.toString()}
      keyboardType='numeric'
      ></TextInput>
      {
        getBookId() != '' ?     <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addButton} onPressOut={()=>{
            updateData();
            navigateToSecondScreen();
          }}>
       <Text>Editar</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.addButton} onPressOut={()=>{
       navigateToSecondScreen();
       navigateToSecondScreen();
     }}>
       <Text>Eliminar</Text>
     </TouchableOpacity>
        </View> : <TouchableOpacity style={styles.addButton} onPressOut={()=>{
          addData();
          navigateToSecondScreen();
        }}>
        <Text>Agregar</Text>
      </TouchableOpacity>
      }
     
   
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
  },
  buttonsContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
