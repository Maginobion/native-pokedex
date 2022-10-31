import { styled } from "nativewind"
import { Image, Pressable, Text, View } from "react-native"

const CardImage = styled(Image, 'w-16 h-16 bg-slate-200 rounded-lg')
const CardView = styled(View, 'my-1 rounded-lg flex flex-row items-center py-4 w-full justify-around bg-[#000]')

const PokemonCard = ({poke, children}) =>{

    const { item } = poke

    return (
        <CardView>
            <CardImage resizeMode="contain" source={{uri: item.url}}/>
            <Text>{item.name}</Text>
            {children}
        </CardView>
    )
}

export default PokemonCard