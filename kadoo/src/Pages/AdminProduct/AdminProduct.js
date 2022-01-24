import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import AppBar from '../../Components/AppBar/AppBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@mui/styles'
import Skeleton from '@mui/material/Skeleton'

import Image from 'mui-image'
import UploadIcon from '@mui/icons-material/Upload'
import PublishIcon from '@mui/icons-material/Publish'

import AddIcon from '@mui/icons-material/Add'
import Theme from '../../Theme/ThemeGenerator'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { styled } from '@mui/material/styles'

import './AdminProduct.css'

const useStyles1 = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}))

const kind = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'plant',
    label: 'Plant',
  },
  {
    value: 'tool',
    label: 'Tool',
  },
]

const light = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'much',
    label: 'Much',
  },
]

const water = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'much',
    label: 'Much',
  },
]

const growthRate = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'much',
    label: 'Much',
  },
]

const environment = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'tropical',
    label: 'Tropical',
  },
  {
    value: 'cold',
    label: 'Cold',
  },
]

export default function NewUser(props) {
  const initialFormData = Object.freeze({
    kind: '',
    id: '',
    name: '',
    description: '',
    count: '',
    image: '',
    price: '',
    kind: '',
    environment: '',
    water: '',
    light: '',
    growthRate: '',
  })
  const [numberOfBuy, setNumberOfBuy] = React.useState(0)
  const [productId, setProductId] = React.useState('')
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [formData, updateFormData] = React.useState(initialFormData)
  const classes = useStyles1()
  const [preview, setPreview] = React.useState(null)

  const handleCapture = (event) => {
    setSelectedFile(event.target.files[0])
  }

  useEffect(() => {
    // create the preview
    if (selectedFile != null) {
      console.log(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  useEffect(() => {
    // create the preview
    if (formData != initialFormData) {
      if (selectedFile === null) {
        setPreview(formData.image)
        setNumberOfBuy(formData.count)
      }
    }
  }, [formData])

  useEffect(() => {
    setProductId(props.match.params.productId)
  }, [])

  function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], fileName, { type: mimeType })
      })
  }

  useEffect(() => {
    if (formData !== initialFormData) {
      srcToFile(
        'http://127.0.0.1:8000' + formData.image,
        'file.jpg',
        'image/jpg'
      ).then((file) => {
        console.log(file)
        console.log(formData)
        setSelectedFile(file)
      })
    }
  }, [formData])

  useEffect(() => {
    console.log('dsaaaaaaaaaaa')
    if (productId !== '') {
      fetch(
        'http://127.0.0.1:8000/api/plantsRUD/' +
          props.match.params.productId +
          '/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + localStorage.getItem('access_token'),
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log(data)
              updateFormData(data)
            })
          } else {
            throw res
          }
        })
        .catch((err) => {
          if (err.status === 404) {
            fetch(
              'http://127.0.0.1:8000/api/toolsRUD/' +
                props.match.params.productId +
                '/',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'JWT ' + localStorage.getItem('access_token'),
                },
              }
            ).then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  console.log(data)
                  updateFormData(data)
                })
              }
            })
          }
        })
    }
  }, [productId])

  const handleSubmit = () => {
    console.log(formData.album)
    console.log('[' + formData.tags.map((x) => '"' + x + '"').toString() + ']')
    const Data = new FormData()
    Data.append('id', formData.id)
    Data.append('name', formData.name)
    Data.append('description', formData.description)
    Data.append('count', numberOfBuy)
    Data.append('price', formData.price)
    Data.append('kind', formData.kind)
    Data.append('environment', formData.environment)
    Data.append('water', formData.water)
    Data.append('light', formData.light)
    Data.append('growthRate', formData.growthRate)
    Data.append('image', selectedFile, selectedFile.name)
    /*Data.append(
      'tags',
      '[' + formData.tags.map((x) => '"' + x + '"').toString() + ']'
    )
    Data.append('album', formData.album)*/

    //console.log(formData)
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
      },
      body: Data,
    }

    fetch(
      'http://127.0.0.1:8000/api/plantsRUD/' +
        props.match.params.productId +
        '/',
      requestOptions
    )
      .then(async (response) => {
        if (response.status === 200) {
          let isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
          let data = isJson ? await response.json() : null
          alert('Updated Successfully')
        } else {
          throw response
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          fetch(
            'http://127.0.0.1:8000/api/toolsRUD/' +
              props.match.params.productId +
              '/',
            requestOptions
          ).then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                console.log(data)
                alert('Updated Successfully')
              })
            }
          })
        }
      })
  }
  var increaseBought = () => {
    var nob = numberOfBuy
    setNumberOfBuy(nob + 1)
  }
  var decreaseBought = () => {
    var nob = numberOfBuy
    if (nob > 0) {
      setNumberOfBuy(nob - 1)
    }
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }
  // const [currency, setCurrency] = React.useState("EUR");

  // const [value, setValue] = React.useState(null);
  // const initialPrimaryFormData = Object.freeze({
  //   name: "",
  //   lastName: "",
  //   userName: "",
  //   email: "",
  //   password: "",
  // });
  // const initialSecondaryFormData = Object.freeze({
  //   birth_date: "",
  //   degree: "",
  //   major: "",
  //   phone_number: "",
  //   about: "",
  //   address: "",
  // });
  // const [formData, updateFormData] = useState(initialPrimaryFormData);
  // const [secondaryFormData, updateSecondaryFormData] = useState(
  //   initialSecondaryFormData
  // );
  // const [errorData, updateErrorData] = useState(initialPrimaryFormData);
  // const [secondaryerrorData, updateSecondaryErrorData] = useState(
  //   initialSecondaryFormData
  // );
  // const [refresh, setRefresh] = useState(false);
  // const [primaryConfirmation, setPrimaryConfirmation] = useState(false);
  // const [primaryAccepted, setPrimaryAccepted] = useState(false);
  // const [id, setId] = useState("");

  // useEffect(() => {
  //   if (id != "") {
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       birth_date: "",
  //     });
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       degree: "",
  //     });
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       major: "",
  //     });
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       phone_number: "",
  //     });
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       about: "",
  //     });
  //     updateSecondaryErrorData({
  //       ...errorData,
  //       address: "",
  //     });
  //     console.log(errorData);

  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id_code: "",
  //         is_online: true,
  //         rate: 0,
  //         birth_date: secondaryFormData.birth_date,
  //         degree: secondaryFormData.degree,
  //         major: secondaryFormData.major,
  //         phone_number: secondaryFormData.phone_number,
  //         about: secondaryFormData.about,
  //         address: secondaryFormData.address,
  //       }),
  //     };
  //     console.log(requestOptions.body);
  //     fetch(
  //       "http://127.0.0.1:8000/api/specialist/update-secondary/" + id + "/",
  //       requestOptions
  //     )
  //       .then((response) => {
  //         if (response.status === 200) {
  //           alert("Specialist registered!");
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .catch((err) => {
  //         err.text().then((errorMessage) => {
  //           const errors = JSON.parse(errorMessage);
  //           console.log("e " + errors.email);

  //           if (errors.birth_date !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               birth_date: errors.birth_date,
  //             });
  //             return;
  //           }

  //           if (errors.degree !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               degree: errors.degree,
  //             });
  //             return;
  //           }

  //           if (errors.major !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               major: errors.major,
  //             });
  //             return;
  //           }

  //           if (errors.phone_number !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               phone_number: errors.phone_number,
  //             });
  //             return;
  //           }

  //           if (errors.about !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               about: errors.about,
  //             });
  //             return;
  //           }

  //           if (errors.address !== undefined) {
  //             updateSecondaryErrorData({
  //               ...secondaryerrorData,
  //               address: errors.address,
  //             });
  //             return;
  //           }
  //         });
  //       });
  //   }
  // }, [primaryConfirmation, id]);

  // const handleChange = (e) => {
  //   updateFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value.trim(),
  //   });
  //   updateErrorData({
  //     ...errorData,
  //     [e.target.name]: "",
  //   });
  //   console.log(formData);
  // };

  // useEffect(() => {
  //   console.log(secondaryFormData);
  // }, [secondaryFormData]);

  // const handleChangeSecondary = (e) => {
  //   updateSecondaryFormData({
  //     ...secondaryFormData,
  //     [e.target.name]: e.target.value.trim(),
  //   });
  //   updateSecondaryErrorData({
  //     ...secondaryerrorData,
  //     [e.target.name]: "",
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!primaryAccepted) {
  //     console.log(formData);
  //     console.log(
  //       JSON.stringify({
  //         email: formData.email,
  //         user_name: formData.userName,
  //         first_name: formData.name,
  //         last_name: formData.lastName,
  //         password: formData.password,
  //       })
  //     );

  //     updateErrorData({
  //       ...errorData,
  //       name: "",
  //     });
  //     updateErrorData({
  //       ...errorData,
  //       lastName: "",
  //     });
  //     updateErrorData({
  //       ...errorData,
  //       userName: "",
  //     });
  //     updateErrorData({
  //       ...errorData,
  //       email: "",
  //     });
  //     updateErrorData({
  //       ...errorData,
  //       password: "",
  //     });
  //     console.log(errorData);

  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         user_name: formData.userName,
  //         first_name: formData.name,
  //         last_name: formData.lastName,
  //         password: formData.password,
  //       }),
  //     };
  //     fetch("http://127.0.0.1:8000/api/specialist/register/", requestOptions)
  //       .then(async (response) => {
  //         if (response.status === 201) {
  //           let isJson = response.headers
  //             .get("content-type")
  //             ?.includes("application/json");
  //           let data = isJson ? await response.json() : null;
  //           console.log("1");
  //           console.log(data);
  //           setId(data.id);

  //           setPrimaryConfirmation(primaryConfirmation ? false : true);
  //           setPrimaryAccepted(true);
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .catch((err) => {
  //         err.text().then((errorMessage) => {
  //           const errors = JSON.parse(errorMessage);
  //           console.log("e " + errors.email);

  //           if (errors.email !== undefined) {
  //             updateErrorData({
  //               ...errorData,
  //               email: errors.email,
  //             });
  //             return;
  //           }

  //           if (errors.user_name !== undefined) {
  //             updateErrorData({
  //               ...errorData,
  //               userName: errors.user_name,
  //             });
  //             return;
  //           }

  //           if (errors.first_name !== undefined) {
  //             updateErrorData({
  //               ...errorData,
  //               name: errors.first_name,
  //             });
  //             return;
  //           }

  //           if (errors.last_name !== undefined) {
  //             updateErrorData({
  //               ...errorData,
  //               lastName: errors.last_name,
  //             });
  //             return;
  //           }

  //           if (errors.password !== undefined) {
  //             updateErrorData({
  //               ...errorData,
  //               password: errors.password,
  //             });
  //             return;
  //           }
  //         });
  //       });
  //   } else {
  //     setPrimaryConfirmation(primaryConfirmation ? false : true);
  //   }
  // };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{ height: '100%' }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          pl: { xs: 2, md: 5 },
          pr: { xs: 2, nd: 5 },
          pt: { xs: 10, sm: 3, md: 0 },
        }}
        style={{ height: '100%' }}
      >
        <Grid item container>
          <Grid
            container
            item
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 0 }}
            className='ProductPageProductContainer'
          >
            <Grid
              item
              xs={12}
              md={5}
              lg={5}
              container
              justifyContent='center'
              alignItems='center'
              sx={{
                height: { xs: 'auto', md: '70vh' },
              }}
            >
              <Card
                sx={{
                  boxShadow: 2,
                  height: { xs: 'auto', md: '70vh' },
                  width: '100%',
                }}
                className='ProductPageImageContainer'
              >
                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    height: { xs: 'auto', md: '70vh' },
                    pb: { xs: 0, md: 0 },
                  }}
                >
                  <Grid item container className='blurred'>
                    <Image
                      src={preview}
                      width='100%'
                      height='100%'
                      fit='cover'
                    />
                  </Grid>
                  <Grid
                    className='front'
                    item
                    container
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid
                      container
                      item
                      justifyContent='center'
                      alignItems='center'
                      direction='row'
                      className='widthResize'
                      sx={{ mr: { md: 1.5, xs: 0 } }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={10}
                        alignItems='center'
                        justifyContent='center'
                        sx={{
                          display: 'flex',
                          height: { xs: '70%', md: '100%' },
                        }}
                      >
                        <Image
                          src={preview}
                          className='mainImage'
                          shift='bottom'
                          shiftDuration={320}
                          fit='cover'
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent='center'
                        sx={{ mt: 1 }}
                      >
                        <input
                          accept='image/jpeg'
                          className={classes.input}
                          id='faceImage'
                          type='file'
                          onChange={handleCapture}
                        />
                        <Tooltip title='Select Image'>
                          <label htmlFor='faceImage'>
                            <Button
                              variant='contained'
                              component='span'
                              startIcon={<UploadIcon />}
                            >
                              Upload
                            </Button>
                          </label>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              lg={7}
              sx={{ p: 2, ml: { xs: 0, md: -5 }, mt: { xs: -4.5, md: 0 } }}
              className='BringFront'
            >
              <Card sx={{ boxShadow: 3 }}>
                <Grid container spacing={1} sx={{ p: 3 }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className='ProductPageTitle'
                  >
                    <Typography
                      variant='h5'
                      sx={{ pb: 2 }}
                      className='PlantPageTitle'
                    >
                      Product Information
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className='ProductPageTitle'
                    sx={{ m: 1 }}
                  >
                    <TextField
                      fullWidth
                      label='Name'
                      id='name'
                      name='name'
                      onChange={handleChange}
                      value={formData.name}
                    />
                    <Divider sx={{ mt: 1 }} />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    className='ProductPageText'
                    sx={{ m: 1 }}
                  >
                    <div className='ProductPageText'>
                      <TextField
                        fullWidth
                        id='description'
                        name='description'
                        label='Description'
                        multiline
                        maxRows={6}
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className='ProductPageTitle'
                    sx={{ m: 1 }}
                  >
                    <TextField
                      fullWidth
                      label='Price'
                      id='price'
                      name='price'
                      onChange={handleChange}
                      value={formData.price}
                    />
                  </Grid>
                  <Grid item container alignItems='center' direction='row'>
                    <IconButton
                      size='large'
                      aria-label='show 4 new mails'
                      color='inherit'
                      sx={{ color: 'error.main' }}
                      onClick={decreaseBought}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <div className='ProductPageCounterNum'>{numberOfBuy}</div>
                    <IconButton
                      size='large'
                      aria-label='show 4 new mails'
                      color='inherit'
                      sx={{ color: 'success.main' }}
                      onClick={increaseBought}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  {formData.kind === 'Plant' && (
                    <Grid container>
                      <Grid
                        container
                        item
                        className='ProductPageText'
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: '135px' }}>
                          <InputLabel id='demo-simple-select-label'>
                            Water
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='water'
                            name='water'
                            label='Water'
                            onChange={handleChange}
                            value={formData.water}
                          >
                            <MenuItem value={'much'}>Much</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'low'}>Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className='ProductPageText'
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: '135px' }}>
                          <InputLabel id='demo-simple-select-label'>
                            Light
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='light'
                            name='light'
                            label='Light'
                            onChange={handleChange}
                            value={formData.light}
                          >
                            <MenuItem value={'much'}>Much</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'low'}>Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className='ProductPageText'
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: '135px' }}>
                          <InputLabel id='demo-simple-select-label'>
                            Growth rate
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='growthRate'
                            name='growthRate'
                            label='Growth rate'
                            onChange={handleChange}
                            value={formData.growthRate}
                          >
                            <MenuItem value={'much'}>Much</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'low'}>Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className='ProductPageText'
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: '135px' }}>
                          <InputLabel id='demo-simple-select-label'>
                            Environment
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='environment'
                            name='environment'
                            label='Environment'
                            onChange={handleChange}
                            value={formData.environment}
                          >
                            <MenuItem value={'none'}>None</MenuItem>
                            <MenuItem value={'tropical'}>Tropical</MenuItem>
                            <MenuItem value={'cold'}>Cold</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className='ProductPageBuyContainer'
                  >
                    <Grid
                      container
                      item
                      justifyContent='flex-end'
                      sx={{ p: 0.5, Color: '#12824C' }}
                      className='ProductPageTitle'
                    >
                      <Button
                        variant='contained'
                        className='productsPageAdd'
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="newUser">
      <h1 className="newUserTitle">Product</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
      </label>
        </div>
        
        <div className="newUserItem">
        <Grid container>
          <Grid item sx={{ p: 2 }} alignItems="center" direction="row">
            <div className="productPagePrice">
              {" "}
              <b>Count</b>
            </div>
          </Grid>
          <Grid
            item
            // xs={6}
            // md={6}
            // lg={4}
            // sx={{ justifyContent: { xs: "flex-end", sm: "center" } }}
            className="ProductPageCounter"
          >
            <Grid item container alignItems="center" direction="row">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{ color: "error.main" }}
                onClick={decreaseBought}
              >
                <RemoveIcon />
              </IconButton>
              <div className="ProductPageCounterNum">{numberOfBuy}</div>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{ color: "success.main" }}
                onClick={increaseBought}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          
        </Grid>
          
        </div>
        <div className="newUserItem">
          <TextField
            // id="standard-basic"
            name="name"
            label="Product Name"
            variant="standard"
            type="text"
            // helperText={errorData.email != "" ? errorData.email : ""}
            // onChange={handleChange}
            required
          />          
        </div>
        <div className="newUserItem">
          <TextField
            name="description"
            // id="standard-basic"
            label="Description"
            variant="standard"
            type="text"
            // helperText={errorData.userName != "" ? errorData.userName : ""}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="price"
            // id="standard-basic"
            label="Price"
            variant="standard"
            type="text"
            // helperText={errorData.name != "" ? errorData.name : ""}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="newUserItem">
          <TextField
            name="kind"
            // id="standard-select-currency-native"
            select
            label="Kind"
            // value={secondaryFormData.degree}
            // onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {kind.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* onChange={handleChangeSecondary} 
          </TextField>
        </div>

        <div className="newUserItem">
          <TextField
            name="light"
            // id="standard-select-currency-native"
            select
            label="Light"
            // value={secondaryFormData.degree}
            // onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {light.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* onChange={handleChangeSecondary} 
          </TextField>
        </div>

        <div className="newUserItem">
          <TextField
            name="water"
            // id="standard-select-currency-native"
            select
            label="water"
            // value={secondaryFormData.degree}
            // onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {water.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {onChange={handleChangeSecondary} }
          </TextField>
        </div>

        <div className="newUserItem">
          <TextField
            name="growthRate"
            // id="standard-select-currency-native"
            select
            label="Growth Rate"
            // value={secondaryFormData.degree}
            // onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {growthRate.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* onChange={handleChangeSecondary} 
          </TextField>
        </div>

        <div className="newUserItem">
          <TextField
            name="environment"
            // id="standard-select-currency-native"
            select
            label="Environment"
            // value={secondaryFormData.degree}
            // onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {environment.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* onChange={handleChangeSecondary} 
          </TextField>
        </div>

        
      </form>
      <Link to="/AdminPage/productsList">
        <button
          className="newUserButton"
          //  onClick={handleSubmit}
        >
          Confirm
        </button>
      </Link>
      <Link to="/AdminPage/productsList">
        <button className="CancelEditBtn">Cancel</button>
      </Link>
    </div> */}
    </Grid>
  )
}
