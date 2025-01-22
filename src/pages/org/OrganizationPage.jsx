import React, { useEffect, useState } from 'react';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import { openModalDeleteDriver } from '../../slices/driverSlice';
import OrganizationCard from './OrganizationCard';
import { getOrganizationRootSlice, openModalAddOrganization, openModalAddOrganizationHeader, setTargetEntity } from '../../slices/organizationSlice';
import ModalAddMenuHeader from './modal/ModalAddMenuHeader';

const OrganizationPage = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const {  organizationRoot, status } = useSelector((state) => state.organization);
  const [entityState, setEntityState] = useState({
    name: "",
    description: "",
    menu: {}
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
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



  const onClickAddButton = () => {
    dispatch(setTargetEntity({id:null,name:null,id:null}))
    dispatch(openModalAddOrganizationHeader())
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
 

      <div style={{ padding: "20px 0px", backgroundColor: "white", borderRadius: "5px", padding: "20px",display:"flex",justifyContent:"flex-start",flexWrap:"wrap" }}>
        {
          organizationRoot.length > 0 ? (
            organizationRoot.map((organizationData) => <OrganizationCard key={organizationData.id} data={organizationData} />)
          ) : (
            <h3>No data found</h3>
          )
        }

      </div>
      {/* <MaterialReactTable columns={columns} data={listDrivers} state={{ isLoading: status != "succeeded" ? true : false }} />; */}
      <ModalAddMenuHeader/>

    </>
  );
};

export default OrganizationPage;
