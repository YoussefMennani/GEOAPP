import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandsSlice, getAllModelsSlice, getAllTrackersSlice, openModalDeleteTracker, openModalEditTracker } from '../../slices/brandSlice';
import Badge from '../../components/atoms/Badges';
import ModalConfirmDeletion from './modals/ModalConfirmDeletion';
import ModalAddVehicle from './modals/ModalAddVehicle';
import { getAllVehiclesSlice, openModalDeleteVehicle, openModalEditVehicle } from '../../slices/vehicleSlice';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { color, Stack } from '@mui/system';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FormatColorFillSharpIcon from '@mui/icons-material/FormatColorFillSharp';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import { Fab, Icon } from '@mui/material';
const Vehicles = () => {

  const dispatch = useDispatch();
  // const { listTrackers } = useSelector((state) => state.trackers);
  const { listVehicles, status } = useSelector((state) => state.vehicles);
  const [entityState, setEntityState] = useState({
    id: "",
    licensePlate: "",
    modelVehicle: "",
    brandVehicle: "",
    year: "",
    color: "",
    fuelType: "",
    status: "",
    // currentDriver:"",
    // lastPosition:"",
    tracker: ""
  });



  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllTrackersSlice());
      dispatch(getAllVehiclesSlice())
      // dispatch(getAllBrandsSlice());
      // dispatch(getAllModelsSlice());

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

    dispatch(openModalDeleteVehicle())
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
    dispatch(openModalEditVehicle())

  };


  const onClickAddButton = () => {
    dispatch(openModalEditVehicle())
    clearState()
    setIsEdit(false)
  }

  const clearState = () => {
    setEntityState({
      id: "",
      licensePlate: "",
      modelVehicle: "",
      brandVehicle: "",
      year: "",
      color: "",
      fuelType: "",
      status: "",
      tracker: ""
    })
  }
  const columns = useMemo(
    () => [

      // modelId: "",
      // modelName: "",
      // features: "",
      // batteryLife: "",
      // networkType: "",
      // brand: "",

      {
        accessorKey: 'licensePlate',
        header: 'license Plate',
        size: 150,
      },
      {
        accessorKey: 'modelVehicle',
        header: 'model',
        size: 100,
      },
      {
        accessorKey: 'brandVehicle',
        header: 'brand',
        size: 150,
      },
      {
        accessorKey: 'isMoving',
        header: 'moving',
        size: 50,
        Cell: ({ row }) => (
          row.original.isMoving ?
            <span className="spinner-grow spinner-grow-sm text-success" role="status"></span> :
            <FiberManualRecordIcon sx={{ color: 'red' }} />
        ),
      },


      {
        accessorKey: 'year',
        header: 'year',
        size: 100,
      },

      {
        accessorKey: 'color',
        header: 'color',
        size: 150,
        Cell: ({ row }) => {
          return (
            <Badge type="label-secondary" rounded><ColorLensTwoToneIcon sx={{ color: `${row.original.color}` }} /></Badge>
          )
          // <ColorLensTwoToneIcon sx={{color:`${  row.original.color}`}}/>

        }
      },
      {
        accessorKey: 'fuelType',
        header: 'fuelType',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'status',
        size: 100,
        Cell: ({ row }) => {
          return <Badge type={`label-${row.original.status == "WORKING" ? 'success' : row.original.status == "INACTIVE" ? 'dark' : 'danger'
            }`}
            rounded><b>{row.original.status}</b></Badge>
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
        parentPath="Vehicle"
        childPath="Vehicle Manager"
        imageButton="bx bx-layer-plus"
        labelButton="Add Tracker"

        setIsEdit={setIsEdit}
        setModelState={setEntityState}

        onClickAddButton={onClickAddButton}

      />
      <ModalAddVehicle entityState={entityState} isEdit={isEdit} setEntityState={setEntityState} />
      <ModalConfirmDeletion entity={entityState}
      />
      <MaterialReactTable columns={columns} data={listVehicles} state={{ isLoading: status != "succeeded" ? true : false }}
      />;
    </>
  );
};

export default Vehicles;
