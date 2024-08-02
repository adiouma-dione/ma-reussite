import React, { useEffect, useState } from "react";
import { Button, NativeBaseProvider } from "native-base";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";
import AppNavigator from "./src/navigation/AppNavigator";
import customTheme from "./src/themes/customTheme";
// import { SelectedChildProvider } from "./src/hooks/SelectedChildContext";
import OneSignal from "react-native-onesignal";
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [currentPolicyVersion, setCurrentPolicyVersion] = useState(null);

  // // Initialiser OneSignal avec votre ID d'application
  // OneSignal.setLogLevel(6, 0);
  // OneSignal.setAppId(Constants.expoConfig.extra.oneSignalAppId);

  // // Activer les notifications
  // OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  //   console.log("Notification permission:", response);
  // });

  OneSignal.initialize("41b8ded4-0054-4d9b-a3d2-ac8e943c0c60");

  const handleWebViewMessage = (event) => {
    const policyVersion = event.nativeEvent.data;
    setCurrentPolicyVersion(policyVersion);
  };

  const PrivacyPolicyScreen = ({ onAccept }) => {
    return (
      <NativeBaseProvider isSSR theme={customTheme}>
        <WebView
          source={{ uri: "https://ma-reussite-privacy.netlify.app/" }}
          style={{ flex: 1, marginTop: "10%", marginBottom: "5%" }}
          onMessage={handleWebViewMessage}
        />
        <Button w={"50%"} mx={"auto"} mb={"2%"} onPress={onAccept}>
          J'accepte
        </Button>
      </NativeBaseProvider>
    );
  };

  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  const handleAccept = async () => {
    await AsyncStorage.setItem("policyAccepted", "true");
    await AsyncStorage.setItem("policyVersion", currentPolicyVersion);
    setPolicyAccepted(true);
  };

  const checkPolicyAcceptance = async () => {
    const value = await AsyncStorage.getItem("policyAccepted");
    const storedPolicyVersion = await AsyncStorage.getItem("policyVersion");

    if (value === "true" && storedPolicyVersion === currentPolicyVersion) {
      setPolicyAccepted(true);
    }
  };

  useEffect(() => {
    if (currentPolicyVersion) checkPolicyAcceptance();
    if (fontsLoaded && currentPolicyVersion) SplashScreen.hideAsync();
  }, [fontsLoaded, currentPolicyVersion]);

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("Notification ouverte:", notification);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        let notification = notificationReceivedEvent.getNotification();
        console.log("Notification reçue:", notification);
      }
    );
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (!policyAccepted) {
    return <PrivacyPolicyScreen onAccept={handleAccept} />;
  }

  return (
    <NativeBaseProvider isSSR theme={customTheme}>
      {/* <SelectedChildProvider> */}
      <AppNavigator />
      {/* </SelectedChildProvider> */}
    </NativeBaseProvider>
  );
};

export default App;
