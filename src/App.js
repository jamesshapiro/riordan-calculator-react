import React, { Component } from 'react';
//import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
//import Logout from './containers/Auth/Logout/Logout';
//import { authCheckState } from './store/actions';
import * as calcActions from './store/actions/calcIndex';
import * as authActions from './store/actions/index';
import Matrix from './components/Matrix/Matrix';
import Vector from './components/Vector/Vector';
import SequenceContainer from './components/SequenceContainer/SequenceContainer';
import SequenceButton from './components/SequenceContainer/SequenceButton/SequenceButton';

// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// });

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  fetchMatrix() {
    this.props.onFetchMatrix()
  }

  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={asyncAuth} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //     <Redirect to="/" />
    //   </Switch>
    // );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={asyncCheckout} />
    //       <Route path="/orders" component={asyncOrders} />
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/auth" component={asyncAuth} />
    //       <Route path="/" exact component={BurgerBuilder} />
    //       <Redirect to="/" />
    //     </Switch>
    //   );
    // }

    const computeButton = (<SequenceButton
      clicked={() => this.fetchMatrix()}
      content="Compute"
    />)

    const aSequence = (
      <Vector sequenceSelector="A-sequence" />
    )

    let bSequence = null

    if (this.props.riordanIsPseudo) {
      bSequence = (
        <Vector sequenceSelector="B-sequence" />
      )
    }
    
    const zSequence = (
      <Vector sequenceSelector="Z-sequence" />
    )

    return (
      <div>
        <Layout>
          <h1>Welcome to the Riordan Calculator v2</h1>
          <SequenceContainer sequence={this.props.gSequence} />
          <SequenceContainer sequence={this.props.fSequence} />
          {computeButton}
          <Matrix 
            matrixSelector="riordan"
            matrixName="Riordan Group Element: "
          />
          {aSequence}
          {bSequence}
          {zSequence}
          <Matrix 
            matrixSelector="stieltjes"
            matrixName="Stieltjes: "
          />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    fSequence: state.calc.fSequence,
    gSequence: state.calc.gSequence,
    riordanIsPseudo: state.calc.riordan_is_pseudo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMatrix: () => dispatch(calcActions.fetchMatrix()),
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
