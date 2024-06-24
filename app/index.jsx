import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}} >
        <View className="w-full justify-center items-center min-h-[90vh] px-4">
          <Image
            source={images.logo}
            className="w-[250px] h-[150px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5 font-nlight">
            <Text className="text-4xl  text-white font-nbold text-center">
            "ደስ የሚለው ማንም ቢኖር እርሱ{' '} 
            <Text className="text-secondary-200 font-nlight">
            ይዘምር። "
            </Text>
            </Text>
            <Image
            source={images.path}
            className="w-[130px] h-[25px] absolute -bottom-4 right-5"
            resizeMode='contain'
          />
          <Text className="text-sm mt-7 text-center absolute -bottom-8 right-7 text-gray-100 font-nbold">
            - ያዕ ፭ ፥ ፲፫
          </Text>
          </View>
          <Text className="text-sm mt-12 text-center text-gray-100 font-nbold">
            Where creativity meets innovation: mark on a journey of limitless expoloration with Aora
          </Text>
          <CustomButton
            title="Continue with email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="mt-7 w-full"
            // isLoading={isSubmitting}
          />    
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
