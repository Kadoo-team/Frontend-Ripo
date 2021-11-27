import React,{useEffect,useState} from 'react' ;
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProductIcon2 from "../productIcon/productIcon2";
import "./ShowProduct.css";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));

  function ShowPlants(props){
    
      return(
        <div className="showProductsBack">
        <Box className="wrapper" sx={{ width: '100%' }}>
        <div className="showProductSubs">
          Plants
        </div>
        <Grid  container spacing={2}>
          {props.data.map(
            p => 
            <Grid  item xs={12} sm={4} md={3}>
            <Item className="showProductsIcons">
              <ProductIcon2 key = {p.id} product={p}/>
            </Item>
          </Grid>
          )}
        </Grid>
        </Box>
      </div>
      );
  }
  
  export default ShowPlants;