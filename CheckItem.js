
import React from 'react';
import { StyleSheet, Text, View, Icon, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';



class CheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }
    check() {
        this.props.updateList(this.props.id);
    }

    render() {
        return (
            <CheckBox
                title={this.props.title}
                onPress={() => this.check()}
                checked={this.state.checked}
                uncheckedIcon='circle-o'
                checkedColor='red'
                textStyle={styles.text}

            />
        );
    }
}

const styles = StyleSheet.create({
    text:{
        color: 'rgb(150,150,150)'
    }
})

export default CheckItem;
