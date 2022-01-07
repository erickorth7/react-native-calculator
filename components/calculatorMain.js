import React, { Component } from 'react';
import { DIGITS } from '../shared/digits';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';


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
            if(this.state.result === '') {
                this.setState({
                    setCalc: this.state.setCalc + value
                });
            } else {
                this.setState({
                    setCalc: this.state.setCalc
                })
            }

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
            this.setState({
                input: this.state.setCalc,
                operator: value,
                setCalc: ''
            });

            if(this.state.setCalc === '') {
                this.setState({
                    input: '0'
                })
            }

            switch(value) {
                case '+':
                    this.setState({
                        addStylesActive: true,
                        result: ''
                    })
                    break;

                case '-':
                    this.setState({
                        subtractStylesActive: true,
                        result: ''
                    })
                    break;

                case '*':
                    this.setState({
                        multiplyStylesActive: true,
                        result: ''
                    })
                    break;
                
                case '/':
                    this.setState({
                        divideStylesActive: true,
                        result: ''
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
                            addStylesActive: false,
                            result: this.state.setCalc
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) + parseFloat(this.state.setCalc),
                            addStylesActive: false,
                            result: this.state.setCalc
                        })
                    }
                    break;

                case '-':
                    this.setState({
                        setCalc: parseFloat(this.state.input) - parseFloat(this.state.setCalc),
                        subtractStylesActive: false,
                        result: this.state.setCalc
                    })
                    break;

                case '*':
                    if(parseFloat(this.state.input) * parseFloat(this.state.setCalc) > 999999999) {
                        this.setState({
                            setCalc: 'E',
                            multiplyStylesActive: false,
                            result: this.state.setCalc
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) * parseFloat(this.state.setCalc),
                            multiplyStylesActive: false,
                            result: this.state.setCalc
                        })
                    }
                    break;

                case '/':
                    if(parseFloat(this.state.input) / parseFloat(this.state.setCalc) > 999999999) {
                        this.setState({
                            setCalc: 'E',
                            divideStylesActive: false,
                            result: this.state.setCalc
                        })
                    } else {
                        this.setState({
                            setCalc: parseFloat(this.state.input) / parseFloat(this.state.setCalc),
                            divideStylesActive: false,
                            result: this.state.setCalc
                        })
                    }
                    break;
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.display} className="display">
                    <Text style={styles.displayText}>
                        {this.state.setCalc || this.state.input || '0'}
                    </Text>
                </View>
                <View style={styles.operatorContainer} className='operators'>
                    <TouchableOpacity
                        style={styles.operatorTopLeft}
                        value='C'
                        key='16'
                        onPress={() => resetCalc()}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>C</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operator}
                        key='12'
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
                        key='13'
                        onPress={() => handleOperator("-")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operator}
                        value="*"
                        key='14'
                        onPress={() => handleOperator("*")}
                    >
                        <View>
                            <Text style={styles.operatorTextStyles}>*</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.operatorTopRight}
                        value="/"
                        key='15'
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
                    <TouchableOpacity style={styles.button} key='17' value='.' onPress={() => handleDecimal('.')}>
                        <View>
                            <Text style={styles.buttonTextStyles}>.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} key='10' value='-' onPress={() => handleNegative('-')}>
                        <View>
                            <Text style={styles.buttonTextStyles}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.operatorEqualSign} key='11' value='=' onPress={() => solve(this.state.operator)}>
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
    display: {
        padding: 15
    },
    displayText: {
        color: '#fff',
        fontSize: 60
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
        height: '15%'
    }
})