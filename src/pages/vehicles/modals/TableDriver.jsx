import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { getAllDriversSlice, openModalDeleteDriver } from '../../../slices/driverSlice';
import Badge from '../../../components/atoms/Badges';
import { assignDriverSlice } from '../../../slices/vehicleSlice';

const TableDriver = ({ vehicleId }) => {
    const dispatch = useDispatch();

    const { listDrivers, status } = useSelector((state) => state.drivers);

    useEffect(() => {
        dispatch(getAllDriversSlice());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllDriversSlice());
        }
    }, [status, dispatch]);

    const assignDriverToVehicle = async (vehicleId, driverId) => {
        console.log(vehicleId + "  =========>  " + driverId);
        await dispatch(assignDriverSlice({ vehicleId, driverId }));
    };

    const filteredDrivers = useMemo(() => {
        return listDrivers.filter((driver) => driver.status === "Active" && driver.available == true);
    }, [listDrivers]);

    const columns = useMemo(
        () => [
            {
                header: 'Full Name',
                size: 150,
                Cell: ({ row }) => (
                    <div style={{ textAlign: "center", display: "table" }}>
                        <div className="avatar" style={{ float: "left" }}>
                            <img
                                src={row.original.profileImageUrl ?? "../assets/img/avatars/1.png"}
                                className="w-px-40 h-auto rounded-circle"
                                alt="avatar-image"
                                aria-label="Avatar Image"
                            />
                        </div>
                        <div>{`${row.original.firstName} ${row.original.lastName}`}</div>
                    </div>
                ),
            },
            {
                accessorKey: 'organization.name',
                header: 'Organization',
                size: 100,
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Phone',
                size: 100,
            },
            {
                accessorKey: 'rate',
                header: 'Rate',
                size: 100,
                Cell: ({ row }) => {
                    const rate = row.original.rate;
                    const maxStars = 5;

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
                header: 'Licenses',
                size: 50,
                Cell: ({ row }) =>
                    row.original.licenses?.map((license, index) => (
                        <Badge key={index} type="label-primary" rounded>
                            <span style={{ fontSize: "14px" }}>{license.licenseClass}</span>
                        </Badge>
                    )),
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
            {
                id: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <div className="d-grid gap-2 d-md-flex">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalToggle"
                            onClick={() => assignDriverToVehicle(vehicleId, row.original.id)}
                        >
                            <i className='bx bx-intersect'></i> LINK
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={filteredDrivers}
            state={{ isLoading: status !== "succeeded" }}
            initialState={{
                pagination: { pageSize: 4, pageIndex: 0 },
            }}
            enablePagination={true}
        />
    );
};

export default TableDriver;