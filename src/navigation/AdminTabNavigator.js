import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { AppProvider } from "../hooks/AppProvider";
import {
  AdminActivityScreen,
  AdminGroupScreen,
  AdminHomeScreen,
} from "../screens";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const Tab = createBottomTabNavigator();

export const AdminTabNavigator = () => {
  const propagedRoute = useRoute();
  return (
    <AppProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            route.params = propagedRoute?.params;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Groups") {
              iconName = "group";
            } else if (route.name === "Activities") {
              iconName = "notifications";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarItemStyle: {
            paddingBottom: 5,
          },
          tabBarIconStyle: {
            backgroundColor: "white",
          },
          tabBarStyle: {
            backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            // minHeight: "7%",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={AdminHomeScreen}
          options={{ tabBarShowLabel: false }}
        />
        <Tab.Screen
          name="Groups"
          component={AdminGroupScreen}
          options={{ tabBarShowLabel: false }}
        />
        <Tab.Screen
          name="Activities"
          component={AdminActivityScreen}
          options={{ tabBarShowLabel: false }}
        />
      </Tab.Navigator>
    </AppProvider>
  );
};
