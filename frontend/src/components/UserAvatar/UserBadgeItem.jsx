import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, onClick, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={onClick}
    >
      {user.name}
      {(admin === user?._id || admin?._id === user?._id) && (
        <span> (Admin)</span>
      )}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
