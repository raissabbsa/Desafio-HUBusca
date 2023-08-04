import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import Language from "./Language";
import styled from 'styled-components';
import * as Linking from 'expo-linking';

export default function Repositorie({rep}){
    const [adaptLanguages, setAdaptLanguages] = useState([]);
    useEffect(() => {
        const promise = axios.get(rep.languages_url);
        promise.then(res => {
            for(const key in res.data){
                if(!adaptLanguages.find(lang => lang==key)){
                    setAdaptLanguages(adaptLanguages => [...adaptLanguages, key]);
                }
            }
        });
        promise.catch(err => {
            console.log(err);
        })
    }, []);
    return(
        <RepositorieInformation>
            <TitleRepositorie>{rep.name}</TitleRepositorie>
            <TextRepositorie>Descrição: {rep.description}</TextRepositorie>
            <TextRepositorie>Data de criação: {rep.created_at.slice(0,10)}</TextRepositorie>
            <TextRepositorie>Data do último push: {rep.pushed_at.slice(0,10)}</TextRepositorie>
            <LanguagesContainer>
                <Text>Linguagens utilizadas: </Text>
                {adaptLanguages.length > 0 ? (
                    adaptLanguages.map((language,id) => <Language key={id} language={language}/>)
                ):(
                    <Text></Text>
                )}
            </LanguagesContainer>
            <RepositorieButton title="Ir para o repositório" 
                onPress={() => Linking.openURL(rep.html_url)}
                color="#786f6f" 
                />
        </RepositorieInformation>
    )
}
const RepositorieInformation = styled.View`
    margin-top: 30px;
`

const RepositorieButton = styled.Button`
    background-color: #000000;
    color: black;
    border-radius: 5px;
`;

const TitleRepositorie = styled.Text`
    font-weight: bold;
    font-size: 17px;
`

const TextRepositorie = styled.Text`
    font-size: 15px;
`
const LanguagesContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

