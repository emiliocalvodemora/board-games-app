import React from 'react'
import { useState } from 'react'

export default function GameInput(props) {
    const { handleAddGames } = props;
    const [gameNameValue, setGameNameValue] = useState("");
    return (
        <header>
            <input value ={gameNameValue} onChange={(e) => {
                setGameNameValue(e.target.value)
            }} placeholder="Enter game name"/>
            <button onClick={()=> {
                handleAddGames({name: gameNameValue});
                setGameNameValue("");
            }}>Add Game</button>
        <h1>GameInput</h1>
        </header>
    )
}
