import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";
import { FormLabel, FormControl, RadioGroup } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Địa chỉ giao hàng', 'Phương thức thanh toán', 'Thông tin thanh toán', 'Xác nhận đơn hàng'];
var money = 10000;
const theme = createTheme();

export default function VisaPayForm() {
  const { state } = useLocation();
  const { name, address, district, city } = state;
  const navigate = useNavigate();
  //Notification
  const [N_notifi, setN_Notifi] = useState("");
  const [E_notifi, setE_Notifi] = useState("");
  const [C_notifi, setC_Notifi] = useState("");
  const [Cvv_notifi, setCvv_Notifi] = useState("");
  const [Balance_notifi, setBalance_Notifi] = useState("");

  //API
  // const [cardData, setCardData] = useState(null);
  // useEffect(() => {
  //   if (!cardData)
  //     getCardData();
  // }, [])
  const checkCardData = async (data) => {
    console.log(data);
    let checkExist = true;
    const res = await axios.post("https://stark-shore-97814.herokuapp.com/api/onlinePay", data);
    if (res.data.status == 404) {
      setC_Notifi(res.data.message);
      checkExist = false;
    }
    if (res.data.status == 4061) {
      setCvv_Notifi(res.data.message);
      checkExist = false;
    }
    if (res.data.status == 4063) {
      setE_Notifi(res.data.message);
      checkExist = false;
    }
    if (res.data.status == 4062) {
      setN_Notifi(res.data.message);
      checkExist = false;
    }
    if (checkExist && res.data.status == 137) {
      setBalance_Notifi(res.data.message);
      checkExist = false;
    }
    //No error
    if (checkExist)
      navigate("/review-order", { state: { name: name, address: address, district: district, city: city, cardNumber: data.card, cardName: data.name, cvv: data.cvv, expiredDate: data.expired } });
  }

  //Handle back button
  const handleBack = () => {
    navigate("/payment-method", { state: { name: name, address: address, district: district, city: city } });
  }

  const handleSubmit = (event) => {
    //Reset state
    setN_Notifi("");
    setE_Notifi("");
    setC_Notifi("");
    setCvv_Notifi("");
    setBalance_Notifi("");
    //Check validate
    let checkAPI = true;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cardName = data.get('cardName');
    const cardNumber = data.get('cardNumber');
    const expiredDate = data.get('expiredDate');
    const cvv = data.get('cvv');

    if (!cardName) {
      setN_Notifi("card name không được để trống");
      checkAPI = false;
    } else {
      if (!(/^[A-Za-z\s]+$/.test(cardName))) {
        setN_Notifi("card name không đúng định dạng");
        checkAPI = false;
      }
    }

    if (!cardNumber) {
      setC_Notifi("card number không được để trống");
      checkAPI = false;
    } else {
      if (cardNumber.length != 6 || !(/[0-9]{6}/.test(cardNumber))) {
        setC_Notifi("card number không đúng định dạng");
        checkAPI = false;
      }
    }

    if (!expiredDate) {
      setE_Notifi("expired date không được để trống");
      checkAPI = false;
    } else {
      if (!(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiredDate))) {
        setE_Notifi("expired date không đúng định dạng");
        checkAPI = false;
      }
    }

    if (!cvv) {
      setCvv_Notifi("cvv không được để trống");
      checkAPI = false;
    } else {
      if (!(/^[0-9]{3,4}$/.test(cvv))) {
        setCvv_Notifi("cvv không đúng định dạng");
        checkAPI = false;
      }
    }
    //CheckAPI
    if (checkAPI) {
      console.log(checkAPI);
      const data = {
        type: "bank",
        card: cardNumber,
        cvv: cvv,
        name: cardName,
        expired: expiredDate,
        money: money
      };
      checkCardData(data);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Happy Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Thanh toán
          </Typography>
          <Stepper activeStep={2} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Thẻ tín dụng
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    name="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {N_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    name="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {C_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expDate"
                    name="expiredDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {E_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    // helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {Cvv_notifi}
                  </FormHelperText>
                  <FormHelperText error>
                    {Balance_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                    label="Ghi nhớ thông tin thẻ cho lần thanh toán tiếp theo"
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Trở lại
                </Button>

                <Button
                  variant="contained"
                  // onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  type={handleSubmit}
                >
                  Tiếp
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>

    </ThemeProvider>


  );
}
