import React, { Component } from 'react';
import { DIGITS } from '../shared/digits';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Display from './Display';


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
            setCalc: '',
            result: ''
        }   
    }
    
    render() {


        const updateCalc = (value) => {
            if(this.state.setCalc === 'E' || this.state.setCalc.length === 9) {
                this.setState({
                    setCalc: this.state.setCalc
                })
            } else {
                this.setState({
                    setCalc: this.state.setCalc + value
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
                setCalc: '',
                result: ''
            });
        }

        const handleDecimal = (value) => {
            if(this.state.setCalc.includes('.') && value === '.') {
                return;
            } else {
                updateCalc(value);
            }
        }

        const handleNegative = (value) => {
            if(this.state.setCalc.includes('-') && value === '-') {
                return;
            } else if(this.state.setCalc && value === '-') {
                return;
            } else {
                updateCalc(value);
            }
        }

        const handleOperator = (value) => {
            if(this.state.setCalc === 'E') {
                resetCalc();
            } else {
                this.setState({
                    input: !this.state.setCalc && this.state.result ? this.state.result 
                            : this.state.input && this.state.operator ? this.state.input
                            : !this.state.setCalc && !this.state.result ? '0'
                            : this.state.setCalc,
                    operator: value,
                    setCalc: ''
                });
            }

            if(this.state.operator && this.state.input && this.state.setCalc) {
                solve(this.state.operator);
                this.setState({
                    operator: value,
                    setCalc: ''
                });
            } 

            switch(value) {
                case '+':
                    this.setState({
                        addStylesActive: true,
                        subtractStylesActive: false,
                        multiplyStylesActive: false,
                        divideStylesActive: false,
                    })
                    break;

                case '-':
                    this.setState({
                        addStylesActive: false,
                        subtractStylesActive: true,
                        multiplyStylesActive: false,
                        divideStylesActive: false,
                    })
                    break;

                case '*':
                    this.setState({
                        addStylesActive: false,
                        subtractStylesActive: false,
                        multiplyStylesActive: true,
                        divideStylesActive: false,
                    })
                    break;
                
                case '/':
                    this.setState({
                        addStylesActive: false,
                        subtractStylesActive: false,
                        multiplyStylesActive: false,
                        divideStylesActive: true,
                    })
                    break;
            }
        }

        const solve = (operator) => {

            let calculation;
            let solution;

            switch(operator) {
                case '+':
                    calculation = parseFloat(this.state.input) + parseFloat(this.state.setCalc);
                    break;

                case '-':
                    calculation = parseFloat(this.state.input) - parseFloat(this.state.setCalc);
                    break;

                case '*':
                    calculation = parseFloat(this.state.input) * parseFloat(this.state.setCalc);
                    break;

                case '/':
                    calculation = parseFloat(this.state.input) / parseFloat(this.state.setCalc);
                    break;
            }
            
            !this.state.input && !this.state.setCalc ? solution = 0
            : this.state.input && !this.state.setCalc ? solution = this.state.input
            : !this.state.input && this.state.setCalc ? solution = this.state.setCalc
            : solution = calculation.toString().slice(0,9);

            if(calculation > 999999999) {
                this.setState({
                    input: '',
                    operator: '',
                    setCalc: 'E',
                    addStylesActive: false,
                    subtractStylesActive: false,
                    multiplyStylesActive: false,
                    divideStylesActive: false,
                    result: 'E'
                });
            } else {
                this.setState({
                    input: solution,
                    operator: '',
                    setCalc: '',
                    addStylesActive: false,
                    subtractStylesActive: false,
                    multiplyStylesActive: false,
                    divideStylesActive: false,
                    result: solution
                });
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <Display setCalc={this.state.setCalc} result={this.state.result} input={this.state.input} />
                <View style={styles.operatorContainer} className='operators'>
                    <TouchableOpacity
                        style={styles.operatorTopLeft}
                        value='C'
                        key='13'
                        onPress={() => resetCalc()}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>C</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operator}
                        key='14'
                        value="+" 
                        onPress={() => handleOperator("+")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operator}
                        value="-"
                        key='15'
                        onPress={() => handleOperator("-")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operator}
                        value="*"
                        key='16'
                        onPress={() => handleOperator("*")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>*</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operatorTopRight}
                        value="/"
                        key='17'
                        onPress={() => handleOperator("/")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>/</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                {this.state.digits.map(a =>
                    <TouchableOpacity style={styles.button} key={a} value={a} onPress={() => updateCalc(a.toString())}>
                        <View>
                            <Text style={styles.buttonTextStyles}>{a}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                    <TouchableOpacity style={styles.button} key='0' value='0' onPress={() => updateCalc('0')}>
                        <View>
                            <Text style={styles.buttonTextStyles}>0</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} key='10' value='.' onPress={() => handleDecimal('.')}>
                        <View>
                            <Text style={styles.buttonTextStyles}>.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} key='11' value='-' onPress={() => handleNegative('-')}>
                        <View>
                            <Text style={styles.buttonTextStyles}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.operatorEqualSign} key='12' value='=' onPress={() => solve(this.state.operator)}>
                        <View>
                            <Text style={styles.operatorTextStyles}>=</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#11000F'
    },
    button: {
        backgroundColor: '#D3D3D3',
        width: '33.2%',
        height:'27%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5
    },
    buttonContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        height:'57%'
    },
    buttonTextStyles: {
        fontSize: 35
    },
    operator: {
        backgroundColor: 'purple',
        color: '#fff',
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5
    },
    operatorTopLeft: {
        backgroundColor: 'purple',
        color: '#fff',
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderTopLeftRadius: 20
    },
    operatorTopRight: {
        backgroundColor: 'purple',
        color: '#fff',
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderTopRightRadius: 20
    },  
    operatorEqualSign: {
        fontSize: 20,
        backgroundColor: 'purple',
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    operatorTextStyles: {
        fontSize: 35,
        color: '#fff'
    },
    operatorContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        height: '15%'
    }
});