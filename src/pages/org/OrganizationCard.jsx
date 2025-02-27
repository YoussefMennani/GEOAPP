import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { deleteProfile } from '../../slices/profilSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteOrganization, getOrganizationDataForChart, getOrganizationRootSlice, openModalOrgChart } from '../../slices/organizationSlice';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import './css/OrganizationCard.css'; // Import CSS file for styles
import PolylineIcon from '@mui/icons-material/Polyline';
export default function OrganizationCard({ data }) {

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        await dispatch(deleteOrganization(id));
        dispatch(getOrganizationRootSlice())
    };

    const navigate = useNavigate();

    const handleClick = () => {
        const organizationData = data;
        navigate('/organization/organization_manager', { state: { organizationData } });
    };

    const handleClickTreeOrg = () => {
        // dispatch(getOrganizationDataForChart(data.id))
        dispatch(openModalOrgChart(data.id))

    };

    return (
        <Card
            sx={{
                margin: "30px",
                width: "280px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-10px)",
                },
            }}
        >            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image="/assets/img/orgPage.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ float: "right" }}>



                <IconButton color="primary" aria-label="add an alarm" onClick={handleClick} >
                    <RemoveRedEyeIcon />
                </IconButton>

                <IconButton color="primary" aria-label="add an alarm" onClick={handleClickTreeOrg} >
                    <PolylineIcon />
                </IconButton>
                <IconButton color="success" aria-label="add an alarm"  >
                    <AutoFixHighIcon />
                </IconButton>
                <IconButton color="warning" aria-label="add an alarm" onClick={() => handleDelete(data.id)} >
                    <DeleteIcon />
                </IconButton>

            </CardActions>
        </Card>

        // <div className="card-container">
        //     <div className="card-inner">
        //         {/* Front Side */}
        //         <div className="card-front">
        //             <Card sx={{ width: "280px" }}>
        //                 <CardMedia component="img" height="200" image="/assets/img/orgPage.jpg" alt="Organization" />
        //                 <CardContent>
        //                     <Typography gutterBottom variant="h5">{data.name}</Typography>
        //                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>{data.description}</Typography>
        //                 </CardContent>
        //             </Card>
        //         </div>

        //         {/* Back Side */}
        //         <div className="card-back">
        //             <Card sx={{ width: "280px", display: "flex", alignItems: "center", justifyContent: "center", height: "250px" }}>
        //                 <Typography variant="h5" sx={{ color: "black" }}>Hello World</Typography>
        //             </Card>
        //         </div>
        //     </div>
        // </div>
    );
}
