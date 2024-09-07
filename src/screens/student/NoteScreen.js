// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Box, Center, HStack, Spinner, Text } from "native-base";
// import React, { useEffect, useState } from "react";
// import { BackgroundWrapper, CircularProgress } from "../../components";
// import config from "../../api/config";
// import { jsonrpcRequest } from "../../api/apiClient";

// const NoteScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const [sessionId, setSessionId] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [userid, setUserid] = useState(null);
//   const [note, setNote] = useState();
//   const [course, setCourse] = useState();
//   const [institute, setInstitute] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const connectedUser = route?.params;
//     const { sessionId, email, password, userid } = connectedUser;
//     setSessionId(sessionId);
//     setPassword(password);
//     setUserid(userid[0]);
//   }, [route]);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const noteData = await jsonrpcRequest(
//           sessionId,
//           config.password,
//           config.model.craftStudent,
//           // [[["partner_id", "=", userid]]],
//           [],
//           // ["prev_result", "prev_course_id", "prev_institute_id"]
//           []
//         );
//         setNote(noteData[0].prev_result);
//         setCourse(noteData[0].prev_course_id);
//         setInstitute(noteData[0].prev_institute_id);
//       } catch (error) {
//         console.error("Error fetching notes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (sessionId && password && userid) {
//       fetchNote();
//     }
//   }, [sessionId, password, userid]);

//   return (
//     <Box flex={1} bg={"white"}>
//       <BackgroundWrapper navigation={navigation}>
//         {loading ? (
//           <Center h={"70%"} w={"90%"} mx={"auto"}>
//             <Spinner size="xl" />
//           </Center>
//         ) : (
//           <>
//             <HStack p={4} alignItems={"baseline"}>
//               <Text color={"black"} fontSize={14}>
//                 Institut:
//               </Text>
//               <Text color={"black"} fontSize={18} fontWeight={"bold"}>
//                 {institute}
//               </Text>
//             </HStack>
//             <HStack p={4} alignItems={"baseline"}>
//               <Text color={"black"} fontSize={14}>
//                 Filière:
//               </Text>
//               <Text color={"black"} fontSize={18} fontWeight={"bold"}>
//                 {course}
//               </Text>
//             </HStack>
//             <Box justifyContent={"center"} alignItems={"center"}>
//               {note ? (
//                 <>
//                   <Text color={"black"} fontSize={18} fontWeight={"bold"} p={4}>
//                     Moyenne Annuelle :
//                   </Text>
//                   <CircularProgress
//                     progress={note}
//                     width={20}
//                     size={150}
//                     note={true}
//                   />
//                 </>
//               ) : (
//                 <Box>
//                   <Text
//                     mt={"30%"}
//                     color={"black"}
//                     textAlign={"center"}
//                     fontSize={"2xl"}
//                     fontWeight={"bold"}
//                   >
//                     Pas de note
//                   </Text>
//                 </Box>
//               )}
//             </Box>
//           </>
//         )}
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default NoteScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Image } from "native-base";
import React from "react";
import { BackgroundWrapper } from "../../components";

const NoteScreen = () => {
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="white">
      <BackgroundWrapper navigation={navigation}>
        <Center
          minH={"80%"}
          //  bgColor={"amber.400"}
        >
          <Image
            // bgColor={"blue.300"}
            size="sm"
            w={"90%"}
            resizeMode="contain"
            minH={"70%"}
            p={2}
            // m={"auto"}
            source={require("../../../assets/images/coming_soon.png")}
            alt="Alternate Text"
          />
        </Center>
      </BackgroundWrapper>
    </Box>
  );
};

export default NoteScreen;
