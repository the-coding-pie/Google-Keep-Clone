import { useDispatch } from "react-redux";
import useClose from "../hooks/useClose";
import { hideModal } from "../store/actions/modal";
import LabelModal from "./LabelModal";
import NoteModal from "./NoteModal";
import { NOTE_MODAL, LABEL_MODAL } from "../shared/constants";
import { ModalObj } from "../shared/types";

interface Props extends ModalObj {}

const Modal: React.FC<Props> = ({ modalType, modalProps }) => {
  const dispatch = useDispatch();

  const ref = useClose(() => dispatch(hideModal()));

  let Component = null;

  switch (modalType) {
    case NOTE_MODAL:
      Component = NoteModal;
      break;
    case LABEL_MODAL:
      Component = LabelModal;
      break;
    default:
      Component = null;
  }

  return (
    <div className="backdrop fixed w-auto h-full top-0 right-0 bottom-0 left-0 z-50 flex bg-gray-800 bg-opacity-50 justify-center items-center">
      <div className="modal w-auto mb-36" ref={ref}>
        {Component !== null && <Component {...{ modalProps }} />}
      </div>
    </div>
  );
};

export default Modal;
