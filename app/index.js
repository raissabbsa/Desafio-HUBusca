import { useContext, useState } from "react";
import { Text, View } from "react-native";
import styled from 'styled-components';
import axios from "axios"
import { UserContext } from "../src/userData";
import Historic from "../src/Historic";
import { FontAwesome } from '@expo/vector-icons';

export default function Page () {
    const { setUserData, setUserHistory, userHistory } = useContext(UserContext);
    const [search, setSearch] = useState();

    function submit(){
        const URL = "https://api.github.com/users";
        const promise = axios.get(`${URL}/${search}`)
        promise.then(res => {
            setUserData(res.data);
            if(!userHistory.find(user => user.login===res.data.login)){
                setUserHistory([...userHistory, res.data]);
            }
        });
        promise.catch(err => {
            console.log(err);
        });
    }
    return (
            <Container>
                <Title>HUBusca</Title>
                <SearchDiv>
                    <Input 
                        placeholder="Digite o nome de usuário"
                        onChangeText={text => setSearch(text)} 
                        value={search}
                    />
                    <FontAwesome name="search" size={30} color="black" onPress={() => submit()} style={{ paddingTop: 8 }}/>
                </SearchDiv>
                <HistoricContainer>
                    {userHistory.length > 0 ? (
                        userHistory.reverse().map((user, id) => <Historic user={user} key={id}/>)
                    ) : (
                        <Text></Text>
                    )}
                </HistoricContainer>
            </Container>
    );
}

const Container = styled.View`
    display: flex;
    background-color: pink;
    padding-top: 100px;
    padding-left: 40px;
    height: 100%;
    box-sizing: border-box;
`;

const Title = styled.Text`
    font-size: 40px;
    margin-bottom: 10px;
`;

const HistoricContainer = styled.ScrollView`
    padding-bottom: 200px;
    margin-top: 40px;
`

const SearchDiv = styled.View`
    display: flex;
    flex-direction: row;
`;

const Input = styled.TextInput`
    border: 1px solid black;
    height: 50px;
    width: 300px;
    border-radius: 4px;
    padding: 4px;
    margin-right: 5px;
`;