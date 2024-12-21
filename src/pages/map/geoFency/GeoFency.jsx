import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import { closePanelShowPolygon, handleChangeColorPolygon } from '../../../slices/mapSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import { useMap } from 'react-leaflet';


const GeoFency = () => {
    
    const disptach = useDispatch();
    const { isOpenShowPolygonPanel, listPolygon } = useSelector((state) => state.map)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [colorPolygon, setColorPolygon] = useState("");
    const handleChangeColorPoly = (event, id) => {

        console.log(map)
        console.log("for ID " + id)
        const { name, value } = event.target;
        console.log(name + " => " + value)

        if (name == "color") {
            disptach(handleChangeColorPolygon({ id, color: value }))
        }
    }


    return (
        <>
            <button
                style={{
                    padding: '6px',
                    zIndex: '500',
                    position: 'absolute',
                    top: '12px',
                    right: '80px',
                    width: "55px",
                    background: "#ffffff",
                    borderRadius: "4px",
                    border: "2px solid rgb(198, 190, 167)"
                }}
            ><i class='bx bxs-shapes' style={{ fontSize: "30px", color: "gray" }}></i></button>


            <div
                style={{
                    // background: "red",
                    padding: '5px',
                    zIndex: '500',
                    position: 'absolute',
                    top: '150px',
                    right: '0px',
                    width: "600px",
                    boxShadow: 1,
                    display: isOpenShowPolygonPanel ? "block" : "none"
                }}
            >



                <div className="card h-100">
                    {/* <div style={{ display: "block" }}> */}
                    {/* <div className=" d-flex justify-content-between align-items-right" style={{ padding: "15px" }}>

                                <Typography gutterBottom variant="h6" component="div">
                                    GeoFency
                                </Typography>
                                <IconButton edge="end" color="inherit" onClick={closePanelShowPolygon} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </div> */}
                    <div className="row" style={{ padding: "10px 20px 0px 20px" }} >

                        <div className="col-sm-6" style={{ margin: "auto 0 auto 0", fontSize: "18px" }}>
                            GeoFency
                        </div>
                        <div className="col-sm-6" style={{ textAlign: "right" }} >
                            <IconButton edge="end" color="inherit" onClick={closePanelShowPolygon} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </div>

                    </div>
                    <hr style={{ margin: "0px" }} />

                    {listPolygon?.map((item) => (
                        <div className="row p-1 m-1 hover-gray" style={{ borderRadius: "5px" }} key={item.id}>  {/* Use item.id as the key */}
                            <div className="col-sm-1">
                                <Checkbox {...label} defaultChecked />
                            </div>
                            <div className="col-sm-4" style={{ margin: "auto 0 auto 0", fontSize: "16px", fontWeight: "bold" }}>
                                <Chip label={item.label} />
                            </div>
                            <div className="col-sm-4" style={{ margin: "auto 0 auto 0", fontSize: "16px" }}>
                                <input className="form-control" name="color" type="color" value={item.color} onChange={(event) => handleChangeColorPoly(event, item.id)} />
                            </div>
                            <div className="col-sm-3" style={{ textAlign: "right" }}>
                                <IconButton aria-label="delete" size="medium">
                                    <FormatShapesIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="medium">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    ))}


                    {/* </div> */}
                </div>

            </div>
        </>
    )
}

export default GeoFency