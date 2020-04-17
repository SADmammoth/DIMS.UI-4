import React from 'react';
import PropTypes from 'prop-types';
import TextBadge from '../TextBadge';
import DateBadge from '../DateBadge';
import Button from '../Button';
import { ReactComponent as BackIcon } from '../../../assets/icons/Back.svg';
import MemberEdit from './MemberEdit';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';
import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as SkypeIcon } from '../../../assets/icons/skype.svg';
import { ReactComponent as MobileIcon } from '../../../assets/icons/Mobile.svg';
import { ReactComponent as AddressIcon } from '../../../assets/icons/Address.svg';
import { ReactComponent as EnvelopeIcon } from '../../../assets/icons/Envelope.svg';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import FlexColumn from '../FlexColumn';
import Client from '../../../helpers/Client';
import DialogButton from '../DialogButton/DialogButton';
import Spinner from '../Spinner';
import Validator from '../../../helpers/Validator';

class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  editMember = (
    UserId,
    {
      firstName,
      lastName,
      email,
      skype,
      mobilePhone,
      address,
      sex,
      startDate,
      birthDate,
      direction,
      education,
      universityAverageScore,
      mathScore,
    },
  ) => {
    this.setState({ loading: true });

    return Client.editMember(
      UserId,
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      Validator.dateByMask(birthDate, 'dd-MM-yyyy'),
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      Validator.dateByMask(startDate, 'dd-MM-yyyy'),
    )
      .then((response) => {
        this.setState({ loading: false });
        this.props.handleClose();
        return response;
      })
      .catch((response) => {
        this.setState({ loading: false });
        return response;
      });
  };

  render() {
    const {
      id,
      firstName,
      lastName,
      email,
      startDate,
      direction,
      mobilePhone,
      skype,
      address,
      sex,
      birthDate,
      education,
      universityAverageScore,
      mathScore,
      edit,
      setEdit,
      handleClose,
      role,
    } = this.props;

    const openEditModal = () => setEdit(true);

    return (
      <>
        {!this.state.loading ? (
          <>
            {edit ? (
              <MemberEdit
                onSubmit={(data) => {
                  return this.editMember(id, data);
                }}
                {...this.props}
              />
            ) : (
              <>
                <div className='member-info__header'>
                  {handleClose && (
                    <Button onClick={handleClose}>
                      <BackIcon className='icon-back common-text-color' />
                    </Button>
                  )}
                  <p className='member-info__title'>
                    <b>{firstName}</b>
                    {` ${lastName}`}
                  </p>
                  <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
                  <TextBadge>{direction}</TextBadge>
                </div>
                <div className='member-info__body'>
                  <div className='member-info__contacts'>
                    <a href={`mailto:${email}`}>
                      <EnvelopeIcon className='icon-envelope' />
                      <span>{email}</span>
                    </a>
                    <a href={`skype:${skype}`}>
                      <SkypeIcon className='icon-skype' />
                      {skype}
                    </a>
                    <a href={`tel:${mobilePhone.replace(/[\s()+]/, '')}`}>
                      <MobileIcon className='icon-mobile' />
                      <span>{mobilePhone}</span>
                    </a>
                  </div>
                  <div>
                    <p className='address'>
                      <AddressIcon className='icon-address' />
                      {address}
                    </p>
                    <hr />
                  </div>
                </div>
                <div className='member-info__additional-info'>
                  <FlexColumn>
                    <div>
                      <span className='list-key'>Sex:</span>
                      <span>{sex}</span>
                    </div>
                    <div>
                      <span className='list-key'>Birth date:</span>
                      <DateBadge date={birthDate} />
                    </div>
                  </FlexColumn>
                  <FlexColumn>
                    <div>
                      <span className='list-key'>Education:</span>
                      <span>{education}</span>
                    </div>
                    <div>
                      <span className='list-key'>University average score:</span>
                      <span>{universityAverageScore}</span>
                    </div>
                    <div>
                      <span className='list-key'>CT math score:</span>
                      <span>{mathScore}</span>
                    </div>
                  </FlexColumn>
                </div>
                <ButtonGroup>
                  <Button classMod='primary' link={`/members/${id}/progress`}>
                    <ProgressIcon className='icon-progress' />
                    <span>Progress</span>
                  </Button>
                  <Button classMod='primary' link={`/members/${id}/tasks`}>
                    <TasksIcon className='icon-tasks' />
                    <span>Tasks</span>
                  </Button>
                  {role === 'admin' && (
                    <>
                      <DialogButton
                        buttonClassMod='secondary'
                        buttonContent='Delete'
                        message={
                          <p>
                            Are you confident, you want to delete member <b>{firstName}</b> <b>{lastName}</b>?
                          </p>
                        }
                        confirmButtonClassMod='error'
                        confirmButtonContent='Delete'
                        dialogValue={id}
                        onSubmit={({ dialogValue }) => {
                          return Client.deleteMember(dialogValue);
                        }}
                      />
                      <Button content='Edit' classMod='secondary' onClick={openEditModal} />
                    </>
                  )}
                </ButtonGroup>
              </>
            )}
          </>
        ) : (
          <Spinner centered />
        )}
      </>
    );
  }
}

MemberInfo.defaultTypes = {
  edit: false,
};

MemberInfo.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  education: PropTypes.string.isRequired,
  universityAverageScore: PropTypes.number.isRequired,
  mathScore: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,

  handleClose: PropTypes.func,
  edit: PropTypes.bool,
  setEdit: PropTypes.string.isRequired,
};

export default MemberInfo;
