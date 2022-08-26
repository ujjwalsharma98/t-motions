import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TextField from '@material-ui/core/TextField';
import { useFormik, Field } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { field: 'id', headerName: 'ID', width: 160 },
  { field: 'firstName', headerName: 'First name', width: 160 },
  { field: 'lastName', headerName: 'Last name', width: 160 },
  { field: 'email', headerName: 'Email', width: 160, type: 'number', },
  { field: 'password', headerName: 'Password', width: 160 },
];

const validationSchema = yup.object({
  firstName: yup.string('Enter first name').required('first name is required'),
  lastName: yup.string('Enter last name').required('last name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
  })
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsConditions: false
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const App = () => {

  const [contactList, setContactList] = useState([])
  const [modalState, setModalState] = useState(false)
  const [openToaster, setOpenToaster] = useState(false);

  useEffect(() => {

  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveData(values)
    },
  });

  const saveData = (payload) => {
    axios.post(`https://crudcrud.com/api/26d6d8d4113f4cbb960da2e6d00d9b66`, payload).then((res) => {
      console.log({res})
    })
  }

  const openModal = () => {
    setModalState(true)
  }

  const closeModal = () => {
    setModalState(false)
  }

  const openAlert = () => {
    setOpenToaster(true)
  }

  const closeAlert = () => {
    setOpenToaster(false)
  }

  return (
    <div style={{ height: 400, width: 800 }}>
      <DataGrid
        rows={contactList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Modal
        open={modalState}
        onClose={() => closeModal()}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <Button sx={{ mt: 2 }} color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openToaster} autoHideDuration={6000} onClose={() => closeAlert()}>
          <Alert onClose={() => closeAlert()} severity="success" sx={{ width: '100%' }}>
            Deleted Successfully!
          </Alert>
        </Snackbar>
      </Stack>

      <div>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => openModal()}>Register new user</Button>
      </div>

    </div>
  );
}

export default App;
