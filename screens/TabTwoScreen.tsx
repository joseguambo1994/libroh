import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Book from '../components/Book';
import { View } from '../components/Themed';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useEffect, useState } from 'react';


type BookProps={
  name: string,
  author: string,
  currentPage: number,
  totalPages:number
}

interface IBook{
  name: string,
  author: string,
  currentPage: number,
  totalPages:number
}
const burnedBook = {
  name: 'Grokking simplicity',
  author: 'John Doe',
  currentPage: 78,
  totalPages: 420
}


const booksList: IBook[] = [{
  name: 'AI BOOK',
  author: 'John Doe',
  currentPage: 12,
  totalPages: 100
},
{
  name: 'Grokking simplicity',
  author: 'Steve Wozniak',
  currentPage: 78,
  totalPages: 420
}
]

export default function TabTwoScreen() {

  const emptyArray: BookProps[] = [];
  const [array, setArray] = useState(emptyArray);

  async function getData(){
    const querySnapshot = await getDocs(collection(db, "books"));
    const tempArray: BookProps[] = [];
    let tempItem: BookProps;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempItem= {
        name: doc.get("name"),
        author: doc.get("author"),
        currentPage: Number(doc.get("currentPage")),
        totalPages: Number(doc.get("totalPages")),
      }
      tempArray.push(tempItem);
    });
    setArray(()=>tempArray);
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
   <ScrollView>
    <TouchableOpacity style={styles.addButton}>
      <Text >ADD</Text>
    </TouchableOpacity>
      <View style={styles.container}>
      {
        array.map( ( item:IBook ) => {
          return <Book 
            key={item.toString()}
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
    backgroundColor:'green',
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'flex-end',
    marginHorizontal:10
  }
});
