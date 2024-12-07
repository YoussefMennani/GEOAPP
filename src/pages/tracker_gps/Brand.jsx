import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import BannerUpTable from '../layouts/BannerUpTable';
import ModalAddBrand from './modals/brand/ModalAddBrand';
import ModalConfirmDeletion from './modals/brand/ModalConfirmDeletion';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllBrandsSlice, openModalDeleteBrand, openModalEditBrand } from '../../slices/brandSlice';


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
        if (status === 'idle') {
          dispatch(getAllBrandsSlice());
        }
      }, [status, dispatch]);

      

    const onClickDeleteBrand = (brandIdTarget, brandNameTarget, originCountryTarget) => {
        console.log(brandIdTarget)
        setBrandState({
            brandId: brandIdTarget,
            brandName: brandNameTarget,
            originCountry: originCountryTarget
        })
        dispatch(openModalDeleteBrand())
    }


    const onClickUpdateBrand = (brandIdTarget, brandNameTarget, originCountryTarget) => {

        
        setBrandState({
            brandId: brandIdTarget,
            brandName: brandNameTarget,
            originCountry: originCountryTarget
        })
        setIsEdit(true)
        dispatch(openModalEditBrand())
        console.log(`Update row ${brandIdTarget}`);
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
                accessorKey: 'brandName',
                header: 'Brand Name',
                size: 150,
            },
            {
                accessorKey: 'originCountry',
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
                                onClickUpdateBrand(row.original.id, row.original.brandName, row.original.originCountry);
                            }}
                        >
                            <span className="tf-icons bx bxs-pencil"></span>
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalToggle"
                            onClick={() => onClickDeleteBrand(row.original.id, row.original.brandName, row.original.originCountry)}
                        >
                            <span className="tf-icons bx bx-trash"></span>
                        </button>

                        {/* <Button onClick={handleOpen}>Open modal</Button> */}


                    </div>
                ),
            },
        ],
        []
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
