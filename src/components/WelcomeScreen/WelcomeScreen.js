import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { commonActions } from '../../redux/common';
import './style.scss';

const WelcomeScreen = (props) => {

    const { setAppInitialised, text } = props;

    useEffect(()=>{
        setTimeout(()=>{
            setAppInitialised();
        }, 6000)
    },[])
    
	return (
		<div className="container">
            <div className="content">
                <div>{text}</div> 
                <div> 
                    <span>To The Tech Quiz</span>
                </div>
            </div>
		</div>
	);
};

const mapStateToProps = ()=>({})

const mapDispatchToProps = {
    setAppInitialised: commonActions.setAppInitialised
}

export default connect(mapStateToProps,mapDispatchToProps)(WelcomeScreen);
