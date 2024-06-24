import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {

    const pathname = usePathname();

    const [query, setQuery] = useState(initialQuery || '')

  return (

      <View className="border-2 border-black-200 rounded-full w-full h-12 px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4">
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-nbold"
            value={query}
            placeholder="Search for a mezmur topic"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
        />
       
            <TouchableOpacity 
                onPress={() =>{
                    if (!query) {
                        return Alert.alert('Missing query', "Please input somthing to search results across database")
                    }
                    if (pathname.startsWith('/search')) {
                        router.setParams({query})  
                    }else{
                        router.push(`/search/${query}`)
                    }
                }}
            >
                <Image 
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
      </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({})