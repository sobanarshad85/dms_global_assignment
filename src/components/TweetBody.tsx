import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Tweet} from '../store/api/tweetApi';
import Separator from './Separator';
import {pastDateFormat} from '../utils';
import {useToggleTweetLikeMutation} from '../store/api/tweetApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch} from 'react-redux';
import {toggleLike} from '../store/tweetSlice';

interface TweetBodyProps {
  tweet: Tweet;
}

const TweetBody: React.FC<TweetBodyProps> = ({tweet}) => {
  const dispatch = useDispatch();

  const [toggleTweetLike, {isLoading, data}] = useToggleTweetLikeMutation();

  // Like or unlike a tweet depending on whether the user has liked it or not.
  const handleLikePress = () => {
    const formData = new FormData();
    formData.append('post_id', tweet.id);
    const payload = {data: formData, isLiked: tweet.like_by_me};
    toggleTweetLike(payload)
      .unwrap()
      .then(response => {
        console.log(`${!tweet?.like_by_me} posted successfully:`, response);
        dispatch(toggleLike(tweet.id));
      })
      .catch(error => {
        console.error(`Error ${!tweet?.like_by_me} tweet:`, error.message);
      });
  };

  const {text, created_at, replies_count, likes_count, like_by_me, user} =
    tweet;

  const profileName = `${user?.first_name} ${user?.last_name}`;
  const userName = `@${user?.first_name}${user?.first_name}`;

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{uri: tweet.user.profile_image_url}}
          style={styles.profileImage}
        />
        <View style={styles.tweetContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{profileName}</Text>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.timestamp}>{pastDateFormat(created_at)}</Text>
          </View>
          <Text style={styles.body}>{text}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              disabled={isLoading}
              style={styles.actionButton}
              onPress={handleLikePress}>
              <Ionicons
                name={like_by_me ? 'heart-sharp' : 'heart-outline'}
                color={like_by_me ? 'red' : 'black'}
                size={22}
                style={styles.actionButton}
              />
              <Text style={styles.count}>{likes_count}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather
                name="message-circle"
                size={22}
                style={styles.actionButton}
              />
              <Text style={styles.count}>{replies_count}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <EvilIcons name="retweet" size={30} style={styles.actionButton} />
              <Text style={styles.count}>23</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Separator height={0.6} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tweetContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  username: {
    color: '#657786',
    marginRight: 5,
  },
  dot: {
    color: '#657786',
    marginRight: 5,
  },
  timestamp: {
    color: '#657786',
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: 0,
    fontSize: 14,
  },
  actionButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TweetBody;
