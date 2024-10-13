import React from "react";
interface Props {
  closePopUp: () => void;
}
const PopUPWorkDetails = ({ closePopUp }: Props) => {
  return <div onClick={closePopUp}>Close PopUPWorkDetails</div>;
};

export default PopUPWorkDetails;
