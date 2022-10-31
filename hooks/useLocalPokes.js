import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

const useLocalPokes = () =>{

    const [pokes, setPokes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getLocalPokes()
    },[])

    const getLocalPokes = async () =>{
        setLoading(true)
        const data = JSON.parse(await AsyncStorage.getItem('@pokes'))
        setPokes(data)
        setLoading(false)
    }

    const deleteLocalPoke = async (id) =>{
        setLoading(true)
        const newPokes = pokes.slice(0,id).concat(pokes.slice(id+1,pokes.length))
        await AsyncStorage.setItem('@pokes',JSON.stringify(newPokes))
        getLocalPokes()
    }

    return{
        pokes,
        getLocalPokes,
        deleteLocalPoke,
        loading
    }
}

export default useLocalPokes