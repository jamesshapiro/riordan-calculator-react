import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    console.log(props)
    console.log(props.selected)

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            console.log('props.selected')
            console.log(props.selected)
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    //value={props.value}
                    onChange={props.changed} >
                    {/* value={props.elementConfig.options.filter(option => option.value === props.selected)[0]}> */}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                    
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
        
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input