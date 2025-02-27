import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../../components/atoms/Badges';
import { getAllDriversSlice, openModalDeleteDriver, openModalEditDriver } from '../../slices/driverSlice';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import axios from 'axios';
import keycloak from '../../keycloak/keycloak';
import ModalAddProfil from './modals/ModalAddProfile';
import ModalConfirmProfilDeletion from './modals/ModalConfirmProfilDeletion';
import { getAllProfiles, getMenuProfilSlice, handleExpandMenu, openModaAddProfillMenu } from '../../slices/profilSlice';
import ProfileCard from './ProfileCard';
import { getOrganizationRootSlice } from '../../slices/organizationSlice';

const Drivers = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const { menuList, profilesList, status } = useSelector((state) => state.profil);
  const [entityState, setEntityState] = useState({
    name: "",
    description: "",
    role:"",
    menu: {},
    organization:""
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      // dispatch(getMenuProfilSlice("menu1"));
      dispatch(getAllProfiles());
      dispatch(getOrganizationRootSlice());

    }
  }, [status, dispatch]);



  const onClickDeleteModel = (vehicleId, licensePlate) => {
    console.log(vehicleId, licensePlate)


    // Update the brand state
    setEntityState(prevState => ({
      ...prevState,
      menu: menuList
    }));

    dispatch(openModalDeleteDriver())
  }


  const onClickUpdateModel = (id, name, description, role, menu, organization) => {
    console.log(id, name, description, role, menu, organization)
    setEntityState({
      id: id,
      name:name, 
      description:description,
      role:role,
      menu:menu, 
      organization:organization.id
    })
    setIsEdit(true)
    dispatch(openModaAddProfillMenu())
    dispatch(handleExpandMenu(menu))

  };


  const onClickAddButton = () => {
    dispatch(openModaAddProfillMenu())
    clearState()
    setIsEdit(false)
  }

  const clearState = () => {
    setEntityState({
      name: "",
      description: "",
      menu: "",
    })
  }


  return (
    <>
    
      <BannerUpTable
        parentPath="Profil"
        childPath="Profil Manager"
        imageButton="bx bxs-user-account"
        labelButton="Add Profil"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddProfil entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmProfilDeletion entity={entityState}
      />

      <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", padding: "20px",display:"flex",justifyContent:"flex-start",flexWrap:"wrap" }}>
        {
          profilesList.length > 0 ? (
            profilesList.map((profileData) => <ProfileCard key={profileData.id} data={profileData}  onClickUpdateModel={onClickUpdateModel} />)
          ) : (
            <h3>No data found</h3>
          )
        }

      </div>
      {/* <MaterialReactTable columns={columns} data={listDrivers} state={{ isLoading: status != "succeeded" ? true : false }} />; */}
    </>
  );
};

export default Drivers;
