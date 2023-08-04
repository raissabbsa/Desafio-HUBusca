import { View, Text } from "react-native";
import styled from 'styled-components';
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../src/userData";
import axios from "axios"

export default function Page () {
    const { userData } = useContext(UserContext);
    const [repositories, setRepositories] = useState([]);
    console.log(userData)
    useEffect(() => {
        const promise = axios.get(userData.repos_url)
        promise.then(res => {
            setRepositories(res.data);
        });
        promise.catch(err => {
            console.log(err);
        })
    }, []);
    
    return (
        <Container>
            <Link href="/">mudaa</Link>
            <UserImage source={{uri: userData.avatar_url}} />
            <Information >{userData.name}</Information>
            <Information>{userData.login}</Information>
            <Information>{userData.id}</Information>
            <Information>{userData.followers} followers · {userData.following} following</Information>
            <Information>{userData.location}</Information>
            <Information>{userData.public_repos} Repositórios</Information>

        </Container>
    );
}
const Container = styled.View`
    display: flex;
    flex-direction: column;
    background-color: pink;
    align-items: center;
    padding-top: 50px;
    width: 100%;
`

const Teste = styled.Text`
    background-color: blue;
`

const Information = styled.Text`
    font-size: 20px;
`
const UserImage = styled.Image`
    width: 200px;
    height: 200px;
`

