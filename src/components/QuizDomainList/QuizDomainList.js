import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { fetchDomain } from "../../graphql/domain/query";
import * as domainActions from '../../redux/domain/domain.reducer';
import './style.scss';

const QuizDomainList = (props) => {
    const { setQuizDomain, domainList } = props;
    const { data } = useQuery(fetchDomain);

    useEffect(()=>{
        if(data){
            setQuizDomain(data.domainData);
        }
    },[data])

    return (
        <div className="domain-listing-container">
            <h2>Tech Quiz Domain</h2>
            <ul className="domain-listing-items">
                {
                    domainList && domainList.length ? (
                        domainList.map( domain => {
                            return(
                                <li className="animate">
                                        {domain.domainLabel}
                                </li>
                            )
                        })
                    ) : null
                }
            </ul>
        </div>
    )
}

const mapStateToProps = ({ domain })=>({
    domainList: domain.domainList
})

const mapDispatchToProps = {
    setQuizDomain: domainActions.setQuizDomain
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizDomainList);