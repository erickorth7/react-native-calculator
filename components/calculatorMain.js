import React, { Component } from 'react';
import { DIGITS } from '../shared/digits';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';


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
            <SafeAreaView style={styles.container}>
                <View style={styles.display} className="display">
                    <Text style={styles.displayText}>
                        {this.state.setCalc || this.state.input || '0'}
                    </Text>
                </View>
                <View style={styles.operatorContainer} className='operators'>
                    <View style={styles.operator}>
                        <Button
                            className={`col-2 button operator${this.state.addStylesActive ? 'Active' : ''}`}
                            key='12'
                            value="+" 
                            color='#fff'
                            onPress={() => handleOperator("+")}
                            title='+'>
                            +
                        </Button>
                    </View>
                    <View style={styles.operator}>
                        <Button
                            className={`col-2 button operator${this.state.subtractStylesActive ? 'Active' : ''}`}
                            value="-"
                            key='13'
                            color='#fff'
                            onPress={() => handleOperator("-")}
                            title='-'>
                            -
                        </Button>
                    </View>
                    <View style={styles.operator}>
                        <Button
                            className={`col-2 button operator${this.state.multiplyStylesActive ? 'Active' : ''}`}
                            value="*"
                            key='14'
                            color='#fff'
                            onPress={() => handleOperator("*")}
                            title='*'>
                            *
                        </Button>
                    </View>
                    <View style={styles.operator}>
                        <Button
                            className={`col-2 button operator${this.state.divideStylesActive ? 'Active' : ''}`}
                            value="/"
                            key='15'
                            color='#fff'
                            onPress={() => handleOperator("/")}
                            title='/'>
                            /
                        </Button>
                    </View>
                    <View style={styles.operator}>
                        <Button
                            className='col-4 button operator'
                            value='C'
                            key='16'
                            color='#fff'
                            onPress={() => resetCalc()}
                            title='C'>
                            C
                        </Button>
                    </View>
                </View>
                <View style={styles.buttonContainer} className="row">
                {this.state.digits.map(a =>
                    <View style={styles.button} className="digits">
                        <Button color='purple' className='col-4 button' key={a} value={a} title={a.toString()} onPress={() => updateCalc(a.toString())}>{a}</Button>
                    </View>)}
                    <View style={styles.button}>
                        <Button className='col-4 button' color='purple' style={{borderBottomLeftRadius: '10px'}} key='0' value='0' title='0' onPress={() => updateCalc('0')}>0</Button>
                    </View>
                    <View style={styles.button}>
                        <Button className='col-4 button' key='10' value='.' title='.' color='purple' onPress={() => updateCalc('.')}>.</Button>
                    </View>
                    <View style={styles.operatorEqualSign}>
                        <Button className='col-4 button operator' color='#fff' key='11' value='=' title='=' onPress={() => solve(this.state.operator)}>=</Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11000F'
    },
    display: {
        padding: 10
    },
    displayText: {
        color: '#fff',
        fontSize: 40
    },
    button: {
        borderRadius: 0,
        fontSize: 20,
        backgroundColor: '#fff',
        width: '33.2%'
    },
    buttonContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    operator: {
        borderRadius: 0,
        fontSize: 20,
        backgroundColor: 'purple',
        color: '#fff',
        width: '20%'
    },
    operatorEqualSign: {
        borderRadius: 0,
        fontSize: 20,
        backgroundColor: 'purple',
        color: '#fff',
        width: '33.2%'
    },
    operatorContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})