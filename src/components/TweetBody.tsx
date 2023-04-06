import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Tweet} from '../store/api/tweetApi';
import Separator from './Separator';
import {pastDateFormat} from '../utils';

interface TweetBodyProps {
  tweet: Tweet;
}

const TweetBody: React.FC<TweetBodyProps> = ({tweet}) => {
  const handleLikePress = () => {
    // TODO: Handle like press
  };

  const handleRetweetPress = () => {
    // TODO: Handle retweet press
  };

  const profileName = `${tweet.user.first_name} ${tweet.user.last_name}`;
  const userName = `@${tweet.user.first_name}${tweet.user.first_name}`;
  const tweetText = tweet.text;
  const createdAt = tweet.created_at;

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
            <Text style={styles.timestamp}>{pastDateFormat(createdAt)}</Text>
          </View>
          <Text style={styles.body}>{tweetText}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLikePress}>
              <Text style={styles.actionButtonText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRetweetPress}>
              <Text style={styles.actionButtonText}>Retweet</Text>
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
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TweetBody;
