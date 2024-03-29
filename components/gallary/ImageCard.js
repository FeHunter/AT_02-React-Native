import { View, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function ImageCard ({image, removeFoto}){

    function remove (){
        removeFoto(image)
    }

    return (
        <View style={styles.card}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.buttonsCard}>
                <Pressable>
                    <Icon name='heart' size={30} color={'black'} />
                </Pressable>
                <Pressable>
                    <Icon name='share' size={30} color={'black'} />
                </Pressable>
                <Pressable onPress={remove}>
                    <Icon name='remove' size={30} color={'black'} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        marginVertical: 5,
    },
    image: {
        width: '100%',
        height: 300,
    },
    buttonsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});