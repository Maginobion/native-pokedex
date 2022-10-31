import { useEffect, useState } from "react"
import { pokeClient } from "../config/axios-client"

const usePokes = () =>{

    const [pokes, setPokes] = useState([])
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)

    const pokesPerList = 6

    useEffect(()=>{
        getPokemons()
    },[offset])

    const getPokemons = async () =>{
        setLoading(true)
        const {data} = await pokeClient.get(`/pokemon/?offset=${offset}&limit=${pokesPerList}`)
        getImages(data)
    }

    const getImages = async (data) =>{
        const arr = []
        data.results.forEach(async (elem, index)=>{
            const { data } = await pokeClient.get(elem.url)
            arr.push({name: elem.name, url: data.sprites.front_default})
            arr.length === index+1 && setPokes(arr)
        })     
        setLoading(false)
    }

    const nextPage = () =>{
        setOffset(prev=> prev+pokesPerList)
    }

    const prevPage = () =>{
        offset>0 && setOffset(prev=> prev-pokesPerList)
    }

    return{
        pokes,
        offset,
        nextPage,
        prevPage,
        getPokemons,
        loading
    }
}

export default usePokes