import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Button, Alert, Text, View } from "react-native";
import styled from 'styled-components';
import axios from "axios"
import { UserContext } from "../src/userData";

export default function Page () {
    const { setUserData } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [search, setSearch] = useState();
    const [able, setAble] = useState(false);

    function submit(){
        const URL = "https://api.github.com/users";
        Alert.alert('Alert Title', URL, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        const promise = axios.get(`${URL}/${search}`)
        promise.then(res => {
            setAble(true);
            setUser(res.data);
            console.log(res.data);
            setUserData(res.data);
        });
        promise.catch(err => {
            console.log(err);
        });
    }
    return (
            <Container>
                <Title>HUBusca</Title>
                <Teste>
                    <Input 
                        placeholder="Digite o nome de usuário"
                        onChangeText={text => setSearch(text)} 
                        value={search}
                    />
                    <SearchButton title="S" onPress={submit}></SearchButton>
                </Teste>
                {able? (
                    <View>
                        <Link href="/profile"><UserImage source={{uri: user.avatar_url}} /></Link>
                        <Information>Nome:{user.name}</Information>
                        <Information>Login:{user.login}</Information>
                        <Information>Localização:{user.location}</Information>
                    </View>
                ): (
                    <Text></Text>
                )}
            </Container>
    );
}

const Container = styled.View`
    display: flex;
    background-color: pink;
    align-items: center;
    padding: 100px;
    height: 100%;
`;

const Title = styled.Text`
    font-size: 40px;
`;

const Teste = styled.View`
    display: flex;
    flex-direction: row;
`;

const SearchButton = styled.Button`
    width: 15px;
    height: 50px;
`

const Information = styled.Text`
    font-size: 20px;
`
const UserImage = styled.Image`
    width: 200px;
    height: 200px;
`

const Input = styled.TextInput`
    border: 1px solid black;
    height: 50px;
    width: 200px;
    border-radius: 2px;
`;
