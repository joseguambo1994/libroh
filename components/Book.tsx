import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

type BookProps = {
    name: string,
    author: string,
    currentPage: number,
    totalPages: number,
}

const Book = (props: BookProps) => {
  return (
    <TouchableOpacity style={styles.container}>
        <Text numberOfLines={1} style={styles.textName}>
            {props.name}
        </Text>
        <Text numberOfLines={1} style={styles.textAuthor}>
            {props.author}
        </Text>
        <Text numberOfLines={1} style={styles.textPages}>
            {props.currentPage + ' / '+ props.totalPages}
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
      height:60,
      width:'95%',
      backgroundColor:'white',
      margin:20,
      flexDirection:'row',
      borderRadius:15,
      borderWidth:1,
      borderColor:'purple',
      alignItems:'center'
  },
  textName:{
    flex:2,
    backgroundColor:'green',
    overflow:'hidden',
  },
  textAuthor:{
    flex:1,
    backgroundColor:'orange',
    overflow:'hidden',

},textPages:{
    flex:1,
    backgroundColor:'blue',
    overflow:'hidden',

},
});

export default Book;