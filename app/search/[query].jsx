import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => { 
    refetch();
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        // data={[]}
        keyExtractor={( item ) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />  
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-6">
              <View className="mt-2 mb-8">
                <SearchInput initialQuery={query} />
              </View>
              <Text className="font-nbold text-sm text-gray-100">
                  Search Result for
              </Text>

              <Text className="text-xl font-nbold text-white">
                  {query}
              </Text>

          </View>
        )}
        ListEmptyComponent={() => (
            <EmptyState
              title="No video Found"
              subtitle="No videos found for this search query"
            />
        )}

        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})