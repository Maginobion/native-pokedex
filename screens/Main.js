import { styled } from "nativewind"
import { Button, Image, StyleSheet, Text, View } from "react-native"
import pokeLogo from "../assets/pokeLogo.webp"
import CustomButton from "../components/CustomButton"
import { MainView } from "../styles/global"

const FittingImage = styled(Image, 'h-20')
const Title = styled(Text, 'text-2xl my-16 color-blue-400')
const Container = styled(View, 'w-full flex flex-row justify-center')
const FlexButton = styled(Button, 'p-8')

const Main = ({navigation}) =>{
    return(
        <MainView>
            <FittingImage resizeMode="contain" source={pokeLogo}/>
            <Title>Pagina Inicio</Title>
            <Container>
                <CustomButton
                    title="Ir a PokeAPI" 
                    onPress={()=>navigation.navigate('PokeAPI')}
                />
                <CustomButton
                    title="Mi listado" 
                    onPress={()=>navigation.navigate('Local')}
                />
            </Container>
        </MainView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default Main