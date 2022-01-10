import React, { Component } from "react";
//import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from "./hoc/Layout/Layout";
//import Logout from './containers/Auth/Logout/Logout';
//import { authCheckState } from './store/actions';
import * as calcActions from "./store/actions/calcIndex";
import * as authActions from "./store/actions/index";
import Matrix from "./components/Matrix/Matrix";
import Vector from "./components/Vector/Vector";
import SequenceContainer from "./components/SequenceContainer/SequenceContainer";
import SequenceButton from "./components/SequenceContainer/SequenceButton/SequenceButton";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import classes from "./App.module.css";

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
    mode: "Normal",
    showTutorial: true,
  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  fetchMatrix() {
    this.props.onFetchMatrix(this.state.mode);
  }

  toggleStieltjes = (event) => {
    this.setState({ hideStieltjes: !this.state.hideStieltjes });
  };

  selectMode = (event) => {
    this.setState({ mode: event.target.value });
  };

  toggleTutorial = () => {
    this.setState({ showTutorial: !this.state.showTutorial });
  };

  h1Text = () => {
    if (
      window.location.toString().toLowerCase().includes('exponential') ||
      window.location.toString().toLowerCase().includes('localhost:3000')
    ) {
      console.log(window.location.toString())
      return (
        <h1>
          Welcome to the <span className="exponential-h1">Exponential</span>{' '}
          Riordan Calculator: (click{' '}
          <a
            className="exponential-h1-link"
            href="https://riordancalculator.com"
          >
            here
          </a>{' '}
          for Regular)
        </h1>
      )
    } else {
      return (
        <h1>
          Welcome to the Riordan Calculator: (click{' '}
          <a
            className="exponential-h1-link"
            href="https://exponential.riordancalculator.com"
          >
            here
          </a>{' '}
          for Exponential)
        </h1>
      )
    }
  }

  render() {

    const computeButton = (
      <SequenceButton clicked={() => this.fetchMatrix()} content="Compute" />
    );

    const aSequence = <Vector sequenceSelector="A-sequence" />;

    let bSequence = null;

    if (this.props.riordanIsPseudo) {
      bSequence = <Vector sequenceSelector="B-sequence" />;
    }

    const zSequence = <Vector sequenceSelector="Z-sequence" />;

    let hideStieltjesCheckbox = null;
    if (this.props.riordanGroupElem) {
      hideStieltjesCheckbox = (
        <div>
          <input
            type="checkbox"
            id="hideStieltjes"
            name="hideStieltjes"
            value="hideStieltjes"
            defaultChecked={this.state.hideStieltjes}
            onClick={this.toggleStieltjes}
          ></input>
          <label htmlFor="hideStieltjes"> Hide Stieltjes</label>
        </div>
      );
    }

    const riordanGroupElem = (
      <Matrix matrixSelector="riordan" matrixName="Riordan Group Element: " />
    );

    const exponential = (
      <Matrix matrixSelector="exponential" matrixName="Exponential Riordan Group Element: " />
    )

    let stieltjes = null;
    if (!this.state.hideStieltjes) {
      stieltjes = (
        <Matrix matrixSelector="stieltjes" matrixName="Stieltjes: " />
      );
    }

    let sequences = (
      <span>
        <SequenceContainer sequence={this.props.gSequence} />
        <SequenceContainer sequence={this.props.fSequence} />
      </span>
    );

    if (this.state.mode === "Bell Subgroup") {
      sequences = (
        <span>
          <SequenceContainer sequence={this.props.gSequence} />
          <SequenceContainer
            sequence={{
              ...this.props.gSequence,
              sequence: [0].concat(this.props.gSequence.sequence),
            }}
            disableControls={true}
          />
        </span>
      );
    } else if (this.state.mode === "Derivative Subgroup") {
      const newGSequence = this.props.fSequence.sequence
        .slice(1)
        .map((elem, idx) => {
          return elem * (idx + 1);
        });
      sequences = (
        <span>
          <SequenceContainer
            sequence={{
              ...this.props.gSequence,
              sequence: newGSequence,
            }}
            disableControls={true}
          />
          <SequenceContainer sequence={this.props.fSequence} />
        </span>
      );
    } else if (this.state.mode === "Appell Subgroup") {
      const newFSequence = Array(this.props.gSequence.sequence.length).fill(0);
      newFSequence[1] = 1;
      sequences = (
        <span>
          <SequenceContainer sequence={this.props.gSequence} />
          <SequenceContainer
            sequence={{
              ...this.props.fSequence,
              sequence: newFSequence,
            }}
            disableControls={true}
          />
        </span>
      );
    } else if (this.state.mode === "Associated (Lagrange) Subgroup") {
      const newGSequence = Array(this.props.fSequence.sequence.length).fill(0);
      newGSequence[0] = 1;
      sequences = (
        <span>
          <SequenceContainer
            sequence={{
              ...this.props.gSequence,
              sequence: newGSequence,
            }}
            disableControls={true}
          />
          <SequenceContainer sequence={this.props.fSequence} />
        </span>
      );
    } else if (this.state.mode === "2-Bell Subgroup") {
      let gSquared = Array(this.props.gSequence.sequence.length).fill(0);
      let i = 0;
      for (i = 0; i < gSquared.length; i++) {
        const array_1 = this.props.gSequence.sequence.slice(0, i + 1);
        const array_2 = this.props.gSequence.sequence.slice(0, i + 1).reverse();
        const unreducedProduct = array_1.map((elem, idx) => {
          return elem * array_2[idx];
        });
        gSquared[i] = unreducedProduct.reduce(function (a, b) {
          return a + b;
        }, 0);
      }
      const newFSequence = [0].concat(gSquared);
      sequences = (
        <span>
          <SequenceContainer sequence={this.props.gSequence} />
          <SequenceContainer
            sequence={{
              ...this.props.gSequence,
              sequence: newFSequence,
            }}
            disableControls={true}
          />
        </span>
      );
    } else if (window.location.search) {
      const f_and_g = window.location.search.split('&')
      var gSequence = f_and_g[0].slice(3).split(',').map(Number)
      var fSequence = f_and_g[1].slice(2).split(',').map(Number)
      var minLength = Math.min(gSequence.length, fSequence.length)
      gSequence = gSequence.slice(0,minLength)
      fSequence = fSequence.slice(0,minLength)
      sequences = (
        <span>
          <SequenceContainer
            sequence={{
              ...this.props.gSequence,
              sequence: gSequence,
              sequenceIsFreeform: true,
              sequenceName: '',
            }}
            disableControls={true}
          />
          <SequenceContainer
            sequence={{
              ...this.props.fSequence,
              sequence: fSequence,
              sequenceIsFreeform: true,
              sequenceName: '',
            }}
            disableControls={true}
          />
        </span>
      )
      
    }

    const tutorialToggle = (
      <span>
        <br />
        <strong>{"Quick Tutorial: "}</strong>
        <a href="#" onClick={() => this.toggleTutorial()}>
          {this.state.showTutorial ? "(Hide)" : "(Show)"}
        </a>
      </span>
    );

    let tutorialText = null;
    if (this.state.showTutorial) {
      tutorialText = (
        <div>
          <ul>
            <li>
              <strong>{"Selecting a sequence:"}</strong>
              <ul>
                <li>
                  {
                    "Select a preset sequence from the dropdown by clicking the input box next to 'g' or 'f'."
                  }
                </li>
                <li>
                  {"*Note: you must click the box "}
                  <strong>{" twice "}</strong>
                  {" to select a new preset if one is already selected."}
                </li>
                <li>
                  {
                    "Fetch any OEIS sequence by typing its OEIS ID into the sequence box: (e.g. 'A123456' or just '123456'). Note: You may have to wait a second for it to load."
                  }
                </li>
                <li>
                  {
                    "Use a custom sequence by typing it into sequence box: (e.g. '1,2,3,4,5,6,7'). Custom sequences must contain at least three terms."
                  }
                </li>
              </ul>
            </li>
            <li>
              <strong>{"Modifying sequences and changing the window:"}</strong>
              <ul>
                <li>
                  {"Press the '+0' button to prepend a zero to the sequence."}
                </li>
                <li>
                  {"Press the '<' to delete the first term from the sequence."}
                </li>
                <li>
                  {
                    "Press the '+' button to reveal one more term from the sequence."
                  }
                </li>
                <li>
                  {
                    "Press the '-' button to conceal the last displayed term from the sequence."
                  }
                </li>
              </ul>
            </li>
            <li>
              <strong>{"Computing the Riordan Group:"}</strong>
              <ul>
                <li>
                  {
                    "Once 'g' and 'f' are as desired, click the 'Compute' button."
                  }
                </li>
                <li>
                  {
                    "Check the 'Show Row Sums' button to reveal the row sums and alternating-row sums."
                  }
                </li>
                <li>
                  {
                    "The OEIS buttons for each row and column take you to the OEIS search page for that row or column."
                  }
                </li>
                <li>
                  {"Show the Stieltjes matrix by unchecking 'Hide Stieltjes'."}
                </li>
              </ul>
            </li>
            <li>
              <strong>{"Selecting a mode"}</strong>
              <ul>
                <li>
                  <strong>{"Normal Mode: "}</strong>
                  {" the 'g' and 'f' sequences can be edited independently."}
                </li>
                <li>
                  <strong>{"Bell Subgroup: "}</strong>
                  {" the 'f' sequence is determined by the 'g' sequence."}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      );
    }



    return (
      <div>
        <Layout>
          <div className={classes.AppBody}>
            {this.h1Text()}
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
            {exponential}
          </div>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    fSequence: state.calc.fSequence,
    gSequence: state.calc.gSequence,
    riordanIsPseudo: state.calc.riordan_is_pseudo,
    newSequenceLoading: state.calc.newSequenceLoading,
    riordanGroupElem: state.calc.riordan_group_elem,
    exponential: state.calc.exponential
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMatrix: (mode) => dispatch(calcActions.fetchMatrix(mode)),
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
