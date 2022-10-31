import axios from "axios"
import { useEffect, useState } from "react"
import { pokeClient } from "../config/axios-client"

const useFullInfo = (name) =>{

    const [poke, setPoke] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getPokemons()
    },[])

    const getPokemons = async () =>{
        setLoading(true)
        const {data} = await pokeClient.get('pokemon/'+name)
        setPoke(data)
        setLoading(false)
    }

    return{
        poke,
        loading
    }
}

export default useFullInfo