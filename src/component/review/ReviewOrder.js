import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import swal from 'sweetalert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = ['Địa chỉ giao hàng', 'Phương thức thanh toán', 'Thông tin thanh toán', 'Xác nhận đơn hàng'];

const theme = createTheme();

const products = [
  {
    name: 'Sản phẩm 1',
    desc: 'Something else',
    price: '15.000VND',
  },
  {
    name: 'Sản phẩm 2',
    desc: 'Something else',
    price: '15.000VND',
  },
  {
    name: 'Sản phẩm 3',
    desc: 'Something else',
    price: '15.000VND',
  },
  {
    name: 'Sản phẩm 4',
    desc: 'Something else',
    price: '15.000VND',
  },
  { name: 'Phí ship', desc: '', price: 'Free' },
];

const addresses = ['Ha Noi'];


export default function Review() {
  //Get customer info
  const { state } = useLocation();
  var { name, address, district, city, cardNumber, cardName, cvv, expiredDate } = state;
  console.log(state);
  if (cardName != undefined) {
    var payments = [
      { name: 'Card type', detail: 'Visa' },
      { name: 'Card holder', detail: cardName },
      { name: 'Card number', detail: 'xxx-' + (cardNumber.substr(cardNumber.length - 3)) },
      { name: 'Expiry date', detail: expiredDate },
    ];
  }

  const [confirm, setConfirm] = useState(false)
  const [step, setStep] = useState(3);
  const [btnDisable, setBtnDisable] = useState("flex");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/payment-method", { state: { name: name, address: address, district: district, city: city } });
  }
  const handleNext = () => {
    setConfirm(true);
  }
  const handleOkeBtn = () => {
    setStep(4);
    setBtnDisable('none');
    swal({
      title: "Success!",
      text: "Bạn đã đặt hàng thành công",
      icon: "success",
      button: "OK!",
    })
      .then((value) => {
        navigate('/');
      });
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
          <Stepper activeStep={step} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Đơn hàng
            </Typography>
            {confirm ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Cảm ơn bạn đã đặt hàng.
                </Typography>
                <Typography variant="subtitle1">
                  Mã đơn hàng của bạn là #1234. Chúng tôi đã gửi email xác nhận đơn hàng của bạn và sẽ gửi cho bạn thông tin khi đơn hàng của bạn được giao.
                </Typography>
                <Box sx={{ display: btnDisable, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleOkeBtn}
                    sx={{ mt: 5, ml: 2 }}
                  >
                    Ok
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <List disablePadding>
                  {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={product.name} secondary={product.desc} />
                      <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                  ))}

                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Tổng cộng" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      60.000VND
                    </Typography>
                  </ListItem>
                </List>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Khách hàng
                    </Typography>
                    <Typography gutterBottom>{name}</Typography>
                    <Typography gutterBottom>{address}-{district}-{city}</Typography>
                  </Grid>
                  {cardName != undefined ? (
                    <Grid item container direction="column" xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Thông tin thẻ
                      </Typography>
                      <Grid container>
                        {payments.map((payment) => (
                          <React.Fragment key={payment.name}>
                            <Grid item xs={6}>
                              <Typography gutterBottom>{payment.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom>{payment.detail}</Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Grid>
                  ) : (<div></div>)}

                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleBack} sx={{ mt: 5, ml: 2 }}>
                    Trở lại
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 5, ml: 2 }}
                  >
                    Xác nhận
                  </Button>
                </Box>
              </React.Fragment>
            )}

          </React.Fragment>
        </Paper>
      </Container>

    </ThemeProvider>

  );
}
