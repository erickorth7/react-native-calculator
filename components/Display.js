import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default function Display(props) {
    return (
        <View style={styles.display} className="display">
            <Text style={styles.displayText}>
                {props.setCalc || props.result || props.input || '0'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    display: {
        padding: 15
    },
    displayText: {
        color: '#fff',
        fontSize: 60
    }
});