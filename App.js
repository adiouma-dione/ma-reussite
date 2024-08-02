import React, { useEffect, useState } from "react";
import { Box, Button, Center, NativeBaseProvider, Text } from "native-base";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";
import AppNavigator from "./src/navigation/AppNavigator";
import customTheme from "./src/themes/customTheme";
import { usePushNotifications } from "./src/hooks/usePushNotifications";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [currentPolicyVersion, setCurrentPolicyVersion] = useState(null);
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

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

  if (!fontsLoaded) {
    return null;
  }

  if (!policyAccepted) {
    return <PrivacyPolicyScreen onAccept={handleAccept} />;
  }
  console.log("{expoPushToken?.data}", expoPushToken?.data ?? "");
  console.log("{data}", data);
  return (
    <NativeBaseProvider isSSR theme={customTheme}>
      {/* <SelectedChildProvider> 
      ExponentPushToken[w8C6KyGJ210gEaN877uQ6_]
      */}
      {/* <Center flex={1}>
        <Text color={"black"}>Token: {expoPushToken?.data ?? ""}</Text>
        <Text color={"black"}>Notification: {data}</Text>
      </Center> */}
      <AppNavigator />
      {/* </SelectedChildProvider> */}
    </NativeBaseProvider>
  );
};

export default App;
