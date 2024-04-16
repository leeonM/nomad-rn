import * as z from "zod"
import * as Yup from 'yup';

export const tripFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(500,'Description must be less than 500 characters'),
    tripLocation: z.string().min(3,'Please enter a city'),
    imageUrl: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    categoryId: z.string(),
    url: z.string(),
  })


export const userUpdateSchema = z.object({
    username: z.string().min(3,'Username must be at least 3 characters'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    photo: z.string(),
    userLocation: z.string().optional(),
    bio: z.string().min(3, 'Bio must be at least 3 characters').max(400,'Bio must be less than 400 characters'),
    instagram: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    facebook: z.string().url().optional(),
    occupation: z.string().url().optional(),
    age: z.string().optional()
})

export const communityFormSchema = z.object({
  name: z.string().min(3,'Community name must be at least 3 characters'),
  bio: z.string().min(3, 'Bio must be at least 3 characters').max(500,'Bio must be less than 500 characters'),
  communityLocation: z.string(),
})

export const tripSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Trip title required'),
  desc: Yup.string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Description required'),
  country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Country required'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('City required'),
  category: Yup.string()
    .min(2, 'Select a category')
    .required('Category required'),
});