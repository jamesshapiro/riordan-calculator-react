import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Sequence.module.css';
//import axios from '../../../axios-orders';
import Input from '../../components/UI/Input/Input';
//import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/calcIndex';
import { updateObject, checkValidity } from '../../shared/utility';
import { sequenceMap, sequenceNames } from '../../data/sequenceData'

class Sequence extends Component {
    state = {
        sequenceContainer: {
            // name: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Your Name'
            //     },
            //     value: '',
            //     validation: {
            //         required: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: sequenceNames.map(sequenceName => {
                        return { value: sequenceName, displayValue: sequenceName };
                    })
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false

    }

    // orderHandler = (event) => {
    //     event.preventDefault();
    //     const formData = {};
    //     for (let formElementIdentifier in this.state.orderForm){
    //         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    //     }
    //     const order = {
    //         ingredients: this.props.ings,
    //         price: this.props.price,
    //         orderData: formData,
    //         userId: this.props.userId
    //     }
    //     this.props.onOrderBurger(order, this.props.token);
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderFormElement = updateObject(this.state.sequenceContainer[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                this.state.sequenceContainer[inputIdentifier].validation
            ),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.sequenceContainer, {
            [inputIdentifier]: updatedOrderFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
        this.props.onSetSequence(this.props.sequenceId, event.target.value, 0)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.sequenceContainer) {
            formElementsArray.push({
                id: key,
                config: this.state.sequenceContainer[key]
            });
        }

        //console.log(this.props.fSequence)
        let seq = sequenceMap[this.props.gSequence.sequenceName];
        if (this.props.sequenceId === 'f') {
            seq = sequenceMap[this.props.fSequence.sequenceName];
        }

        let form = (
            <form className={classes.SequenceForm} onSubmit={this.orderHandler}>
                {this.props.sequenceId}-Sequence:
                {formElementsArray.map(formElement => (
                    <Input
                        className={classes.SequenceSelector}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                {/* <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button> */}

                {seq.join(', ')}
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }


        return (
            <div>
                {form}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        // ings: state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice,
        // sequenceStore: state.order.loading,
        // token: state.auth.token,
        fSequence: state.calc.fSequence,
        gSequence: state.calc.gSequence
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSetSequence: (sequenceId, sequenceName, leadingZeroes) => dispatch(actions.setSequence(sequenceId, sequenceName, leadingZeroes))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);