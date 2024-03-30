import { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export function EventImagesTab ({route}){

    const {item} = route.params;

    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Fotos do Evento</Text>
            <FlatList
                contentContainerStyle={styles.list}
                data={item.imagens}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Image source={{uri: item}} style={styles.imagem} onLoad={()=>{setIsLoading(false)}} />
                            {isLoading ? <ActivityIndicator size={30} color={"blue"} /> : <Text></Text>}
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    titulo: {
        textAlign: 'center',
        fontSize: '3em',
        marginVertical: 10,
      },
    imagem: {
        width: 300,
        height: 300,
        margin: 20,
    },
    list: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
});
