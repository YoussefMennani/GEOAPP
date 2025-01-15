import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../../components/atoms/Badges';
import { getAllDriversSlice, openModalDeleteDriver, openModalEditDriver } from '../../slices/driverSlice';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import axios from 'axios';
import keycloak from '../../keycloak/keycloak';
import { getAllProfiles, getMenuProfilSlice, openModaAddProfillMenu } from '../../slices/profilSlice';
import ProfileCard from './OrganizationCard';
import OrganizationCard from './OrganizationCard';
import ModalAddOrg from './modal/ModalAddOrg';
import { getOrganizationSlice, openModalAddOrganization } from '../../slices/organizationSlice';

const OrganizationPage = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const {  organizationList, status } = useSelector((state) => state.organization);
  const [entityState, setEntityState] = useState({
    name: "",
    description: "",
    menu: {}
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOrganizationSlice());
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



  const onClickAddButton = () => {
    dispatch(openModalAddOrganization())
    clearState()
    setIsEdit(false)
  }

  const clearState = () => {
    setEntityState({
      name: "",
      description: "",
      data:[],
    })
  }


  return (
    <>
    
      <BannerUpTable
        parentPath="Organization"
        childPath="Organization Manager"
        imageButton="bx bxs-user-account"
        labelButton="Add organization"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddOrg entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
 

      <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", padding: "20px",display:"flex",justifyContent:"space-between",flexWrap:"wrap" }}>
        {
          organizationList.length > 0 ? (
            organizationList.map((organizationData) => <OrganizationCard key={organizationData.id} data={organizationData} />)
          ) : (
            <h3>No data found</h3>
          )
        }

      </div>
      {/* <MaterialReactTable columns={columns} data={listDrivers} state={{ isLoading: status != "succeeded" ? true : false }} />; */}
    </>
  );
};

export default OrganizationPage;
