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
    // Prev Staten avulla uutta arvoa ei tarvitse argumenttina
    // huolehtii myös mahdollisesta data racesta
    handleClick = (stateProp) => () => {
        this.setState((prevState) => ({
            [stateProp]: prevState[stateProp] + 1 
        }));
    }

    keskiarvo = () => {

        const avg = (this.state.good - this.state.bad) / (this.state.good + this.state.neutral + this.state.bad)

        const notNumber = isNaN(avg)

        return (
            // Palauta nolla jos ei vielä klikkauksia tai pyöristä kahteen desimaaliin
            notNumber ? 0 : avg.toFixed(2)
        )
    }

    positiivisia = () => {

        const pos = (this.state.good) / (this.state.good + this.state.neutral + this.state.bad) * 100

        const notNumber = isNaN(pos)

        return (
            // Palauta nolla jos ei vielä klikkauksia tai pyöristä kahteen desimaaliin
            notNumber ? 0 : pos.toFixed(1)
        )
    }

    Statistic = ({text, arvo, suffix}) => {
        // Suffix: lisää perään esim % merkki jos arvo annettu
        return (
            <tr >
                <td style={{paddingRight:'10px'}}>{text}</td><td>{arvo}{suffix ? ' ' + suffix : ''}</td>
            </tr>
        )
    }

    // Componettien tekoa kokeiltu class methodina. Arrow function ymmärtää ilmeisesti täällä this:iä
    // Kannattaako lokaalit componentit tehdä class methodina vai renderissä? Netissä ei kerrota
    Statistics = () => {

        const valsGiven = this.state.good + this.state.neutral + this.state.bad

        if (valsGiven !== 0) {
            return (
                <div>
                    <h3>Statistics</h3>
                    <table style={{borderSpacing:'0px'}}>
                        <tbody>
                            <this.Statistic text='hyvä' arvo={this.state.good}/>
                            <this.Statistic text='neutraali' arvo={this.state.neutral}/>
                            <this.Statistic text='huono' arvo={this.state.bad}/>
                            <this.Statistic text='keskiarvo' arvo={this.keskiarvo()}/>
                            <this.Statistic text='positiivisia' arvo={this.positiivisia()} suffix='%'/>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Statistics</h3>
                    <p>Palautetta ei vielä annettu</p>
                </div>
            )
        }


    }

    render(){

        // callback ei tarvitse argumentteja sillä render() palauttaa funktion,
        // jossa argumentit on valmiiksi kutsuttu
        const Button = ({ text, callback }) => {
            return(
                <button onClick={callback}>
                    {text}
                </button>
            )
        }

        return (
            <div>
                <h1>Anna Palautetta!</h1>
                
                <Button text='hyvä' callback={this.handleClick('good')} />
                <Button text='neutraali' callback={this.handleClick('neutral')} />
                <Button text='huono' callback={this.handleClick('bad')} />

                <this.Statistics/>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)