import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import ModalAddBrand from './modals/brand/ModalAddBrand';
import ModalConfirmDeletion from './modals/brand/ModalConfirmDeletion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrackers, openModalDeleteBrand, openModalEditBrand } from '../../slices/trackerSlice';


const data = [
    {
        _id: 1,
        origin_country: '261 Erdman Ford',
        brand_name: 'East Daphne',
    },

];



const Brand = () => {

    const dispatch = useDispatch();
    const { listBrand,status } = useSelector((state) => state.trackers.brand);

    const [brandState, setBrandState] = useState({
        brandId: "",
        brandName: "",
        originCountry: ""
    });

    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        console.log(" use Effecte ",status)
        if (status === 'idle') {
          dispatch(getAllTrackers());
          console.log(listBrand)
        }
      }, [status, dispatch]);

      

    const onClickDeleteBrand = (brandIdTarget, brandNameTarget, originCountryTarget) => {
        setBrandState({
            brandId: brandIdTarget,
            brandName: brandNameTarget,
            originCountry: originCountryTarget
        })
        dispatch(openModalDeleteBrand())
    }


    const onClickUpdateBrand = (brandIdTarget, brandNameTarget, originCountryTarget) => {

        setIsEdit(true)
        dispatch(openModalEditBrand())
        console.log(`Update row ${brandIdTarget}`);
        setBrandState({
            brandId: brandIdTarget,
            brandName: brandNameTarget,
            originCountry: originCountryTarget
        })
    };


    const onClickAddButton = () =>{
        dispatch(openModalEditBrand())
            setBrandState({
              brandId: "",
              brandName: "",
              originCountry: ""
          })
            setIsEdit(false)
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'brand_name',
                header: 'Brand Name',
                size: 150,
            },
            {
                accessorKey: 'origin_country',
                header: 'Origin Country',
                size: 150,
            },

            {
                id: 'actions',
                header: 'Actions',
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
                                onClickUpdateBrand(row.original._id, row.original.brand_name, row.original.origin_country);
                            }}
                        >
                            <span className="tf-icons bx bxs-pencil"></span>
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalToggle"
                            onClick={() => onClickDeleteBrand(row.original._id, row.original.brand_name, row.original.origin_country)}
                        >
                            <span className="tf-icons bx bx-trash"></span>
                        </button>

                        {/* <Button onClick={handleOpen}>Open modal</Button> */}


                    </div>
                ),
            },
        ],
        [listBrand]
    );



    return (
        <>

            <BannerUpTable
                parentPath="Gps Tracker"
                childPath="Brand"
                imageButton="bx bx-layer-plus"
                labelButton="Add Brand"
                
                setIsEdit={setIsEdit}
                setBrandState={setBrandState}

                onClickAddButton= {onClickAddButton}
                
            />
            <ModalAddBrand  brandState={brandState} isEdit={isEdit} setBrandState={setBrandState} />
            <ModalConfirmDeletion brand={brandState}
            />
            <MaterialReactTable columns={columns} data={listBrand}   state={{ isLoading: status != "succeeded" ? true:false }}
 />;
        </>
    );
};

export default Brand;
