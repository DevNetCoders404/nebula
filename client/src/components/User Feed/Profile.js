import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

function Profile() {
  return (
    <div>
      <Box
        position="fixed"
        left={20}
        top="150px"
        boxShadow="md"
        pt={["40px", "10px", "15px", "10px", "40"]}
        pb={["5", "5", "25px", "35px", "10"]}
        width={["280px", "280px", "300px", "300px", "20%"]}
        id="profile-box"
      >
        <Image
          src="https://i.ibb.co/qBmhLK4/12.jpg"
          borderRadius={400}
          width={["150px", "150px", "150px", "160px", "50%"]}
          ml="auto"
          mr="auto"
          mt={["null", "null", "null", "null", "-150px"]}
          align="center"
          id="profile-image"
        ></Image>
        <Box id="profile-text">
          <Text
            fontFamily="ubuntu"
            fontWeight="bold"
            fontSize={["16", "8", "19", "20", "20"]}
            mt={["7", "2", "5", "5", "5"]}
            align="center"
          >
            Yash Shinde
          </Text>
          <Text
            align="center"
            fontFamily="ubuntu"
            color="GrayText"
            fontSize={["15", "15", "17", "18", "18"]}
            mt={["3", "1", "3", "1", "3"]}
            mb={["3", "1", "3", "1", "3"]}
          >
            Full Stack Developer
          </Text>
          <Text
            align="center"
            fontFamily="ubuntu"
            color="GrayText"
            fontSize={["15", "15", "17", "18", "18"]}
          >
            Bhui Galli , Kolhapur
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
