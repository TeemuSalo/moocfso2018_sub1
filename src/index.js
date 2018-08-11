import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    // herkkuja: computed property, previous state
    // Prev Staten avulla uutta arvoa ei tarvitse argumenttina ja
    // huolehtii myös mahdollisesta data racesta
    handleClick = (stateProp) => () => {
        this.setState((prevState) => ({
            [stateProp]: prevState[stateProp] + 1 
        }));
    }

    render(){

        // Button pitää luoda renderissä, class property ei voi olla react component(?)
        // callback ei tarvitse argumentteja sillä render() palauttaa funktion,
        // jossa argumentit on valmiiksi kutsuttu
        const Button = ({ text, callback }) => {
            return(
                <button onClick={callback}>
                    {text}
                </button>
            )
        }

        // Perusta viela nama componentit
        // Statistics huolehtii tilastojen näyttämisestä
        // Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisesta

        return (
            <div>
                <h1>Anna Palautetta!</h1>
                
                <Button text='hyvä' callback={this.handleClick('good')} />
                <Button text='neutraali' callback={this.handleClick('neutral')} />
                <Button text='huono' callback={this.handleClick('bad')} />

                <h2>statistiikka</h2>
                <p>hyvä {this.state.good}</p>
                <p>neutraali {this.state.neutral}</p>
                <p>huono {this.state.bad}</p>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)