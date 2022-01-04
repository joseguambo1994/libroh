import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

type BookProps = {
  bookId: string,
    name: string,
    author: string,
    currentPage: number,
    totalPages: number,
}

const Book = (props: BookProps) => {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}
    onPress={() => {
      navigation.navigate(
        'Root',
        { screen:'TabThree', params:{bookId:props.bookId}}
            );

    }}
    >
        <Text numberOfLines={1} style={styles.textName}>
            {props.name}
        </Text>
        <View style={{flexDirection:'column', flex:1,
      
      }}>
        <Text numberOfLines={1} style={styles.textAuthor}>
            {props.author}
        </Text>
        <Text numberOfLines={1} style={styles.textPages}>
            {props.currentPage + ' / '+ props.totalPages}
        </Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
      height:60,
      width:'95%',
      backgroundColor:'white',
      margin:10,
      padding:10,
      flexDirection:'row',
      borderRadius:15,
      borderWidth:1,
      borderColor:'purple',
      alignItems:'center'
  },
  textName:{
    flex:3,
    overflow:'hidden',
    fontSize:20,
  },
  textAuthor:{
    flex:1,
    overflow:'hidden',

},textPages:{
    flex:1,
    overflow:'hidden',

},
});

export default Book;