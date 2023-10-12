import { Modal, Group, Button, Textarea } from "@mantine/core";
import { connect } from "react-redux";
import { useEffect } from "react";

import { setModalVisibility, setModalText } from "./store/actions";

const BasicModal = ({
  opened,
  open,
  close,
  modalText,
  isModalOpen,
  setModalVisibility,
  setModalText,
}) => {
  useEffect(() => () => setModalText(""), []);
  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={() => setModalVisibility(false)}
        title="Note"
        centered
      >
        {/* Modal content */}
        <Textarea value={modalText} autosize />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  modalText: state.getIn(["modal", "modalText"]),
  isModalOpen: state.getIn(["modal", "isModalOpen"]),
});

export const GLModal = connect(mapStateToProps, {
  setModalVisibility,
  setModalText,
})(BasicModal);
