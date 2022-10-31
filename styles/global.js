import { styled } from "nativewind";
import { FlatList, View } from "react-native";

export const FlexView = styled(View, 'flex flex-row items-center')

export const MainView = styled(View, 'min-h-[100%] flex flex-1 items-center justify-center px-24')

export const ShortList = styled(FlatList, 'h-96 w-80 border border-red-500 mb-4')

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100%',
//       paddingHorizontal: 30
//     },
// })
