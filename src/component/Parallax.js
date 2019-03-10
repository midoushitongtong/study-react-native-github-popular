import React from 'react';
import {
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Parallax extends React.Component {


  render = () => {
    const { props } = this;
    return (
      <ParallaxScrollView
        backgroundColor="#06f"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}

        renderBackground={() => (
          <View key="background">
            <Image source={{
              uri: props.backgroundConfig.imageURI,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT
            }}/>
            <View style={{
              position: 'absolute',
              top: 0,
              width: window.width,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }}/>
          </View>
        )}

        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Image style={styles.avatar} source={{
              uri: props.foregroundConfig.imageURI,
              width: AVATAR_SIZE,
              height: AVATAR_SIZE
            }}/>
            <Text style={styles.sectionSpeakerText}>
              {props.foregroundConfig.title}
            </Text>
            <Text style={styles.sectionTitleText}>
              {props.foregroundConfig.subTitle}
            </Text>
          </View>
        )}

        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{props.stickyHeaderConfig.title}</Text>
          </View>
        )}

        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
            >
              <MaterialIcons
                style={{ margin: 11, color: '#fff' }}
                name="chevron-left"
                size={20}
              />
            </TouchableOpacity>
          </View>
        )}>
        {props.content}
      </ParallaxScrollView>
    );
  };
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 65;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    top: 11,
    left: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 23,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  line: {
    flex: 1,
    height: 1,
    opacity: .5,
    backgroundColor: '#999'
  },
  menuTitle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    color: '#999'
  }
});
