import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Book from '../components/Book';
import { View } from '../components/Themed';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';

interface IBook{
  bookId: string,
  name: string,
  author: string,
  currentPage: number,
  totalPages:number
}
const burnedBook = {
  key:'dslakndklasnkdlsa',
  name: 'Grokking simplicity',
  author: 'John Doe',
  currentPage: 78,
  totalPages: 420
}


const booksList: IBook[] = [{
  bookId:'dassadasdasdsa',
  name: 'AI BOOK',
  author: 'John Doe',
  currentPage: 12,
  totalPages: 100
},
{
  bookId:'asdsadertrteretre',
  name: 'Grokking simplicity',
  author: 'Steve Wozniak',
  currentPage: 78,
  totalPages: 420
}
]

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  const emptyArray: IBook[] = [];
  const [array, setArray] = useState(emptyArray);

  async function getData(){
    const querySnapshot = await getDocs(collection(db, "books"));
    const tempArray: IBook[] = [];
    let tempItem: IBook;
    querySnapshot.forEach((doc) => {
      
      console.log(doc.id, " => ", doc.data());
      tempItem= {
        bookId: doc.id,
        name: doc.get("name"),
        author: doc.get("author"),
        currentPage: Number(doc.get("currentPage")),
        totalPages: Number(doc.get("totalPages")),
      }
      tempArray.push(tempItem);
    });
    setArray(()=>tempArray);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Tab Two Focus")
      getData();
    });
    return unsubscribe;
  }, [navigation]);


  function getPercentage(currentPage:number, totalPages:number):number{
    return currentPage/totalPages;
  }


  return (
   <ScrollView>

      <TouchableOpacity style={styles.addButton}     onPress={() => {
      navigation.navigate(
        'Root',
        { screen:'TabThree', params:{bookId:''}}
            );

    }}>
       <Text>Agregar</Text>
     </TouchableOpacity>
      <View style={styles.container}>
      {
        array.sort((a:IBook, b:IBook)=> 
        getPercentage(b.currentPage,b.totalPages) - getPercentage(a.currentPage,a.totalPages)
        ).map( ( item:IBook ) => {
          return <Book 
            bookId={item.bookId}
            name={item.name}
            author={item.author}
            currentPage={item.currentPage}
            totalPages={item.totalPages}
           
          ></Book>
      })
      }
    </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addButton:{
    width:60,
    height:60,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'flex-end',
    marginHorizontal:10
  }
});
