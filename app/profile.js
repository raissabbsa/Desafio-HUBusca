import { Text } from "react-native";
import styled from 'styled-components';
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../src/userData";
import axios from "axios";
import Repositorie from "../src/Repositorie";

export default function Page () {
    const { userData } = useContext(UserContext);
    const [repositories, setRepositories] = useState([]);
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
            <MainInformation>
                <UserImage source={{uri: userData.avatar_url}} />
                <Information >{userData.name}</Information>
                <Information>login: {userData.login}</Information>
                <Information>id: {userData.id}</Information>
                <Information>{userData.followers} followers · {userData.following} following</Information>
                <Information>{userData.location}</Information>
                <Information>{userData.public_repos} Repositórios</Information>
            </MainInformation>
            {repositories.length > 0 ? (
                <Repositories>
                    {repositories.map(rep => (<Repositorie key={rep.id} rep={rep}  />))}
                </Repositories>

            ) : (<Text></Text>)}
            

        </Container>
    );
}
const Container = styled.View`
    background-color: pink;
    padding-top: 50px;
    width: 100%;
    padding-left: 15px;
`;

const MainInformation = styled.View`
    display: flex;
    align-items: center;
`;
const Repositories = styled.ScrollView`
    margin-bottom: 200px;
`;

const Information = styled.Text`
    font-size: 15px;
`;
const UserImage = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 5px;
`;

