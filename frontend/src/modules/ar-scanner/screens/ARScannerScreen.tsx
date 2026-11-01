import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { FooterNav } from '../../../shared/components/FooterNav';
import { COLORS } from '../../../shared/constants/theme';

interface ARScannerScreenProps {
  navigation?: any;
}

// Пряме відео-заглушка під камеру
const MOCK_AR_VIDEO = 'https://vjs.zencdn.net/v/oceans.mp4';

// Дані пам'ятки (надалі підтягуватимуться з БД чи API)
const MOCK_LANDMARK = {
  id: 'lviv_opera',
  title: 'Львівська опера',
  subtitle: 'Театр опери та балету ім. Соломії Крушельницької',
  description:
    'Архітектурна перлина Львова у стилі неоренесансу, зведена на початку XX століття за проєктом архітектора Зиґмунта Ґорґолевського.',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yGuOXzdFdT0u1emI3lPiX0zK26AyKB6uvGPdY2Fgqg&s=10',
};

export const ARScannerScreen: React.FC<ARScannerScreenProps> = ({ navigation }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleOpenAiGuide = () => {
    // Закриваємо модалку та переходимо на екран чату з AI
    setIsCardVisible(false);
    navigation?.navigate('AIGuide', {
      landmarkId: MOCK_LANDMARK.id,
      landmarkName: MOCK_LANDMARK.title,
      initialContext: MOCK_LANDMARK.description,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        {...(Platform.OS === 'android' ? { backgroundColor: COLORS.primaryGreen } : {})}
      />

      {/* Фоновий відео-потік (заглушка замість VisionCamera) */}
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

      {/* Верхня статус-панель */}
      <View style={styles.topHeaderBar} />

      {/* Робоча AR-зона з інтерактивними мітками */}
      <View style={styles.contentContainer}>
        {/* AR-маркер / Іконка пам'ятки в просторі */}
        {!isCardVisible && (
          <TouchableOpacity
            style={styles.pinButton}
            activeOpacity={0.8}
            onPress={() => setIsCardVisible(true)}
          >
            <View style={styles.pinOuterPulse}>
              <View style={styles.pinInnerCircle}>
                <Text style={styles.pinIconText}>📍</Text>
              </View>
            </View>
            <View style={styles.pinLabelBadge}>
              <Text style={styles.pinLabelText}>{MOCK_LANDMARK.title}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Картка з інформацією та переходом до AI-гіда */}
        {isCardVisible && (
          <View style={styles.detectedCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCardVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: MOCK_LANDMARK.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />

            <Text style={styles.cardTitle}>{MOCK_LANDMARK.title}</Text>
            <Text style={styles.cardSubtitle}>{MOCK_LANDMARK.subtitle}</Text>
            <Text style={styles.cardDescription}>{MOCK_LANDMARK.description}</Text>

            <TouchableOpacity
              style={styles.aiButton}
              activeOpacity={0.85}
              onPress={handleOpenAiGuide}
            >
              <Text style={styles.aiButtonIcon}>✨</Text>
              <Text style={styles.aiButtonText}>Дізнатись більше в AI-гіда</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Футер-навігація */}
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
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topHeaderBar: {
    height: Platform.OS === 'ios' ? 44 : 24,
    backgroundColor: COLORS.primaryGreen,
    width: '100%',
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Стилі круглої іконки-мітки AR
  pinButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinOuterPulse: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(218, 165, 32, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  pinInnerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  pinIconText: {
    fontSize: 20,
  },
  pinLabelBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderBronze,
  },
  pinLabelText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Стилі спливаючої інформаційної картки
  detectedCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.backgroundPergament,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.borderBronze,
    padding: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.buttonBrown,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textDark,
    marginBottom: 14,
  },
  aiButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiButtonIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  aiButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});