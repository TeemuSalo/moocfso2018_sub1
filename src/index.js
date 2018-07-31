import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    const Otsikko = (props) => {
        return(
            <h1>{props.kurssi}</h1>
        )
    }

    const Sisalto = (props) => {
        return(
            <div>
                <Osa osa = {props.osat[0]} teht = {props.teht[0]}/>
                <Osa osa = {props.osat[1]} teht = {props.teht[1]}/>
                <Osa osa = {props.osat[2]} teht = {props.teht[2]}/>
            </div>
        )
    }

    const Osa = (props) => {
        return(
            <p>{props.osa} {props.teht}</p>
        )
    }

    const Yhteensa = (props) => {
        return(
            <p>Yhteensä {props.yht}</p>
        )
    }

    return (

        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto 
                osat = {[osa1, osa2, osa3]} 
                teht = {[tehtavia1,tehtavia2,tehtavia3]}
            />
            <Yhteensa yht={tehtavia1 + tehtavia2 + tehtavia3}/>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)