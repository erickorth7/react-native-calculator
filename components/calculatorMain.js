import React, { Component } from 'react';
import { DIGITS } from '../shared/digits';
import { View, Text, Button } from 'react-native';


export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            digits: DIGITS,
            input: '',
            operator: '',
            addStylesActive: false,
            subtractStylesActive: false,
            multiplyStylesActive: false,
            divideStylesActive: false,
            setCalc: ''
        }   
    }
    
    render() {


        const updateCalc = (value) => {
            this.setState({
                setCalc: this.state.setCalc + value
            });

            if(this.state.setCalc.length === 9) {
                this.setState({
                    setCalc: this.state.setCalc
                });
            }
        }

        const resetCalc = () => {
            this.setState({
                input: '',
                operator: '',
                addStylesActive: false,
                subtractStylesActive: false,
                multiplyStylesActive: false,
                divideStylesActive: false,
                setCalc: ''
            });
        }

        const handleOperator = (value) => {
            this.setState({
                input: this.state.setCalc,
                operator: value,
                setCalc: ''
            });

            switch(value) {
                case '+':
                    this.setState({
                        addStylesActive: true
                    })
                    break;

                case '-':
                    this.setState({
                        subtractStylesActive: true
                    })
                    break;

                case '*':
                    this.setState({
                        multiplyStylesActive: true
                    })
                    break;
                
                case '/':
                    this.setState({
                        divideStylesActive: true
                    })
                    break;
            }
        }

        const solve = (operator) => {

            switch(operator) {
                case '+':
                    if(parseFloat(this.state.input) + parseFloat(this.state.setCalc) > 999999999) {
                        this.setState({
                            setCalc: 'E',
                            addStylesActive: false
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) + parseFloat(this.state.setCalc),
                            addStylesActive: false
                        })
                    }
                    break;

                case '-':
                    this.setState({
                        setCalc: parseFloat(this.state.input) - parseFloat(this.state.setCalc),
                        subtractStylesActive: false
                    })
                    break;

                case '*':
                    if(parseFloat(this.state.input) * parseFloat(this.state.setCalc) > 999999999) {
                        this.setState({
                            setCalc: 'E',
                            multiplyStylesActive: false
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) * parseFloat(this.state.setCalc),
                            multiplyStylesActive: false
                        })
                    }
                    break;

                case '/':
                    if(parseFloat(this.state.input) / parseFloat(this.state.setCalc) > 999999999) {
                        this.setState({
                            setCalc: 'E',
                            divideStylesActive: false
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) / parseFloat(this.state.setCalc),
                            divideStylesActive: false
                        })
                    }
                    break;
            }
        }

        return (
            <View>
                <View>
                    <Text>React Native Calculator</Text>
                </View>
                <View className='calculatorFrame'>
                    <View className="display">
                        <Text style={{fontSize: 40}}>
                            {this.state.setCalc || this.state.input || '0'}
                        </Text>
                    </View>
                </View>
                <View className='operators'>
                    <Button
                        className={`col-2 button operator${this.state.addStylesActive ? 'Active' : ''}`}
                        value="+" 
                        onPress={() => handleOperator("+")}
                        title='+'>
                        +
                    </Button>
                    <Button
                        className={`col-2 button operator${this.state.subtractStylesActive ? 'Active' : ''}`}
                        value="-"
                        onPress={() => handleOperator("-")}
                        title='-'>
                        -
                    </Button>
                    <Button
                        className={`col-2 button operator${this.state.multiplyStylesActive ? 'Active' : ''}`}
                        value="*"
                        onPress={() => handleOperator("*")}
                        title='*'>
                        *
                    </Button>
                    <Button
                        className={`col-2 button operator${this.state.divideStylesActive ? 'Active' : ''}`}
                        value="/"
                        onPress={() => handleOperator("/")}
                        title='/'>
                        /
                    </Button>
                    <Button
                        className='col-4 button operator'
                        value='C'
                        onPress={() => resetCalc()}
                        title='C'>
                        C
                    </Button>
                </View>
            <View className="row">
                <View className="digits">
                    {this.state.digits.map(a => <Button className='col-4 button' key={a} value={a} title={a.toString()} onPress={() => updateCalc(a.toString())}>{a}</Button>)}
                    <Button className='col-4 button' style={{borderBottomLeftRadius: '10px'}} value='0' title='0' onPress={() => updateCalc('0')}>0</Button>
                    <Button className='col-4 button' value='.' title='.' onPress={() => updateCalc('.')}>.</Button>
                    <Button className='col-4 button operator' style={{borderBottomRightRadius: '10px'}} value='=' title='=' onPress={() => solve(this.state.operator)}>=</Button>
                </View>
            </View>
        </View>
        );
    }
}