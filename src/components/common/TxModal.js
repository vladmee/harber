import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentTx } from "../../store/actions/status";

import { BaseStyles, Box, Flex, Modal, Button, Text, Card } from "rimble-ui";

const TxModal = ({ show }) => {
  const currentTx = useSelector(state => state.status.currentTx);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clearCurrentTx());
  };

  return (
    <BaseStyles>
      <Modal isOpen={show}>
        <Card width={"420px"} p={0}>
          <Button.Text
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={closeModal}
          />

          <Box p={4} mb={3}>
            <Text>{currentTx.name}</Text>
            <Text>{currentTx.status}</Text>
          </Box>
        </Card>
      </Modal>
    </BaseStyles>
  );
};

export default TxModal;
