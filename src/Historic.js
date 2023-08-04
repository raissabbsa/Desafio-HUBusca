import { View, Text } from "react-native";
import styled from 'styled-components';
import { Link } from "expo-router";

export default function Historic({user}) {
    
    return(
        <HistoricContainer>
            <Link href="/profile"><View><UserImage source={{uri: user.avatar_url}} /></View></Link>
            <Information>Nome: {user.name}</Information>
            <Information>Login: {user.login}</Information>
            <Information>Localização: {user.location}</Information>
        </HistoricContainer>
    )

}
const HistoricContainer = styled.View`
    height: auto;
    margin-bottom: 20px;
`
const Information = styled.Text`
    font-size: 14px;
`
const UserImage = styled.Image`
    width: 100px;
    height: 120px;
    border-radius: 20px;
    padding-bottom: 10px;
`