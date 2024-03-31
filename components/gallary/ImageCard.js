import { View, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function ImageCard ({image, removePhoto}){

    function remove (){
        removePhoto(image);
    }

    return (
        <View style={styles.card}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.buttonsCard}>
                <Pressable>
                    <Icon name='thumbs-up' size={20} color={'gray'} />
                </Pressable>
                <Pressable>
                    <Icon name='share' size={20} color={'gray'} />
                </Pressable>
                <Pressable onPress={remove}>
                    <Icon name='remove' size={20} color={'gray'} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 250,
        borderWidth: 1,
        margin: 20,
        shadowColor: 'gray', 
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
    },
    buttonsCard: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});