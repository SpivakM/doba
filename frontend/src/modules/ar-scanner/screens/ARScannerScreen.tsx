import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import Video from 'react-native-video';
import { FooterNav } from '../../../shared/components/FooterNav';
import { COLORS } from '../../../shared/constants/theme';

interface ARScannerScreenProps {
  navigation?: any;
}

// Пряме MP4-відео з міською площею та будинками
const MOCK_AR_VIDEO = 'https://vjs.zencdn.net/v/oceans.mp4';

// Мок-зображення виявленої пам'ятки
const OPERA_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yGuOXzdFdT0u1emI3lPiX0zK26AyKB6uvGPdY2Fgqg&s=10';

export const ARScannerScreen: React.FC<ARScannerScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        {...(Platform.OS === 'android' ? { backgroundColor: COLORS.primaryGreen } : {})}
      />

      {/* Повноекранне фонове відео сканера */}
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: MOCK_AR_VIDEO }}
          style={styles.backgroundVideo}
          resizeMode="cover"
          repeat
          muted
          paused={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
        />
      </View>

      {/* Верхня зелена шапка */}
      <View style={styles.topHeaderBar} />

      {/* Контент поверх відео: Плаваюча картка AR-детектиду */}
      <View style={styles.contentContainer}>
        <View style={styles.detectedCard}>
          <Image
            source={{ uri: OPERA_IMAGE }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>Lviv Theatre of{'\n'}Opera and Ballet</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Historical Landmark | Detected</Text>
          </View>
        </View>
      </View>

      {/* Перевикористовуємо FooterNav з shared */}
      <FooterNav
        navigation={navigation}
        rightTabLabel="SITES"
        rightTabTarget="Landmarks"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  topHeaderBar: {
    height: Platform.OS === 'ios' ? 44 : 24,
    backgroundColor: COLORS.primaryGreen,
    width: '100%',
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  detectedCard: {
    width: 175,
    backgroundColor: COLORS.backgroundPergament,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.borderBronze,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 18,
  },
  badgeContainer: {
    backgroundColor: COLORS.buttonBrown,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '600',
  },
});