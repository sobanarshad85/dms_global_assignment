import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Tweet, useLazyGetTweetListQuery} from '../../store/api/tweetApi';
import {
  addTweetsInStore,
  getCurrentPage,
  getTweetList,
  getTotalPages,
} from '../../store/tweetSlice';
import {
  View,
  StyleSheet,
  VirtualizedList,
  Animated,
  ListRenderItem,
} from 'react-native';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import TweetBody from '../../components/TweetBody';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/TweetHomeHeader';

const HEADER_HEIGHT = 68;
const TABS_HEIGHT = 40;

const AnimatedVirtualizedList =
  Animated.createAnimatedComponent(VirtualizedList);

function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const tweetList = useSelector(getTweetList);
  const totalPages = useSelector(getTotalPages);
  const currentPage = useSelector(getCurrentPage);

  const [
    getTweets,
    {isLoading: isTweetDataLoading, isError: tweetError, data: tweetData},
  ] = useLazyGetTweetListQuery();

  useEffect(() => {
    if (totalPages == 1) {
      getTweets(currentPage);
    }
  }, [totalPages]);

  useEffect(() => {
    console.log('tweetData: ', tweetData);
    tweetData &&
      !tweetError &&
      dispatch(
        addTweetsInStore({
          result: tweetData.data,
          totalPages: tweetData.totalPages,
        }),
      );
  }, [tweetData, dispatch]);

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const tabsTranslateY = scrollY.interpolate({
    inputRange: [0, 0.1],
    outputRange: [0.1, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  const getItemCount = (data: Tweet[]) => data.length;
  const getItem = (data: Tweet[], index: number) => data[index];

  const onEndReached = () => {
    if (!isTweetDataLoading) {
      getTweets(currentPage);
    }
  };

  const renderFooter = () => {
    if (isTweetDataLoading) {
      return <Loading />;
    }
    return null;
  };

  const renderItem: ListRenderItem<Tweet | any> = ({item}) => {
    return <TweetBody tweet={item} />;
  };

  if (tweetError) {
    return <Error error={tweetError} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          headerTranslateY={headerTranslateY}
          tabsTranslateY={tabsTranslateY}
        />
        <AnimatedVirtualizedList
          data={tweetList}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={renderFooter}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contentContainer: {
    paddingTop: HEADER_HEIGHT + TABS_HEIGHT,
  },
});

export default Home;
