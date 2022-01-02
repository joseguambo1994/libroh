import { StyleSheet } from 'react-native';
import Book from '../components/Book';
import { View } from '../components/Themed';

const burnedBook = {
  name: 'Grokking simplicity',
  author: 'John Doe',
  currentPage: 78,
  totalPages: 420
}

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Book
      name={burnedBook.name}
      author={burnedBook.author}
      currentPage={burnedBook.currentPage}
      totalPages={burnedBook.totalPages}
      ></Book>
         <Book
      name={burnedBook.name}
      author={burnedBook.author}
      currentPage={burnedBook.currentPage}
      totalPages={burnedBook.totalPages}
      ></Book>
         <Book
      name={burnedBook.name}
      author={burnedBook.author}
      currentPage={burnedBook.currentPage}
      totalPages={burnedBook.totalPages}
      ></Book>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
