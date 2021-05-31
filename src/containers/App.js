import React, { Component } from 'react';
import ButtonGrid from '../components/ButtonGrid';
import EquationField from '../components/EquationField';
import { cleanText, tryEquals } from "../components/CalcFunctions";
import AnswersList from '../components/AnswersList';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            equationText : '',
            errorText : '',
            answers : []
        }
    }

    shouldErrorShow = (b) => {
        const text = b ? "Calculation syntax error, please check input." : "";
        this.setState({errorText: text});
    }

    onButtonPressed = (btn) => {
        let keyValue = btn.target.value;
        const newText = this.state.equationText + keyValue;
        this.setState({equationText: newText});
    }

    onClearPressed = () => {
        this.setState({equationText: ''});
    }

    onBackPressed = () => {
        let newText = this.state.equationText.substr(0, this.state.equationText.length - 1);
        this.setState({equationText: newText});
    }

    onEqualPressed = () => {
        // Create equals function
        const result = tryEquals(this.state.equationText);
        if(result === null){
            this.shouldErrorShow(true);
            return;
        }
        this.setState({answers: this.state.answers.concat(`${this.state.equationText} = ${result}`)});
        this.setState({equationText: result});
        this.shouldErrorShow(false);
    }

    equationTextEdited = (e) => {
        const newText = cleanText(e.target.value);
        this.setState({equationText: newText});
    }

    onKeyPress = (e) => {
        if(e.key === "Enter"){
            this.onEqualPressed();
        }
    }

    render(){
        return(
            <div className="tc flex flex-column pa2">
                <h1>Super Basic Calculator</h1>
                <EquationField equationText={this.state.equationText} equationTextEdited={this.equationTextEdited} onKeyPress={this.onKeyPress}/>
                <ButtonGrid 
                    onButtonPressed={this.onButtonPressed}
                    onClearPressed={this.onClearPressed}
                    onBackPressed={this.onBackPressed}
                    onEqualPressed={this.onEqualPressed}
                />
                <p className="red">{this.state.errorText}</p>
                <AnswersList answers={this.state.answers}/>
            </div>
        )
    }
}

export default App;