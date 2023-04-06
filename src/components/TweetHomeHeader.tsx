import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';

const HEADER_HEIGHT = 68;
const TABS_HEIGHT = 40;
const TABS_TOP = HEADER_HEIGHT;

type TweetHomeHeaderProps = {
  headerTranslateY: Animated.Value | any;
  tabsTranslateY: Animated.Value | any;
};

const TweetHomeHeader = ({
  headerTranslateY,
  tabsTranslateY,
}: TweetHomeHeaderProps): JSX.Element => {
  return (
    <Animated.View
      style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
      <Image
        source={require('../assets/tweet.png')}
        style={{height: 50, width: 50}}
      />
      <Animated.View
        style={[styles.tabs, {transform: [{translateY: tabsTranslateY}]}]}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>For You</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Following</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tabs: {
    height: TABS_HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: TABS_TOP,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderBottomColor: '#1A9AF0',
    borderBottomWidth: 3,
  },
  tabButtonText: {
    fontWeight: 'bold',
  },
});

export default TweetHomeHeader;
