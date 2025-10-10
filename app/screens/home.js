import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.Container}>
      <Text>Tela Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;