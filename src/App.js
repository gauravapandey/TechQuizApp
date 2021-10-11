import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import QuizDomainList from './components/QuizDomainList/QuizDomainList';

const history = createBrowserHistory();

function App(props) {

  const { appInitialised } = props;

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if(graphqlErrors){
      graphqlErrors.map( error => console.log(error))
    }
  })

  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:8888/graphql" })
  ])

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })

	return (
    <div className="App">
      <video autoPlay muted loop id="myVideo">
        <source src="./assets/video/mainBackground.mp4" type="video/mp4" />
      </video>
      <ApolloProvider client={client}>
        <Router history={history}>
          {
            !appInitialised ? <WelcomeScreen text="good morning!" /> : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={ () => (
                    <Redirect to='/quizDomain'/>
                  )}
                />
                <Route
                  path="/quizDomain"
                  render={()=> {
                    console.log("renderinngg");
                    return (
                      <QuizDomainList/>
                    )
                  }}
                />
              </Switch>
            )
          }
        </Router>      
      </ApolloProvider>
    </div>
  );
}

const mapState = ({ common }) => ({
  appInitialised: common.appInitialised
})

export default connect(mapState)(App);
