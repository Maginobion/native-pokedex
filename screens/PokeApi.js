import { Button, StyleSheet, Text, View, TextInput, ScrollView, FlatList, Pressable } from "react-native"
import { useState } from "react"
import { styled } from "nativewind"
import usePokes from "../hooks/usePokes"
import PokemonCard from "../components/PokemonCard"
import { MainView } from "../styles/global"

const StyledInput = styled(TextInput, 'px-2 py-0.5 w-full bg-black text-black my-6 border border-gray-100 rounded-sm')
const StyledView = styled(View, 'flex flex-row my-2 w-full justify-center')
const StyledSpace = styled(View,'w-4')
const ShortList = styled(FlatList, 'h-96 w-80 border border-red-500')
const FirstText = styled(Text, 'mt-4')

const PokeAPI = ({navigation}) => {

    const [ text, setText ] = useState()

    const { pokes, nextPage, prevPage, offset, getPokemons, loading } = usePokes()

    return(
        <MainView>
            <FirstText>Busca un pokemon!</FirstText>
            <StyledInput
                onChangeText={setText}
                value={text}
                placeholder="Escribe"
            />
            { !loading && (<ShortList
                nestedScrollEnabled
                data={pokes}
                renderItem={(poke)=>(
                    <Pressable onPress={()=>navigation.navigate('Pokemon', {pokemon: poke.item})}>
                        <PokemonCard 
                            poke={poke}
                        />
                    </Pressable>
                )}         
            />)}                  
            <StyledView>
                <Button 
                    disabled={!(offset>0)}
                    onPress={prevPage} 
                    title="Anterior"
                />
                <StyledSpace/>
                <Button 
                    onPress={nextPage} 
                    title="Siguiente"
                />
            </StyledView> 
            <StyledView>
                <Button title="Actualizar" onPress={()=>getPokemons()}/>
            </StyledView>
        </MainView>
    )
}

export default PokeAPI