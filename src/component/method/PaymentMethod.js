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
import Radio from '@mui/material/Radio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = ['Địa chỉ giao hàng', 'Phương thức thanh toán', 'Thông tin thanh toán', 'Xác nhận đơn hàng'];


const theme = createTheme();

function PaymentMethod() {
    const { state } = useLocation();
    const { name, address, district, city } = state;

    const [notifi, setNotifi] = useState("");
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }

    const [radio, getRadio] = useState("");

    console.log(radio);

    const handleNext = () => {
        setNotifi("");
        if (radio == "me1")
            navigate("/review-order", { state: { name: name, address: address, district: district, city: city } });
        else if (radio == "me2")
            navigate("/visa-form", { state: { name: name, address: address, district: district, city: city } });
        else if (radio == "me3")
            navigate("/zalo-form", { state: { name: name, address: address, district: district, city: city } });
        else if (radio == "me4")
            navigate("/viettel-form", { state: { name: name, address: address, district: district, city: city } });
        else
            setNotifi("Mời bạn chọn phương thức thanh toán")
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
                    <Stepper activeStep={1} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Phương thức thanh toán
                        </Typography>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                                onChange={(e) => { getRadio(e.target.value) }}
                            // value={value}
                            // onChange={() => { getRadio(value) }}
                            >
                                <FormControlLabel value="me1" control={<Radio />} label="Thanh toán tiền mặt khi nhận hàng" />
                                <FormControlLabel value="me2" control={<Radio />} label="Thanh toán bằng thẻ Visa, Master" />
                                <FormControlLabel value="me3" control={<Radio />} label="Thanh toán bằng ví ZaloPay" />
                                <FormControlLabel value="me4" control={<Radio />} label="Thanh toán bằng ViettelPay" />
                            </RadioGroup>
                        </FormControl>
                        <FormHelperText error sx={{ mt: 1, ml: 1 }}>
                            {notifi}
                        </FormHelperText>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                Trở lại
                            </Button>

                            <Button
                                variant="contained"
                                // onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleNext}
                            >
                                Tiếp
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>

            </Container>

        </ThemeProvider>
    );
}
export default PaymentMethod