import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const URI = "https://dog.ceo/api/breeds/image/random";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState({});

  const getDogImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(URI);
      const json = await response.json();
      setImageURL({uri: json.message});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getDogImage() }, []);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="blue" />}
      {!isLoading &&
        <>
          <Image source={imageURL} style={styles.image} />
          <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            getDogImage();
          }}>
            <Text style={styles.textoBotao}>Buscar</Text>
          </TouchableOpacity>
        </>
      }
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  botao: {
    width: 300,
    textAlign: 'center',
    backgroundColor: "blue",
    alignSelf: 'center',
    padding: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  }
});
