import { styled } from "nativewind"
import { Pressable, StyleSheet, Text, Touchable, TouchableHighlight, View } from "react-native"

const CustomPressable = styled(TouchableHighlight, 'bg-slate-800 py-3 px-8 rounded-lg m-1.5')
const CustomText = styled(Text, 'text-sky-400')

const CustomButton = ({onPress, title}) =>{

    return(
        <CustomPressable onPress={onPress}>
            <CustomText>{title}</CustomText>
        </CustomPressable> 
    )
}

export default CustomButton