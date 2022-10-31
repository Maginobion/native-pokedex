import { styled } from "nativewind"
import { useState } from "react"
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native"
import CustomButton from "../components/CustomButton"
import useFullInfo from "../hooks/useFullInfo"
import { FlexView, MainView } from "../styles/global"
import AddPoke from "./AddPoke"

const PokeImage = styled(Image, 'w-64 h-64 bg-slate-200 rounded-lg my-8')
const Title = styled(Text, 'text-red-600 text-xl')
const SubTitle = styled(Text, 'mr-1')
const ExtraInfo = styled(Text, 'mt-2')
const ModalView = styled(View, 'flex flex-1 justify-center items-center bg-sky-100 h-2/3 mx-4 mt-16 mb-4 rounded-2xl')

const Poke = ({navigation, route}) => {

  const { pokemon } = route.params

  const { poke, loading } = useFullInfo(pokemon.name)

  const [open, setOpen] = useState(false)

  return !loading && (
    <MainView>
      <Text>Pokemon #{poke.id}</Text>
      <PokeImage resizeMode="contain" source={{uri: pokemon.url}}/>
      <Title>- {pokemon.name.toLocaleUpperCase()} -</Title>     
      <FlexView tw="mt-4">
        <SubTitle>Tipos:</SubTitle>
        {
          poke?.types?.map((type,index)=><Text key={type.type.name}>{index!=0 && ','} {type.type.name}</Text>)
        }
      </FlexView>
      <ExtraInfo>Altura (dm): {poke.height}</ExtraInfo>
      <ExtraInfo tw="mb-8">Peso (hg): {poke.weight}</ExtraInfo>
      <CustomButton 
        onPress={()=>setOpen(true)} 
        title='Agregar'
      />
      <Modal
        animationType="slide"
        transparent
        visible={open}
      >
        <ModalView>
          <AddPoke poke={poke} setClose={()=>setOpen(false)}/>
        </ModalView>        
      </Modal>
    </MainView>
  )
}

export default Poke