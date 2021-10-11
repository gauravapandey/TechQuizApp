import { gql } from '@apollo/client';

export const fetchDomain = gql`
    query {
        domainData{
            id
            domainLabel
            questionSetId
        }
    }
`