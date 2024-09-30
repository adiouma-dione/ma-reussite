import React from "react";
import { Box, Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CircularProgress = ({
  progress = 50,
  width = 10,
  size = 70,
  note = false,
  isDarkMode,
}) => {
  const fillProgress = note ? Math.round((progress * 100) / 20) : progress;

  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fillProgress}
        tintColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
        backgroundColor="#CED3DE"
        rotation={0}
        duration={3000}
        delay={500}
      >
        {() => (
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            fontSize={"lg"}
            fontWeight={"bold"}
          >
            {note ? `${progress}` : `${progress}%`}
          </Text>
        )}
      </AnimatedCircularProgress>
    </Box>
  );
};

export default CircularProgress;
