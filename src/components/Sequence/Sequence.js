import React, { Component } from 'react';
import { connect } from 'react-redux';

//import Button from '../../components/UI/Button/Button';
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
        this.props.onSetSequence(this.props.sequence.sequenceId, event.target.value, this.props.sequence.leadingZeroes)
    }

    addLeadingZero(sequence) {
        // console.log("SEQUENCE");
        // console.log(sequence);
        this.props.onAddZero(sequence);
    }

    render() {
        let seq = Array(this.props.sequence.leadingZeroes).fill(0)
        seq = seq.concat(sequenceMap[this.props.sequence.sequenceName]);
        const formElementsArray = [];
        for (let key in this.state.sequenceContainer) {
            formElementsArray.push({
                id: key,
                config: this.state.sequenceContainer[key]
            });
        }

        // console.log('SEQUENCESEQUENCE')
        // console.log(this.props.sequence)
        

        let form = (
            <form className={classes.SequenceForm} onSubmit={this.orderHandler}>
                {this.props.sequence.sequenceId}-Sequence:
                <button type="button" onClick={() => this.addLeadingZero(this.props.sequence)}>&gt;</button>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        selected={this.props.sequence.sequenceName}
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
        //sequence: this.props.sequenceId === 'g' ? state.calc.gSequence : state.calc.fSequence
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSetSequence: (sequenceId, sequenceName, leadingZeroes) => dispatch(actions.setSequence(sequenceId, sequenceName, leadingZeroes)),
        onAddZero: (sequence) => dispatch(actions.addZero(sequence))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);