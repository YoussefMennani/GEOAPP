import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../../components/atoms/Badges';
import ModalConfirmDeletion from './modals/ModalConfirmDeletion';


import { getAllDriversSlice, openModalDeleteDriver, openModalEditDriver } from '../../slices/driverSlice';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import axios from 'axios';
import keycloak from '../../keycloak/keycloak';
import ModalAddUser from './modals/ModalAddUser';
import { getAllUsers } from '../../slices/userSlice';

const UserManager = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const { usersList, status } = useSelector((state) => state.user);
  const [entityState, setEntityState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: {},
    phoneNumber: "",
    profile: {},
    address: "",
    cityOfBirth: "",
    birthDate: "",
    status: "",
    language: "",
    profileImage: null, // For file upload,
    attachement: "",
    username: "",
    password: ""
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {

    dispatch(getAllUsers());
  }, [dispatch]);



  const onClickDeleteModel = (vehicleId, licensePlate) => {
    console.log(vehicleId, licensePlate)


    // Update the brand state
    setEntityState(prevState => ({
      ...prevState,
      id: vehicleId,
      licensePlate: licensePlate
    }));

    dispatch(openModalDeleteDriver())
  }


  const onClickUpdateModel = (id, licensePlate, modelVehicle, brandVehicle, year, color, fuelType, status, tracker) => {

    setEntityState({
      id: id,
      licensePlate: licensePlate,
      modelVehicle: modelVehicle,
      brandVehicle: brandVehicle,
      year: year,
      color: color,
      fuelType: fuelType,
      status: status,
      tracker: tracker.trackerId
    })
    setIsEdit(true)
    dispatch(openModalEditDriver())

  };


  const onClickAddButton = () => {
    dispatch(openModalEditDriver())
    clearState()
    setIsEdit(false)
  }

  const clearState = () => {
    setEntityState({
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      profile: "",
      phoneNumber: "",
      address: "",
      cityOfBirth: "",
      status: "",
      language: "",
      profileImageUrl: null, // For file upload
      documentUrl: null,
      username: "",
      password: ""
    })
  }

  const fetchFileUrl = async (filePath) => {
    try {
      // Make a GET request to the Spring Boot API
      const response = await axios.get(`http://localhost:8222/minio/retrieve-presigned-url/${filePath}`, {
        headers: { 'Authorization': `Bearer ${keycloak.token}` }
      });
      console.log(response.data)
      return response.data; // Set the pre-signed URL
    } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  };

  const columns = useMemo(
    () => [

      // modelId: "",
      // modelName: "",
      // features: "",
      // batteryLife: "",
      // networkType: "",
      // brand: "",



      {
        header: 'User',
        size: 150,
        Cell: ({ row }) => {
          const [imageUrl, setImageUrl] = useState('../assets/img/avatars/1.png'); // Default avatar

          useEffect(() => {
            if (row.original.profileImageUrl) {
              fetchFileUrl(row.original.profileImageUrl).then((url) => {
                if (url) setImageUrl(url); // Update image URL once resolved
              });
            }
          }, [row.original.profileImageUrl]);

          return (
            <div style={{ textAlign: 'center', display: 'table' }}>
              <div className="avatar" style={{ float: 'left' }}>
                <img
                  src={imageUrl}
                  className="w-px-40 h-auto rounded-circle"
                  alt="avatar-image"
                  aria-label="Avatar Image"
                />
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: 'fullname',
        header: 'FullName',
        size: 100,
        Cell: ({ row }) => ( <div>{row.original.firstName + ' ' + row.original.lastName}</div>),
      },
      {
        accessorKey: 'email',
        header: 'email',
        size: 100,
      },
      {
        accessorKey: 'organization',
        header: 'Organization',
        size: 100,
        Cell: ({ row }) => row.original.organization?.name || 'N/A',
      },
      {
        accessorKey: 'profile',
        header: 'profile',
        size: 100,
        Cell: ({ row }) => row.original.profile?.name || 'N/A',

      },

      {
        id: 'actions',
        header: 'actions',
        size: 100,
        Cell: ({ row }) => (
          <div class="d-grid gap-2 d-md-flex">


            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalCenter"
              onClick={() => {
                console.log("updating brand ....")
                onClickUpdateModel(row.original.id, row.original.licensePlate, row.original.modelVehicle, row.original.brandVehicle, row.original.year,
                  row.original.color, row.original.fuelType, row.original.status, row.original.tracker);

              }}
            >
              <span className="tf-icons bx bxs-pencil"></span>
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalToggle"
              onClick={() => onClickDeleteModel(row.original.id, row.original.licensePlate)}
            >
              <span className="tf-icons bx bx-trash"></span>
            </button>




          </div>
        ),
      },
    ],
    []
  );



  return (
    <>

      <BannerUpTable
        parentPath="Users"
        childPath="User Manager"
        imageButton="bx bx-user-circle"
        labelButton="Add User"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddUser entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmDeletion entity={entityState}
      />
      <MaterialReactTable columns={columns} data={usersList} state={{ isLoading: status != "succeeded" ? true : false }}
      />;
    </>
  );
};

export default UserManager;
