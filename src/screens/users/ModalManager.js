import React, { useState } from 'react';
import ModalContainer from '../../components/ModalContainer';

const ModalManager = ({ createExpense }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContainer
      createExpense={createExpense}
      modalVisible={modalVisible}
      handleSetModalVisible={setModalVisible}
    />
  );
};

export default ModalManager;