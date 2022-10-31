import AsyncStorage from "@react-native-async-storage/async-storage"
import { styled } from "nativewind"
import { useState } from "react"
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, Touchable, View } from "react-native"
import CustomButton from "../components/CustomButton"
import SelectButton from "../components/SelectButton"
import { FlexView, MainView } from "../styles/global"

const Title = styled(Text, 'text-red-600 text-xl mb-4')
const StyledInput = styled(TextInput, 'px-2 py-0.5 w-72 bg-black text-black my-6 border border-gray-100 rounded-sm')
const CustomView = styled(View, 'w-full')
const CustomPressable = styled(Pressable, 'absolute top-0 right-0 m-4 bg-red-400 rounded-3xl w-10 h-10 flex justify-center items-center')
const CustomText = styled(Text, 'text-xl leading-6')

const AddPoke = ({poke, setClose, edit=null}) =>{

    const [name, setName] = useState(poke.name || '')
    const [age, setAge] = useState(poke.age || '')
    const [gender, setGender] = useState(poke.gender || 'm')

    const data = {
        id: poke.id,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`,
        name: name,
        age: age, 
        gender: gender
    }

    const save = async () =>{

        const items = JSON.parse(await AsyncStorage.getItem('@pokes')) || []

        if(edit!==null) items[edit] = data
        else items.push(data)

        await AsyncStorage.setItem('@pokes', JSON.stringify(items))

        Alert.alert(
            `Pokemon ${edit ? 'Actualizado' : 'Guardado'}`,
            `¡El pokemon fue ${edit ? 'actualizado' : 'guardado'} con éxito!`,
            [
                {
                    text:'Entendido',
                }
            ]
        )
        setClose()
    }

    return(
        <>
            <CustomPressable onPress={setClose}>
                <CustomText>✖</CustomText>
            </CustomPressable>
            <MainView>
                <Title>- {poke.name.toLocaleUpperCase()} -</Title>
                <Text>Colócale un nombre:</Text>
                <StyledInput
                    value={name}
                    onChangeText={setName}
                    placeholder='Nombre'
                />
                <Text>Selecciona su sexo:</Text>
                <FlexView tw="my-4">
                    <SelectButton 
                        onPress={()=>setGender('m')}
                        title="Masculino"
                        selected={gender==='m'}
                    />
                    <SelectButton
                        onPress={()=>setGender('f')}
                        title="Femenino"
                        selected={gender==='f'}
                    />     
                </FlexView>
                <Text>Selecciona su edad:</Text>
                <StyledInput
                    value={age}
                    onChangeText={setAge}
                    placeholder='Edad'
                    keyboardType="numeric"
                />
                <CustomButton
                    onPress={()=>save()}
                    title='Confirmar'
                />
            </MainView>  
        </>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100%',
      paddingHorizontal: 30
    },
})

export default AddPoke