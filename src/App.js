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
    showTutorial: true
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
          <SequenceContainer sequence={{ ...this.props.gSequence, sequence: [0].concat(this.props.gSequence.sequence) }} disableControls={true} />
        </span>
      )
    }

    const tutorialToggle = (
      <span>
        <br />
          <strong>{"Quick Tutorial: "}</strong><a href="#" onClick={() => this.toggleTutorial()}>
            {this.state.showTutorial ? "(Hide)" : "(Show)"}
          </a>
      </span>
    )

    let tutorialText = null
    if (this.state.showTutorial) {
      tutorialText = (
        <div>
          <ul>
            <li>
              <strong>{"Selecting a sequence:"}</strong>
              <ul>
                <li>{"Select a preset sequence from the dropdown by clicking the input box next to 'g' or 'f'."}</li>
                <li>{"*Note: you must "}<strong>{" double-click "}</strong>{" the box to select a new preset if one is already selected."}</li>
                <li>{"Fetch any OEIS sequence by typing its OEIS ID into the sequence box: (e.g. 'A123456' or just '123456')."}</li>
                <li>{"Use a custom sequence by typing it into sequence box: (e.g. '1,2,3,4,5,6,7'). Custom sequences must contain at least three terms."}</li>
              </ul>
            </li>
            <li>
              <strong>{"Modifying sequences and changing the window:"}</strong>
              <ul>
                <li>{"Press the '+0' button to prepend a zero to the sequence."}</li>
                <li>{"Press the '<' to delete the first term from the sequence."}</li>
                <li>{"Press the '+' button to reveal one more term from the sequence."}</li>
                <li>{"Press the '-' button to conceal the last displayed term from the sequence."}</li>
              </ul>
            </li>
            <li>
              <strong>{"Computing the Riordan Group:"}</strong>
              <ul>
                <li>{"Once 'g' and 'f' are as desired, click the 'Compute' button"}</li>
                <li>{"Check the 'Show Row Sums' button to reveal the row sums and alternating-row sums."}</li>
                <li>{"The OEIS buttons for each row and column take you to the OEIS page for that row or column"}</li>
                <li>{"Show the Stieltjes matrix by unchecking 'Hide Stieltjes'"}</li>
              </ul>
            </li>
            <li>
              <strong>{"Selecting a mode"}</strong>
              <ul>
                <li><strong>{"Normal Mode: "}</strong>{" the 'g' and 'f' sequences can be edited independently"}</li>
                <li><strong>{"Bell Subgroup: "}</strong>{" the 'f' sequence is determined by the 'g' sequence"}</li>
              </ul>
            </li>

          </ul>
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
