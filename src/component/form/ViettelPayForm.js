import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormLabel, FormControl, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Địa chỉ giao hàng', 'Phương thức thanh toán', 'Thông tin thanh toán', 'Xác nhận đơn hàng'];
var money = 10000;
const theme = createTheme();

export default function ViettelPayForm() {
    const { state } = useLocation();
    const { name, address, district, city } = state;
    const navigate = useNavigate();
    const [Phone_notifi, setPhone_Notifi] = useState("");
    const [Pass_notifi, setPass_Notifi] = useState("");
    const [Balance_notifi, setBalance_Notifi] = useState("");

    //API
    const checkViettelData = async (data) => {
        let checkExist = true;
        const res = await axios.post("https://stark-shore-97814.herokuapp.com/api/onlinePay", data);
        if (res.data.status == 404) {
            setPhone_Notifi(res.data.message);
            checkExist = false;
        }
        if (res.data.status == 406) {
            setPass_Notifi(res.data.message);
            checkExist = false;
        }

        if (checkExist && res.data.status == 137) {
            setBalance_Notifi(res.data.message);
            checkExist = false;
        }
        console.log(res);
        //No error
        if (checkExist)
            navigate("/review-order", { state: { name: name, address: address, district: district, city: city } });
    }
    //Handle back button
    const handleBack = () => {
        navigate("/payment-method", { state: { name: name, address: address, district: district, city: city } });
    }

    const handleSubmit = (event) => {
        //Reset state
        setPhone_Notifi("");
        setPass_Notifi("");
        setBalance_Notifi("");

        //Check validate
        let check = true;
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const phone = data.get('phone');
        const pass = data.get('pass');


        if (!phone) {
            setPhone_Notifi("Phone number không được để trống");
            check = false;
        } else {
            if (phone.length != 10 || !(/[0-9]{10}/.test(phone))) {
                setPhone_Notifi("Phone number không đúng định dạng");
                check = false;
            }
        }

        if (!pass) {
            setPass_Notifi("Password không được để trống");
            check = false;
        } else if (pass.length < 6) {
            setPass_Notifi("Password quá ngắn");
            check = false;
        }

        if (check) {
            console.log(check);
            const data = {
                type: "viettel",
                phone: phone,
                password: pass,
                money: money
            };
            checkViettelData(data);
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
                            ViettelPay
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                            <Grid container spacing={3}>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phone"
                                        label="Phone number"
                                        fullWidth
                                        autoComplete="cc-number"
                                        variant="standard"
                                    />
                                    <FormHelperText error>
                                        {Phone_notifi}
                                    </FormHelperText>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="pass"
                                        name="pass"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        autoComplete="cc-csc"
                                        variant="standard"
                                    />
                                    <FormHelperText error>
                                        {Pass_notifi}
                                    </FormHelperText>
                                    <FormHelperText error>
                                        {Balance_notifi}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                        label="Ghi nhớ thông tin cho lần thanh toán tiếp theo"
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
