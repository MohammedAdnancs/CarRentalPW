import * as yup from 'yup';

export const ListingsSchemas = yup.object().shape({

  carName: yup.string().min(2, 'Car name must be at least 2 characters').required('Car name is required'),
  carType: yup.string().required('Car type is required'),
  numDoors: yup.number().integer('Please enter a valid  door number.').required('Number of doors is required'),
  numSeats: yup.number().integer('Please enter a valid  seats number.').required('Number of seats is required'),
  price: yup.number().integer('Please enter a price.').required('Price is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
});

