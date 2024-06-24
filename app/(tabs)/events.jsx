import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Tranding from '../../components/Tranding'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getCurrentUser, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const events = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPost } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true) 
    await refetch();
    setRefreshing(false);

  }

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
          <View className="my-6 px-6 space-y-6">
            {/* <View className="border-2 border-green-200/25 rounded-md bg-green-200/10 focus:border-secondary p-5">
                <Text className="text-white">
                  20 USDT New trader loss protection
                </Text>
                <Text className="text-white">
                  Get reimbursed for losses on your first trade.
                </Text>
            </View> */}
                <SearchInput />
            <View className="justify-between items-start flex-row mb-6">
              
              <View>
                <Text className="font-nbold text-sm text-gray-100">
                   Welcome Back
                </Text>
                <Text className="text-2xl font-nbold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoExtraSmall}
                  className="w-12 h-12"
                  resizeMode='contain'
                />
              </View>
            </View>
            <View className="w-full flex-1 pt-1 pb-8">
              <Text className="text-gray-100 text-lg font-nbold">
                Tranding Videos
              </Text>
              <Tranding posts={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
            <EmptyState
              title="No Mezmur Found"
              subtitle="Be the first one to upload a Mezmur"
            />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default events

const styles = StyleSheet.create({})