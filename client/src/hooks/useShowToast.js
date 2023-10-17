import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status, duration, isClosable) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: duration,
        isClosable: isClosable,
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
