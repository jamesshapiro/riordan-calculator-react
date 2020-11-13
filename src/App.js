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
import ModeSelector from './components/ModeSelector/ModeSelector';
import classes from './App.module.css';

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
  state = {
    hideStieltjes: true,
    mode: 'Normal',
    showTutorial: false
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  fetchMatrix() {
    this.props.onFetchMatrix()
  }

  toggleStieltjes = (event) => {
    this.setState({ hideStieltjes: !this.state.hideStieltjes })
  }

  selectMode = (event) => {
    this.setState({ mode: event.target.value })
  }

  toggleTutorial = () => {
    this.setState({ showTutorial: !this.state.showTutorial })
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

    const hideStieltjesCheckbox = (
      <div>
        <input
          type="checkbox"
          id="hideStieltjes"
          name="hideStieltjes"
          value="hideStieltjes"
          defaultChecked={this.state.hideStieltjes}
          onClick={this.toggleStieltjes}></input>
        <label htmlFor="hideStieltjes"> Hide Stieltjes</label>
      </div>
    )

    const riordanGroupElem = (
      <Matrix
        matrixSelector="riordan"
        matrixName="Riordan Group Element: "
      />
    )

    let stieltjes = null
    if (!this.state.hideStieltjes) {
      stieltjes = (
        <Matrix
          matrixSelector="stieltjes"
          matrixName="Stieltjes: "
        />
      )
    }

    let sequences = (
      <span>
        <SequenceContainer sequence={this.props.gSequence} />
        <SequenceContainer sequence={this.props.fSequence} />
      </span>
    )

    if (this.state.mode === 'Bell Subgroup') {
      sequences = (
        <span>
          <SequenceContainer sequence={this.props.gSequence} />
          <SequenceContainer sequence={{...this.props.gSequence, sequence: [0].concat(this.props.gSequence.sequence)}} disableControls={true} />
        </span>
      )
    }

    const tutorialToggle = (
      <span>
        <br />
        {"Confused? See the quick guide to using the Riordan Calculator: "}
        <a href="#" onClick={() => this.toggleTutorial()}>
          {"HERE"}
        </a><br /><br />
      </span>
    )

    let tutorialText = null
    if (this.state.showTutorial) {
      tutorialText = (
        <div>
          {"Here is how you use the Riordan Calculator..."}
          <br /><br />
          <a href="#" onClick={() => this.toggleTutorial()}>
          {"(Hide Tutorial)"}
        </a><br /><br />
        </div>
      )
    }

    return (
      <div>
        <Layout>
          <div className={classes.AppBody}>
            <h1>Welcome to the Riordan Calculator v2</h1>
            <ModeSelector changed={this.selectMode} />
            {sequences}
            {computeButton}
            {riordanGroupElem}
            {aSequence}
            {bSequence}
            {zSequence}
            {hideStieltjesCheckbox}
            {stieltjes}
            {tutorialToggle}
            {tutorialText}
            
          </div>
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
    riordanIsPseudo: state.calc.riordan_is_pseudo,
    newSequenceLoading: state.calc.newSequenceLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMatrix: () => dispatch(calcActions.fetchMatrix()),
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
