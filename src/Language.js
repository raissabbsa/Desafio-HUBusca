import styled from 'styled-components';


export default function Language({language}){
    return(<LanguageInformation>{language} · </LanguageInformation>)
}

const LanguageInformation = styled.Text`
    font-size: 15px;
    margin-right: 5px;
`
