import { useState } from 'react';
import styles from './SexSettingModal.module.scss';
import SettingBaseModal from './SettingBaseModal.jsx';
import classNames from 'classnames';
import { SEX } from '@constants/userConstants';
import { message } from 'antd';
import { useCallback } from 'react';


export const SexSettingModal = ({
  open,
  onClose,
  onOk = ({ sex }) => {},
  initialValues = {},
}) => {
  const [selectedSex, setSelectedSex] = useState(initialValues.sex);
  const [messageApi, contextHolder] = message.useMessage();

  const checkSelected = (sex) => {
    return sex === selectedSex;
  }
  const getSelectedClassName = (sex) => {
    return checkSelected(sex) ? 'selected' : '';
  }

  const onOkClick = () => {
    if (!selectedSex) {
      messageApi.error('请选择性别');
      return;
    }

    onOk?.({ sex: selectedSex });
  }
  
  const sexMaleIcon = useCallback((sex) => {
    return checkSelected(sex) ? require('@Assets/newchat/light/icon16-male-hl@2x.png') : require('@Assets/newchat/light/icon16-male@2x.png');
  }, [checkSelected]);

  const sexFemaleIcon = useCallback((sex) => {
    return checkSelected(sex) ? require('@Assets/newchat/light/icon16-female-hl@2x.png') : require('@Assets/newchat/light/icon16-female@2x.png');
  }, [checkSelected]);

  const sexSecretIcon = useCallback((sex) => {
    return checkSelected(sex) ? require('@Assets/newchat/light/icon16-account-hl@2x.png') : require('@Assets/newchat/light/icon16-account.png');
  });

  return <SettingBaseModal
    className={styles.SexSettingModal}
    open={open}
    onClose={onClose}
    onOk={onOkClick}
  >
    <div className={styles.sexWrapper}>
      <div className={classNames(styles.sexItem, getSelectedClassName(SEX.MALE))} onClick={() => setSelectedSex(SEX.MALE)}>
        <img className={styles.itemIcon} src={sexMaleIcon(SEX.MALE)} alt="male" />
        <div className={styles.itemTitle}>男性</div>
      </div>
      <div className={classNames(styles.sexItem, getSelectedClassName(SEX.FEMALE))} onClick={() => setSelectedSex(SEX.FEMALE)}>
        <img className={styles.itemIcon} src={sexFemaleIcon(SEX.FEMALE)} alt="female" />
        <div className={styles.itemTitle}>女性</div>
      </div>
      <div className={classNames(styles.sexItem, getSelectedClassName(SEX.SECRET))} onClick={() => setSelectedSex(SEX.SECRET)}>
        <img className={styles.itemIcon} src={sexSecretIcon(SEX.SECRET)} alt="secret" />
        <div className={styles.itemTitle}>保密</div>
      </div>
    </div>
    {contextHolder}
  </SettingBaseModal>
};

export default SexSettingModal;
