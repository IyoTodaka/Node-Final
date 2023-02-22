import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import PropTypes from 'prop-types';
import MainFeaturedPost from '../components/MainFeaturedPost'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import useLocalStorage from '../Hook/useLocalStorage'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate,useParams,useLocation } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { padding } from '@mui/system';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Node-Final
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SimpleDialog(props) {
    const { onClose, selectedValue, open,success } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{success=='true'?"Thank you":"MEGA BAD"}!</DialogTitle>
        <List sx={{ pt: 0 }}>
              <ListItemText primary={selectedValue} />
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

const theme = createTheme();

export default function Shopping() {
    const [products, setProducts] = useState([])
    const [cartOpened, setCartOpened] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartItem, setCartItem] = useLocalStorage("cartItems",[])
    const navigate = useNavigate();
    const params = useParams()
    const location=useLocation()

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    useEffect(()=>{
        let price =0
        cartItem.map((item)=>price=price+(item.price*item.count))
        setTotalPrice(price)
    },[cartItem])
    useEffect(() => {
      
        axios.get(import.meta.env.VITE_API_BASE_URL+"/api/products").then(({data})=>{
            setProducts(data)
        }).catch((err)=>(console.log(err)))
        const successParam=new URLSearchParams(location.search).get('success')
        console.log(successParam);
        if(successParam){
            setSuccess(successParam)
            if(successParam == 'true'){
                setSelectedValue("Your Purchase is completed!!")
            }else{
                setSelectedValue("Your Purchase is filed")
            }
            handleClickOpen()

        }
        
        
    }, [])
    const toggleDrawer = (opened) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setCartOpened(opened)
      };
    const mainFeaturedPost = {
        title: 'This is a Secret Magic Wand shop for maggles. ',
        description:
          "if you are not maggle, please turn out now.",
        image: '/shopheader.jpg',
        imageText: 'main image description',
        linkText: 'exit',
      };
      const list = () => (
        <Box
          sx={{ width:600, p:10}}
          role="presentation"
        //   onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          component="form"
          onSubmit={handleSubmit}
        >
          <List sx={{border:1}}>
            {cartItem.map((item, index) => (
              <ListItem key={item._id} disablePadding  sx={{p:1}}>
                <ListItemAvatar>
                    <Avatar alt="item capture" src={item.img} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemButton id={item._id}
                    onClick={(e)=>{
                        console.log(e.target.id);
                        setCartItem(cartItem.map((target)=>e.target.id===target._id?{...target, count:target.count+1}:target))
                    }}
                        
                >
                    +
                </ListItemButton>
                <ListItemText primary={item.count} />
                <ListItemButton id={item._id}
                    onClick={(e)=>{
                        let itemCount = 0
                        cartItem.map((target)=>{
                            if(e.target.id===target._id){
                                itemCount=target.count
                            }
                        })
                        if(itemCount>1){
                            setCartItem(cartItem.map((target)=>e.target.id===target._id?{...target, count:target.count-1}:target))
                        }else{
                            setCartItem(cartItem.filter((target)=>e.target.id!==target._id))
                        }
                    }}
                >
                    -
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{display: 'flex',flexDirection: 'column' }}>
            <Typography variant="h6" color="inherit" noWrap>
                Total:{totalPrice}
            </Typography>
            
            <Button type='submit' variant="contained" color="success"  >Checkout</Button>
          </Box>
        </Box>
      );


      const handleSubmit = (event) => {
        event.preventDefault();

        fetch(import.meta.env.VITE_API_BASE_URL+"/create-checkout-session", {
          method:"POST",
          body: JSON.stringify(cartItem),
          headers: { "Content-Type":"application/json"}
        }).then(async response => {
            // console.log(">>>>> ", response)
            if(!response.ok){
                if(response.status === 400) setError("Missing credentials")
                else if(response.status === 404) setError("Invalid email and/or password")
            }else{
                const data = await response.json()
                console.log(data) //save this token in a global state
                setCartItem([])
                window.location.href=data.url
            }
        }).catch(error => {
            console.log(error);
        })
    
      };
  return (
      <ThemeProvider theme={theme}>
        <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        success={success}
        />
      <CssBaseline />
      <AppBar position="relative">
            <Typography variant="h6" color="inherit" noWrap  sx={{px: 10, fontSize:35 }}>
                ollivander's wands shop
            </Typography>
            <Stack display="flex" direction="row" justifyContent="flex-end" alignItems="center" spacing={3}  mr={10}>
                <Button variant="contained" color="success" href="/login" >Login</Button>
                <Button variant="contained" color="success" href="/register" >Regist</Button>
                <IconButton aria-label="show 4 new mails" color="inherit" onClick={toggleDrawer(true)}>
                    <Badge badgeContent={cartItem.length} color="error">
                        <ShoppingCartIcon sx={{ fontSize: 40 }}/>
                    </Badge>
                </IconButton>
            </Stack>
    </AppBar>
    <main>
    <SwipeableDrawer
        anchor='right'
        open={cartOpened}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
        {list()}
    </SwipeableDrawer>
    <MainFeaturedPost post={mainFeaturedPost}  />
    <Container sx={{px: 20 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={5}>
            {products.map((product) => (
              <Grid item key={product._id} md={4}>
                <Card
                  sx={{ height: '100%',width:'100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '15%',
                    }}
                    image={product.img}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography>
                        {product.detail}
                    </Typography>
                  </CardContent>
                    <Typography sx={{fontWeight: 'bold', fontSize: 20,m:2 }}>
                        ${product.price}
                    </Typography>
                  <CardActions>
                    <Button size="small" onClick={()=>{
                        let existItem = false
                        const addItem = {...product, count:1}
                        cartItem.map((item)=>{
                            if(item._id==product._id){
                                existItem=true
                            } 
                        })
                        existItem?
                            setCartItem(cartItem.map((item)=>item._id===product._id?{...item, count:item.count+1}:item))
                            :setCartItem([...cartItem, addItem])
                    }}>Add Item
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
         
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          I am wondering if I should buy Hogwarts Legacy.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}