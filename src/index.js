import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            // Kolme eri näkymää tehtäväosioille: reactalkeet, unicafe, anekdootit
            currentView: 'reactAlkeet',

            // Unicafe tehtäväosion state objektit
            good: 0,
            neutral: 0,
            bad: 0,

            // Anekdoottien state objektit
            selected: Math.floor(Math.random() * 6),
            pisteet: [0,0,0,0,0,0],
            mostVotes: null,
            voteAmount: 0,
        }
    }



    /***************************************/
    /* Ylimääräinen näkymänvaihtaja
    /* Koska kyseessä on SPA
    /* Tehtävässä 1 on kolme eri osiota
    /***************************************/

    // Component joka vaihtaa näkymää kolmen eri tehtävän välillä
    ChangeView = () => {
        return(
            <div>
                <button onClick={this.handleChangeView} value={'reactAlkeet'}>React alkeet</button>
                <button onClick={this.handleChangeView} value={'unicafe'}>Unicafe</button>
                <button onClick={this.handleChangeView} value={'anekdootit'}>Anekdootit</button>
            </div>
        )
    }

    // Kokeiltu hieman vanhaa kunnon DOM javascript lukemista
    handleChangeView = (e) => {
        this.setState({
            currentView: e.target.value
        })
    }



    /***************************************/
    /* Reactin alkeet koodiosio alkaa
    /* Tehtävät 1.1 - 1.5
    /***************************************/

    // Huom. tehtävän 1.5 jälkeen App on muutettu Class pohjaiseksi
    // Aikaisemmin App oli funktio joka palautti jsx objektin

    kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
      }

    Otsikko = (props) => {
        return(
            <h1>{props.kurssi}</h1>
        )
    }

    Sisalto = (props) => {
        return(
            <div>
                <this.Osa osa = {props.osat[0].nimi} teht = {props.osat[0].tehtavia}/>
                <this.Osa osa = {props.osat[1].nimi} teht = {props.osat[1].tehtavia}/>
                <this.Osa osa = {props.osat[2].nimi} teht = {props.osat[2].tehtavia}/>
            </div>
        )
    }

    Osa = (props) => {
        return(
            <p>{props.osa} {props.teht}</p>
        )
    }

    Yhteensa = (props) => {
        return(
            // Teki mieli käyttää reduce() mutta tehään vielä näin
            <p>Yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia }</p>
        )
    }



    /***************************************/
    /* Unicafe koodiosio alkaa
    /* Tehtävät 1.6 - 1.11
    /***************************************/

    // HUOM. tämän tehtävän Button component on määritelty render funktiossa koska hauskaa

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

    // Componettien tekoa kokeiltu class methodina. Arrow function ymmärtää ilmeisesti class contextissa this:iä
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

        } else {
            return (
                <div>
                    <h3>Statistics</h3>
                    <p>Palautetta ei vielä annettu</p>
                </div>
            )
        }
    }



    /***************************************/
    /* Anekdootit koodiosio alkaa
    /* Tehtävät 1.12 - 1.14
    /***************************************/

    anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    AnekdootitButtons = () => {
        return (
            <div>
                <button onClick={this.nextAnecdote}>seuraava</button>
                <button onClick={this.voteAnecdote}>tykkää!</button>
            </div>
        )
    }

    Anekdootti = ({text, likes}) => {
        return (
            <div style={{height: '80px'}}>
                <p style={{height: '40px'}}>{text}</p>
                <p style={{height: '10px'}}>{likes} tykkää tästä</p>
            </div>
        )
    }

    voteAnecdote = () => {

        let newPisteet = this.state.pisteet.slice()

        newPisteet[this.state.selected] = newPisteet[this.state.selected] + 1

        let biggestIndex = 0

        const biggestVal = newPisteet.reduce((prev, curr, index) => {
            
            // Palautetaan aina isompi numero
            if(curr > prev) {
                biggestIndex = index
                return curr
            }
            // Jos yhtäsuuret, suositaan äänestettyä anekdoottia
            else if(curr === prev && index === this.state.selected) {
                biggestIndex = index
                return curr
            } 
            // Jos yhtäsuuret, suositaan anekdoottia joka on jo johdossa
            // Mutta ainoastaan jos äänestetty anekdootti ei ole saanut johdoasemaa
            else if(curr === prev && index === this.state.mostVotes && biggestIndex !== this.state.selected) {
                biggestIndex = index
                return curr
            } 
            else {
                return prev
            }
        }, 0)

        this.setState({
            pisteet: newPisteet,
            mostVotes: biggestIndex,
            voteAmount: biggestVal
        })
    }

    nextAnecdote = () => {
        let randomNumber = Math.floor(Math.random() * 6)

        // Älä palauta samaa anekdoottia uudestaan
        while (randomNumber === this.state.selected) randomNumber = Math.floor(Math.random() * 6)

        this.setState({
            selected: randomNumber
        })
    }

    MostVotesAnecdote = ({text, votes}) => {

        if(this.state.mostVotes) {
            return (
                <div style={{height: '40px'}}>
                    <p style={{height: '30px'}}>{text}</p>
                    <p style={{height: '10px'}}>{votes} tykkäystä</p>
                </div>
            )

        } else {
            return(
                <div >
                    <p>Ei äänestetty</p>
                </div>
            )
        }
    }



    render(){


        // Unicafe tehtävän Button component
        const Button = ({ text, callback }) => {
            // callback ei tarvitse argumentteja sillä render() palauttaa funktion,
            // jossa argumentit on valmiiksi kutsuttu
            return(
                <button onClick={callback}>
                    {text}
                </button>
            )
        }



        if (this.state.currentView === 'reactAlkeet') {
            return (
                <div>
                    <this.ChangeView/>
                    <this.Otsikko kurssi= {this.kurssi.nimi} />
                    <this.Sisalto osat = {this.kurssi.osat} />
                    <this.Yhteensa osat = {this.kurssi.osat} />
                </div>
            )

        } else if (this.state.currentView === 'unicafe') {
            return (
                <div>
                    <this.ChangeView/>
                    <h1>Unicafe</h1>
                    <h2>Anna Palautetta!</h2>
                    <Button text='hyvä' callback={this.handleClick('good')} />
                    <Button text='neutraali' callback={this.handleClick('neutral')} />
                    <Button text='huono' callback={this.handleClick('bad')} />
                    <this.Statistics/>
                </div>
            )

        } else if (this.state.currentView === 'anekdootit'){
            return (
                <div>
                    <this.ChangeView/>
                    <h1>Anekdootit</h1>
                    <this.Anekdootti text={this.anecdotes[this.state.selected]} likes={this.state.pisteet[this.state.selected]}/>
                    <this.AnekdootitButtons/>
                    <h3>Eniten ääniä saanut</h3>
                    <this.MostVotesAnecdote text={this.anecdotes[this.state.mostVotes]} votes={this.state.voteAmount}/>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <App />, document.getElementById('root')
)