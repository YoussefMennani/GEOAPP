import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import sockjs from "sockjs-client/dist/sockjs";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import SockJS from 'sockjs-client';

import { IconButton, Badge, List, ListItem, ListItemText, Typography, Box, Avatar, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddNotificationList, handleReadNotification, handleTooggleDropdownMenu } from '../slices/notificationSlice';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';


const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  const { notificationList, unreadNotification, isDropdownMenuVisibe } = useSelector((state) => state.notification)
  const { preferred_username } = useSelector((state) => state.user.userState)

  useEffect(() => {
    // Set up the STOMP client with SockJS
    const client = new Client({
      webSocketFactory: () => new sockjs('http://localhost:8096/ws'),
      debug: (str) => { console.log(str); },
      onConnect: () => {
        console.log("Notification request sent for URL : ['/user/"+preferred_username+"/notifications']")
        client.subscribe('/user/'+preferred_username+'/notifications', (message) => {
          const notification = JSON.parse(message.body);
          console.log(notification);
          dispatch(handleAddNotificationList(notification))
        });3
      },
      onError: () => {
        console.error('Error while connecting to WebSocket');
      }
    });

    // Activate the client
    client.activate();

    // Cleanup on component unmount
    return () => client.deactivate();
  }, []);


  const shapeStyles = { bgcolor: '#5856d6', width: 40, height: 40 };
  const shapeCircleStyles = { borderRadius: '50%' };


  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} >
      <IconButton >
        <Badge badgeContent={unreadNotification} color="warning" anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
          <NotificationsActiveIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
    </Box>
  );

  function formatTimestamp(timestamp) {
    // Create a Date object from the timestamp
    let date = new Date(timestamp);

    // Extract date components
    let day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0'); // Ensure 2 digits for hours
    let minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2 digits for minutes

    // Return the formatted date as "dd/mm/yyyy hh:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const onClickTooggleDropdownMenu = () => {
    dispatch(handleTooggleDropdownMenu());
  }


  const onClickReadNotification = (timestamp)=>{
    dispatch(handleReadNotification(timestamp))
  }

  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a aria-label='toggle for sidebar' className="nav-item nav-link px-0 me-xl-4" href="#">

        <Badge onClick={onClickTooggleDropdownMenu} >
          {circle}
        </Badge>
      </a>
      {isDropdownMenuVisibe && <ul className="dropdown-menu dropdown-menu-end notofication-ul"
        style={{
          position: 'fixed',
          right: 0,
          maxHeight: 500,
          overflowY: "auto",
          overflowX: "hidden",
          display: "block"

        }}
      >


        {
          unreadNotification <= 0 ?
            (
              <li style={{ width: "500px", margin: "5px", borderRadius: "5px" }}>
                <img src='../assets/img/icons/no_notif.jpg' 
                 style={{ width: "100%", height: "auto", borderRadius: "5px" }} 
                />
              </li>
            )
            :
            notificationList?.map((alert, index) => (
              alert.notificationStatus == "UNREAD" && <div style={{ width: "550px", background: "rgb(255 118 118 / 15%)", margin: "5px", padding: "5px", borderRadius: "5px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(245 245 249)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(255 118 118 / 15%)")}
              >
                <IconButton aria-label="delete" size="small" style={{ right: 10, position: "absolute" }} onClick={()=> onClickReadNotification(alert.timestamp)}>
                  <CloseIcon />
                </IconButton>
                <div class="row p-2 mt-2" >
                  <div class="col-sm-2" >
                    <Avatar alt="Remy Sharp" src="../assets/img/vehicleImage/punto.jpeg" sx={{ width: 56, height: 56, float: "right" }} />
                  </div>
                  <div class="col-sm-10" style={{ paddingLeft: "0px" }} >
                    {
                      Object.entries(alert.listAlert).map(([key, value]) => (
                        <p key={key} style={{ wordWrap: 'break-word', whiteSpace: 'normal', margin: '0.5rem 0' }}>
                          <b><span className="m-1 badge bg-label-secondary">{key}</span>:</b> {value}

                        </p>
                      ))
                    }
                  </div>

                </div>
                <div class="row">

                  <div class="col-sm-12">
                    {/* <small className="text-muted"> <Chip avatar={<FmdBadIcon />} label="Avatar" /></small> */}
                    <small className="text-muted"> <Chip avatar={<CarCrashIcon />} label={alert.licensePlate} /></small>

                    <small className="text-muted" style={{ float: "right" }}> <Chip avatar={<InsertInvitationIcon/>} label={formatTimestamp(alert.timestamp)} /></small>
                  </div>
                </div>
              </div>


            ))
        }




        {/* <li style={{width:"500px"}}>
          <a aria-label='go to profile' className="dropdown-item" href="#">
            <div className="d-flex">
              <div className="flex-shrink-0 me-3">
                <div className="avatar avatar-online">
                  <img src="../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" alt='avatar-image' aria-label='Avatar Image' />
                </div>
              </div>
              <div className="flex-grow-1">
                <span className="fw-medium d-block">John Doe</span>
                <small className="text-muted">Admin</small>
              </div>
            </div>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a aria-label='go to profile' className="dropdown-item" href="#">
            <i className="bx bx-user me-2"></i>
            <span className="align-middle">My Profile</span>
          </a>
        </li>
        <li>
          <a aria-label='go to setting' className="dropdown-item" href="#">
            <i className="bx bx-cog me-2"></i>
            <span className="align-middle">Settings</span>
          </a>
        </li>
        <li>
          <a aria-label='go to billing' className="dropdown-item" href="#">
            <span className="d-flex align-items-center align-middle">
              <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
              <span className="flex-grow-1 align-middle ms-1">Billing</span>
              <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
            </span>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a aria-label='click to log out' className="dropdown-item" href="#">
            <i className="bx bx-power-off me-2"></i>
            <span className="align-middle">Log Out</span>
          </a>
        </li> */}
      </ul>}
    </li>
  );
};

export default Notification;
