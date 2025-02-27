import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Stack, IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function CardPlan({ plan, onEdit, onDelete }) {
    return (
        <Card
            sx={{
                p: 3,
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 3,
                border: "1px solid #E0E0E0",
                position: "relative",
                width: "300px",
                margin: "10px",
                transition: "transform 0.3s ease-in-out",
                background: "#fbfbfb",
                "&:hover": {
                    transform: "translateY(-10px)",
                    border: "1px solid #2962FF",
                },
            }}
        >
            <Avatar sx={{ width: 56, height: 56, bgcolor: "rgb(241 245 249)", margin: "auto" }}>
                <StarBorderIcon color="primary" />
            </Avatar>

            <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary" mb={5}>
                    {plan.name}
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary"  mb={2} >
                    {plan.price} <span style={{color:"GrayText",fontSize:"16px"}}>MAD</span>
                </Typography> 
                <Typography variant="body2" color="text.secondary" mb={5}>
                    per year
                </Typography>

                <div style={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 'h6.fontSize' }} mb={1}>
                        <CheckCircleIcon fontSize="small" color="primary" />  <b>{plan.vehicles}</b> Vehicles
                    </Typography>
                    <Typography sx={{ fontSize: 'h6.fontSize' }} mb={1}>
                        <CheckCircleIcon fontSize="small" color="primary" />  <b>{plan.gpsTrackers}</b> Trackers
                    </Typography>
                    <Typography sx={{ fontSize: 'h6.fontSize' }} mb={1}>
                        <CheckCircleIcon fontSize="small" color="primary" />  <b>{plan.users}</b> Users
                    </Typography>
                </div>
            </CardContent>

            <Stack direction="row" spacing={2} justifyContent="space-between" mt={2}>
                <IconButton
                    sx={{ width: 56, height: 56, bgcolor: "rgb(241 245 249)" }}
                    onClick={onEdit} // Trigger the edit function
                >
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton
                    sx={{ width: 56, height: 56, bgcolor: "rgb(241 245 249)" }}
                    onClick={onDelete} // Trigger the delete function
                >
                    <DeleteIcon color="warning" />
                </IconButton>
            </Stack>
        </Card>
    );
}

export default CardPlan;