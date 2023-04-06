import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FOLLOWING, FOR_YOU} from '../constants';

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
  const [selectedTab, setSelectedTab] = useState<number>(FOR_YOU);

  const handleTabPress = (tab: number) => {
    setSelectedTab(tab);
  };

  return (
    <Animated.View
      style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
      <Image source={require('../assets/tweet.png')} style={styles.image} />
      <Animated.View
        style={[styles.tabs, {transform: [{translateY: tabsTranslateY}]}]}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === FOR_YOU && styles.selectedTab,
          ]}
          onPress={() => handleTabPress(FOR_YOU)}>
          <Text style={styles.tabButtonText}>For You</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === FOLLOWING && styles.selectedTab,
          ]}
          onPress={() => handleTabPress(FOLLOWING)}>
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
  image: {
    height: 50,
    width: 50,
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
  },
  selectedTab: {
    borderBottomColor: '#1A9AF0',
    borderBottomWidth: 3,
  },
  tabButtonText: {
    fontWeight: 'bold',
  },
});

export default TweetHomeHeader;
