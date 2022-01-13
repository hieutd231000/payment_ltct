import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const theme = createTheme();

export default function AddressForm(props) {

  const navigate = useNavigate();
  const [N_notifi, setN_Notifi] = useState("");
  const [P_notifi, setP_Notifi] = useState("");
  const [E_notifi, setE_Notifi] = useState("");
  const [C_notifi, setC_Notifi] = useState("");
  const [D_notifi, setD_Notifi] = useState("");
  const [A_notifi, setA_Notifi] = useState("");



  const handleSubmit = (event) => {
    //Reset state
    setN_Notifi("");
    setP_Notifi("");
    setE_Notifi("");
    setC_Notifi("");
    setD_Notifi("");
    setA_Notifi("");
    //Check validate
    let check = true;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const phone = data.get('phone');
    const email = data.get('email');
    const city = data.get('city');
    const district = data.get('district');
    const address = data.get('address');
    const detail = data.get('detail');

    if (!name) {
      setN_Notifi("Họ tên không được để trống");
      check = false;
    } else {
      if (!(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/.test(name))) {
        setN_Notifi("Họ tên không đúng định dạng");
        check = false;
      }
    }

    if (!phone) {
      setP_Notifi("Số điện thoại không được để trống");
      check = false;
    } else {
      if (phone.length != 10 || !(/[0-9]{10}/.test(phone))) {
        setP_Notifi("Số điện thoại không đúng định dạng");
        check = false;
      }
    }

    if (!email) {
      setE_Notifi("Email không được để trống");
      check = false;
    } else {
      if (!(/\S+@\S+\.\S+/.test(email))) {
        setE_Notifi("Email không đúng định dạng");
        check = false;
      }
    }

    if (!city) {
      setC_Notifi("Tỉnh/thành phố không được để trống");
      check = false;
    }

    if (!district) {
      setD_Notifi("Quận/huyện không được để trống");
      check = false;
    }

    if (!address) {
      setA_Notifi("Địa chỉ không được để trống");
      check = false;
    }

    console.log(name, phone, email, city, district, address, detail);
    if (check) {
      // const userData = {
      //   name: name,
      //   phone: phone,
      //   email: email,
      //   city: city,
      //   district: district,
      //   address: address,
      // }
      navigate("/payment-method", { state: { name: name, address: address, district: district, city: city } });
    }
  };

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
          <Stepper activeStep={0} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Địa chỉ giao hàng
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nhập họ tên"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {N_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Nhập số điện thoại"
                    fullWidth
                    variant="standard"
                  />
                  <FormHelperText error>
                    {P_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Nhập email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="standard"
                  />
                  <FormHelperText error>
                    {E_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Tỉnh/Thành phố"
                    fullWidth
                    variant="standard"
                  />
                  <FormHelperText error>
                    {C_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="district"
                    name="district"
                    label="Quận/huyện"
                    fullWidth
                    variant="standard"
                  />
                  <FormHelperText error>
                    {D_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Nhập địa chỉ"
                    fullWidth
                    autoComplete="shipping address"
                    variant="standard"
                  />
                  <FormHelperText error>
                    {A_notifi}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="detail"
                    name="detail"
                    label="Thông tin thêm"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Sử dụng địa chỉ này cho đơn hàng tiếp theo"
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  type="submit"
                >Tiếp
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>

    </ThemeProvider>

  );
}
