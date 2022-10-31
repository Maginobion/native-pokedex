import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokeApi from './screens/PokeApi';
import Local from './screens/Local';
import Main from './screens/Main';
import Poke from './screens/Poke';
import AddPoke from './screens/AddPoke';

const { Navigator, Screen } = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Home'>
        <Screen name='Home' component={Main}/>
        <Screen name='PokeAPI' component={PokeApi}/>
        <Screen name='Local' component={Local}/>
        <Screen name='Pokemon' component={Poke}/>
        <Screen name='addPoke' component={AddPoke}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default App