import {z} from 'zod'

export const ProfileSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, {message: 'Name is required.'}),
    phone: z.string().min(6, {message: 'Phone number must be at least 6 characters long.'}),
    role: z.enum(['buyer', 'seller']),
    bio: z.string().optional(),
    avatarFile: z.any().nullable(),
    avatar_url: z.string().nullable(),
    created_at: z.string(),
})
export type Profile = z.infer<typeof ProfileSchema>

export const ServiceSchema = z.object({
    id: z.uuid(),
    seller_id: z.uuid(),
    name: z.string().min(1, {message: 'Service name is required.'}),
    description: z.string().min(1, {message: 'Description is required.'}),
    duration_value: z.coerce.number().min(1, {message: 'Duration must be at least 1 minute.'}),
    duration_unit: z.enum(['minutes', 'hours', 'days']),
    price: z.coerce.number().min(0, {message: 'Price cannot be negative.'}) ,
    created_at: z.string(),
})
export type Service = z.infer<typeof ServiceSchema>

export const AppointmentSchema = z.object({
    id: z.uuid(),
    user_id: z.uuid(),
    service_id: z.uuid(),
    date: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    status: z.enum(['pending', 'confirmed', 'cancelled']),
    created_at: z.string()
})
export type Appointment = z.infer<typeof AppointmentSchema>

export const AuthSchema = z.object({
    email: z.email({message: 'Please enter a valid email address.'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long.'}),
})
export type AuthData = z.infer<typeof AuthSchema>

export const ProfileInputSchema = ProfileSchema.omit({id: true, created_at: true})
export const AppointmentInputSchema = AppointmentSchema.omit({id: true,user_id: true, created_at: true})
export const ServiceInputSchema = ServiceSchema.omit({id: true, seller_id: true, created_at: true})
export type ProfileInput = z.infer<typeof ProfileInputSchema>
export type AppointmentInput = z.infer<typeof AppointmentInputSchema>