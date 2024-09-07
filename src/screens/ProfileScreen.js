import { MaterialIcons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Link,
  ScrollView,
  VStack,
  Text,
  Actionsheet,
  useDisclose,
  Button,
  HStack,
  Divider,
  Toast,
  CloseIcon,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { getObject, storeObject, updateRecord } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import * as FileSystem from "expo-file-system";
import config from "../api/config";
import { Alert } from "react-native";
import { ToastAlert } from "../components";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [connectedUser, setConnectedUser] = useState({
    sessionId: "",
    email: "",
    password: "",
    userid: "",
    role: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      setConnectedUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const updateUserProfileImage = async (imageUri) => {
    try {
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await updateRecord(
        connectedUser.sessionId,
        connectedUser.password,
        config.model.partner,
        connectedUser.userid[0],
        { image_1920: imageBase64 }
      );

      if (response) {
        toast.show({
          render: () => (
            <ToastAlert
              title={"Succès"}
              description={
                "Votre photo de profil a été mise à jour avec succès."
              }
              status={"success"}
              isClosable={true}
              variant={"left-accent"}
              duration={5000}
            />
          ),
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil :",
        error
      );
      toast.show({
        title: "Erreur",
        description: "La mise à jour de la photo de profil a échoué.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleProfileImagePress = () => onOpen();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissions requises",
        "Vous devez autoriser l'accès à la galerie."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const updatedUser = { ...connectedUser, profileImage: imageUri };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser);
      await updateUserProfileImage(imageUri);
    }
    onClose();
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissions requises",
        "Vous devez autoriser l'accès à la caméra."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const updatedUser = { ...connectedUser, profileImage: imageUri };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser);
      await updateUserProfileImage(imageUri);
    }
    onClose();
  };

  return (
    <Box flex={1} bg="white">
      <Center mt={2}>
        {loading ? (
          <Avatar
            size="2xl"
            source={{ uri: "https://placehold.co/400x400.png" }}
          />
        ) : (
          <Avatar
            size="xl"
            bg={MA_REUSSITE_CUSTOM_COLORS.Secondary}
            source={{ uri: connectedUser?.profileImage }}
          >
            <Avatar.Badge
              bg="white"
              borderWidth={0}
              position="absolute"
              bottom={0.5}
              right={0.5}
              size={6}
            >
              <IconButton
                icon={
                  <Icon as={MaterialIcons} name="edit" size={4} color="black" />
                }
                borderRadius="full"
                onPress={handleProfileImagePress}
              />
            </Avatar.Badge>
          </Avatar>
        )}
        <Heading color="black" mt={2}>
          {connectedUser && connectedUser.userid[1]}
        </Heading>
      </Center>
      <ScrollView mt={2} contentContainerStyle={{ paddingBottom: 80 }}>
        <Box mt={4}>
          <Heading mx={4} color="black" size="md">
            Contact
          </Heading>
          <VStack mx={4}>
            <Text mt={2} color="black" bold>
              Adresse email :
            </Text>
            <Link href={connectedUser?.email}>
              <Text color="primary.500">{connectedUser?.email}</Text>
            </Link>
          </VStack>
        </Box>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          bg="white"
          borderBottomRadius="lg"
          borderTopRadius="lg"
        >
          <Text my={2} color="black">
            Choisir une image
          </Text>
          <Divider bg="gray.100" h={0.5} />
          <Actionsheet.Item onPress={pickImage}>
            <HStack ml={5}>
              <FontAwesome6
                name="image"
                size={18}
                color={MA_REUSSITE_CUSTOM_COLORS.Secondary}
              />
              <Text ml={4} color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>
                Album photos
              </Text>
            </HStack>
          </Actionsheet.Item>
          <Divider bg="gray.100" h={0.5} />
          <Actionsheet.Item onPress={takePhoto}>
            <HStack ml={5}>
              <FontAwesome5
                name="camera"
                size={18}
                color={MA_REUSSITE_CUSTOM_COLORS.Secondary}
              />
              <Text ml={8} color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>
                Caméra
              </Text>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
        <Button mb={6} onPress={onClose} bg="white">
          <Text color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>Annuler</Text>
        </Button>
      </Actionsheet>
    </Box>
  );
};

export default ProfileScreen;
