import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Avatar, Text, HStack } from "@pankod/refine-chakra-ui";

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  const shouldRenderHeader = user && (user.name || user.avatar);

  return shouldRenderHeader ? (
    <Box
      py="2"
      px="4"
      display="flex"
      justifyContent="flex-end"
      w="full"
      bg="chakra-body-bg"
    >
      <HStack>
        <Text size="sm" fontWeight="bold">
          {user?.name}
        </Text>
        <Avatar size="sm" name={user?.name} src={user?.avatar} />
      </HStack>
    </Box>
  ) : null;
};
