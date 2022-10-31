import { styled } from "nativewind"
import { Pressable, StyleSheet, Text } from "react-native"

const CustomPressable = styled(Pressable, 'bg-slate-900 py-3 px-8 rounded-lg m-1.5')
const CustomText = styled(Text, 'text-sky-400')

const SelectButton = ({onPress, title, selected}) =>{

    return(
        <CustomPressable 
            style={selected && styles.button}
            onPress={onPress}
        >
            <CustomText style={selected && styles.text}>{title}</CustomText>
        </CustomPressable>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#F1850A",
    },
    text:{
        color:'#000',
    }
})

export default SelectButton