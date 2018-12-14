/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;

import React from 'react';
import { StyleSheet, TextInput, ActivityIndicator, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { List, Icon, SearchBar, CheckBox } from 'react-native-elements';
import CheckItem from './CheckItem';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opt: {},
            loading: false,
            checked: true,
            text: '',
            inputing: false,
            lists: [

            ]
        };
    }

    //FUNCTIONS!
    componentDidMount() {
        //function to make API call
        console.log("componentDidMount");
        this.setState({ loading: true });
        this.getAllTask();
    }

    getAllTask() {
        return fetch('http://localhost:8000/items')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("api resp= " + JSON.stringify(responseJson))
                this.setState({lists: responseJson})
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    focusInput = () =>{
        console.log("input focus")
        this.refs.ScrollView.scrollToEnd();
    }

    blurInput = () => {
        console.log("this.refs.scrollview" + this.refs.ScrollView)
        this.refs.ScrollView.scrollTo({ x: 0, y: 0, animated: true })

        if (this.state.text == "") {
            //do nothing
            return
        } else {
            //get to work...
            //1.log
            console.log("text: " + this.state.text)

            //2. add task and make POST call
            fetch('http://localhost:8000/items/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: this.state.text
                }),
            })
            .then(() =>{
                //3. remove , clear, and update
                this.setState({ inputing: false })
                this.setState({ text: '' })
                this.getAllTask();
            });
        }
    }

    updateList = (id) => {
        //1. loop thru List and find exact match
        console.log("updateList()")
        for (let j = 0; j < this.state.lists.length; j++) {
            const element = this.state.lists[j].id;
            //2. once found, delete it!
            if (id == element) {
                console.log("found match! -> " + element)
                newList = this.state.lists;

                fetch('http://localhost:8000/items/'+ id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(()=>{
                    //3. update Task list
                    this.getAllTask()
                });
            }
        }
    }

    getWeek = () =>{
        var week = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        var day = new Date().getDay();
        var weekday = week[day]

        return weekday
    }

    getDate = () =>{
        var date = new Date();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        newdate = month + "/" + day + "/" + year;

        return newdate
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.nav}></View>
                <View style={styles.header}>
                    <Text style={styles.week}>{this.getWeek()}</Text>
                    <Text style={styles.date}>{this.getDate()}</Text>
                </View>
                <ScrollView ref="ScrollView"
                // onContentSizeChange={() => this.refs.ScrollView.scrollToEnd({ })}
                 contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        data={this.state.lists}
                        renderItem={({ item }) => (
                            <CheckItem
                                title={item.item}
                                id={item.id}
                                updateList={this.updateList}
                            />
                        )}
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 3, padding: 5, margin: 10 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        onBlur={this.blurInput}
                        onFocus={this.focusInput}
                        placeholder='Enter New Task...'
                    />

                    <Icon
                        name='plus'
                        type='evilicon'
                        color='#ee3355'
                        size={50}
                        onPress={() => this.blurInput()}
                    />
                    <View style={styles.footer}></View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1
    },
    nav:{
        width:"100%",
        height:40,
    },
    header:{
        width:"100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    week:{
        fontSize:40,
        color: "#ee3355"
    },
    date:{
        color: "#ee3355"
    },
    footer:{
        width:"100%",
        height: 300
    }
});
