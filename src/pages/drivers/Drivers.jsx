import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandsSlice, getAllModelsSlice, getAllTrackersSlice, openModalDeleteTracker, openModalEditTracker } from '../../slices/brandSlice';
import Badge from '../../components/atoms/Badges';
import ModalConfirmDeletion from './modals/ModalConfirmDeletion';
import ModalAddVehicle from './modals/ModalAddDriver';
import { getAllVehiclesSlice, openModalDeleteVehicle, openModalEditVehicle } from '../../slices/vehicleSlice';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { color, Stack } from '@mui/system';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FormatColorFillSharpIcon from '@mui/icons-material/FormatColorFillSharp';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import { Avatar, Fab, Icon, IconButton, Tooltip } from '@mui/material';
import ModalAddDriver from './modals/ModalAddDriver';
import { getAllDriversSlice, openModalDeleteDriver, openModalEditDriver } from '../../slices/driverSlice';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import Email from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import axios from 'axios';
import keycloak from '../../keycloak/keycloak';

const Drivers = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const { listDrivers, status } = useSelector((state) => state.drivers);
  const [entityState, setEntityState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "IAO",
    phoneNumber: "",
    address: "",
    cityOfBirth: "",
    birthDate: "",
    status: "",
    language: "",
    profileImage: null, // For file upload,
    attachement: "",
    licenses: [
    ]
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllDriversSlice());
    }
  }, [status, dispatch]);



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
      phoneNumber: "",
      address: "",
      cityOfBirth: "",
      status: "",
      language: "",
      profileImageUrl: null, // For file upload
      documentUrl: null
    })
  }

  const fetchFileUrl = async (filePath) => {
    try {
        // Make a GET request to the Spring Boot API
        const response = await axios.get(`http://localhost:8222/minio/retrieve-presigned-url/${filePath}`,{
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
        header: 'Full Name',
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
                    <div>{row.original.firstName + ' ' + row.original.lastName}</div>
                </div>
            );
        },
    },

      {
        accessorKey: 'organization',
        header: 'Organization',
        size: 100,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'phone',
        size: 100,
      },
      {
        accessorKey: 'rate',
        header: 'rate',
        size: 100,
        Cell: ({ row }) => {
          const rate = row.original.rate; // Access the `rate` value
          const maxStars = 5; // Define the maximum number of stars

          // Generate star icons
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(maxStars)].map((_, index) => (
                <span key={index}>
                  {index < rate ? (
                    <StarIcon style={{ color: 'gold' }} />
                  ) : (
                    <StarOutlineIcon style={{ color: 'gold' }} />
                  )}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: 'licenses',
        header: 'licenses',
        size: 50,
        Cell: ({ row }) => (
          row.original.licenses?.map((license) => {
            return (
              <Badge type="label-primary" rounded ><span style={{ fontSize: "14px" }}>{license.licenseClass}</span></Badge>

            )
          })


        ),
      },


      {
        accessorKey: 'email',
        header: 'email',
        size: 100,
        // Cell: ({ row }) => {
        //   return <Tooltip title={row.original.address}>
        //   <IconButton>
        //     <Email color='secondary' />
        //   </IconButton>
        // </Tooltip>
        // }
      },


      {
        accessorKey: 'address',
        header: 'address',
        size: 150,
        // Cell: ({ row }) => {
        //   return <Tooltip title={row.original.address}>
        //   <IconButton>
        //     <HomeIcon  color='primary'/>
        //   </IconButton>
        // </Tooltip>
        // }
      },
      {
        accessorKey: 'status',
        header: 'status',
        size: 100,
        Cell: ({ row }) => {
          return <Badge type={`label-${row.original.status == "Active" ? 'success' : row.original.status == "Mission" ? 'dark' : 'danger'
            }`}
            rounded><b>{row.original.status}</b></Badge>
        }
      },

      {
        accessorKey: 'available',
        header: 'available',
        size: 100,
        Cell: ({ row }) => {
          if (row.original.available == true) {
            return <Badge type={`label-info`} rounded><b>Available</b></Badge>
          } else {
            return <Badge type={`label-danger`} rounded><b>Occupied</b></Badge>
          }
        }
      },


      // {
      //   accessorKey: 'features',
      //   header: 'Features',
      //   size: 150,
      //   Cell: ({ row }) => (
      //     row.original.features && row.original.features.map( feature =>{

      //         return <Badge  type="label-dark"  rounded>{feature}</Badge>

      //     })

      //   )
      // },

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
        parentPath="Drivers"
        childPath="Drivers Manager"
        imageButton="bx bx-user-circle"
        labelButton="Add Driver"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddDriver entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmDeletion entity={entityState}
      />
      <MaterialReactTable columns={columns} data={listDrivers} state={{ isLoading: status != "succeeded" ? true : false }}
      />;
    </>
  );
};

export default Drivers;
