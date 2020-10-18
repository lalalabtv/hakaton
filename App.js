import * as React from 'react';
import { useState , useCallback} from 'react'
import { Button, Text, TextInput, View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';


const PizzaTranslator = () => {
    const [userName, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [UserID, SetUserID] = useState("");

    const FetchedData = useCallback(async () => {
        const Connect = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: 'userName',
                password: 'password',
            }),
        });

        if (Connect.token !== null) {
            console.log(Connect.token);
        }
        SetUserID(Connect.userId);
    }, []);

    return (
        <View style={styles.container}>

            <Text>Авторизация</Text>
            <TextInput
                style={{height: 40}}
                placeholder="Логин"
                onChangeText={userName => setUsername(userName)}
            />

            <TextInput
                style={{height: 40}}
                placeholder="Пароль"
                onChangeText={password => setpassword(password)}
            />

            <Button
                onPress={() => {
                    FetchedData;
                }}
                title={'Авторизоваться'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10,
        color: '#005B9C',
    },
    maxi: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    mini: {
        fontSize: 20,
    },
});

export default PizzaTranslator;




