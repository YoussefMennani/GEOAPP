import { Badge, Button, Chip, IconButton } from '@mui/material'
import React, { useState } from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { deleteShape, handleChangeColorPolygon, updateShape } from '../../../slices/mapSlice';
import { useDispatch } from 'react-redux';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';


export const ShapePopUp = ({ polygoneData }) => {
    const disptach = useDispatch();
    const [shapeState, setShapeState] = useState({
        id: polygoneData.id,
        label: polygoneData.label,
        color: polygoneData.color
    })

    const handleChangeShape = (event, id) => {

        console.log("for ID " + id)
        const { name, value } = event.target;
        console.log(name + " => " + value)

        if (name == "color") {
            disptach(handleChangeColorPolygon({ id, color: value }))
        }
        setShapeState(prevState => ({
            ...prevState,
            id: id,
            [name]: value
        }));

    }


    const onClickDeleteShape = () => {
        disptach(deleteShape(shapeState.id))
    }

    const onClickUpdateShape = () => {
        console.log(shapeState)
        disptach(updateShape(shapeState))
    }



    return (
        <div style={{ width: "400px" }} >
            {/* <div className='row  my-2'  >
                <div className='col-sm-12 text-center'>
                    Deatils

                </div>
            </div>
            <hr className='m-0' /> */}

            <div className='row my-2' >
                <div className='col-sm-4'>
                    <Chip label="label" />

                </div>
                <div className='col-sm-8' style={{ margin: "auto 0 auto 0" }}>

                    <input
                        type="text"
                        id="label"
                        name="label"
                        className={`form-control `}
                        placeholder="Enter label"
                        value={shapeState.label}
                        onChange={(event) => handleChangeShape(event, polygoneData.id)}
                    />
                </div>
            </div>
            <div className='row my-2' >
                <div className='col-sm-4'>
                    <Chip label="Color" />
                </div>
                <div className='col-sm-8' style={{ margin: "auto 0 auto 0" }}>
                    <input className="form-control" name="color" type="color" value={polygoneData.color} onChange={(event) => handleChangeShape(event, polygoneData.id)} />
                </div>
            </div>
            <hr />
            <div className='row my-2' >
                <div className="col-sm-12 text-center" style={{ textAlign: "right" }} >


                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        size="small"
                        style={{ marginRight: "5px" }}
                        onClick={onClickDeleteShape}
                    >
                        Delete

                    </Button>

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        startIcon={<DoneIcon />}
                        size="small"
                        onClick={onClickUpdateShape}
                    >
                        save
                    </Button>



                </div>
            </div>

        </div>
    )
}
