import { Modal, Text, View } from 'react-native';
import React, { useState } from 'react';

import AnimatedButton3D from '../../components/AnimatedButton3D';
import Colors from '../../constants/Colors';
import styles from '../../styles/pageOne';

const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [canPressButton, setCanPressButton] = useState(true);
  const [waitMessage, setWaitMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);

  const handleButtonPress = () => {
    if (canPressButton) {
      setIsModalVisible(true);
      setCanPressButton(false);
      setWaitMessage('');
      setRemainingTime(10);
      startCountdown();
      setTimeout(() => {
        setIsModalVisible(false);
      }, 500);
    } else {
      setWaitMessage(`Aguarde pelo menos ${remainingTime} segundos para fazer outra solicitação.`);
    }
  };

  const startCountdown = () => {
    let countdownTime = remainingTime;
    const countdownInterval = setInterval(() => {
      countdownTime -= 1;
      setWaitMessage(`Aguarde pelo menos ${countdownTime} segundos para fazer outra solicitação.`);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setWaitMessage('');
      setCanPressButton(true);
    }, remainingTime * 1000);
  };

  const handlePressIn = () => {
    // Handle button press in if needed
  };

  const handlePressOut = () => {
    handleButtonPress();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WomanProtection App</Text>
      <AnimatedButton3D onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={!canPressButton} />
      {waitMessage ? <Text style={styles.waitMessage}>{waitMessage}</Text> : null}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Alerta enviado para a equipe de policiais!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
