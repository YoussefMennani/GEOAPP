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

export default function ProfileCard({ data }) {

    const dispatch = useDispatch(); 
    const handleDeleteProfile = (idProfile) => {
        dispatch(deleteProfile(idProfile))
    }

    return (
        <Card sx={{ margin:"5px",width:"280px"}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image="/assets/img/profilePage.jpg"
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

                <IconButton color="primary" aria-label="add an alarm"  >
                    <RemoveRedEyeIcon />
                </IconButton>
                <IconButton color="success" aria-label="add an alarm"  >
                    <AutoFixHighIcon />
                </IconButton>
                <IconButton color="warning" aria-label="add an alarm"  onClick={()=>handleDeleteProfile(data.id)} >
                    <DeleteIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
}
