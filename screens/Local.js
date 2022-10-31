import { styled } from "nativewind"
import { useState } from "react"
import { Button, Modal, Pressable, Text, View } from "react-native"
import { jsonToCSV } from "react-native-csv"
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import PokemonCard from "../components/PokemonCard"
import useLocalPokes from "../hooks/useLocalPokes"
import { MainView, FlexView, ShortList } from "../styles/global"
import AddPoke from "./AddPoke"
import { printToFileAsync } from "expo-print";
const { StorageAccessFramework } = FileSystem

const IconPressable = styled(Pressable, 'mx-1 bg-red-400 rounded-xl w-10 h-10 flex justify-center items-center')
const CustomPressable = styled(Pressable, 'mx-1 bg-sky-400 p-2 rounded-sm flex justify-center items-center')
const CustomText = styled(Text, 'text-xl leading-6')
const TitleText = styled(Text, 'my-4')
const ModalView = styled(View, 'flex flex-1 justify-center items-center bg-sky-100 h-2/3 mx-4 mt-16 mb-4 rounded-2xl')
const BottomView = styled(View, 'mb-4')

const Local = () => {

    const { pokes, getLocalPokes, deleteLocalPoke, loading } = useLocalPokes()

    const [open, setOpen] = useState(false)
    const [selectedPokeId, setSelectedPokeId] = useState(0)

    const selectedPoke = pokes[selectedPokeId]

    const csvData = jsonToCSV(pokes)

    const html = (poke) => `
        <html>
            <body>
                <main>
                    <h1 style="color:red">${poke?.name || ''}</h1>
                    <p>Id del pokemon: ${poke?.id || ''}</p>
                    <p>Edad del pokemon: ${poke?.age || ''}</p>
                    <p>Género del pokemon: ${poke?.gender || ''}</p>
                </main>
            </body>
        </html>
    `

    const viewPDF = async (id) =>{

        const composedHtml = html(pokes[id])

        const file = await printToFileAsync({
            html: composedHtml,
            base64: false
        })

        await Sharing.shareAsync(file.uri,{mimeType:'application/pdf'})
    }

    const viewCSV = async () => {
        const fileUri = FileSystem.documentDirectory + "pokecsv.csv"
        await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 })

        const {exists} = await FileSystem.getInfoAsync(fileUri)

        if(!exists){
            return
        }

        const uriii = await FileSystem.getContentUriAsync(fileUri)

        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: uriii,
            flags: 1,
            type: 'text/csv'
        });
    }

    const selectPoke = (id) =>{
        setSelectedPokeId(id)
        setOpen(true)
    }

    const closeModal = () =>{
        setOpen(false)
        getLocalPokes()
    }

    return !loading && (
        <MainView>
            <TitleText>Tus pokemones guardados:</TitleText>
            <ShortList
                nestedScrollEnabled
                data={pokes}
                renderItem={(poke)=>(
                    <PokemonCard poke={poke} key={poke.item}>
                        <FlexView>
                            <CustomPressable onPress={()=>viewPDF(poke.index)}>
                                <Text>PDF</Text>
                            </CustomPressable>
                            <CustomPressable onPress={()=>selectPoke(poke.index)}>
                                <Text>Edit</Text>
                            </CustomPressable>              
                            <IconPressable onPress={()=>deleteLocalPoke(poke.index)}>
                                <CustomText>✖</CustomText>
                            </IconPressable> 
                        </FlexView>                                               
                    </PokemonCard>
                )} 
            />
            <BottomView>
                <Button
                    title="Ver en CSV"
                    onPress={()=>viewCSV()}
                />
            </BottomView>
            <Modal
                animationType="slide"          
                visible={open}
                transparent
            >
                <ModalView>
                    <AddPoke
                        edit={selectedPokeId}
                        poke={selectedPoke}
                        setClose={()=>closeModal()}
                    />
                </ModalView>
            </Modal>
        </MainView>
    )
}

export default Local