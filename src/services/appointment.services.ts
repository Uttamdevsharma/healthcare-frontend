"use server"

import { httpClient } from "@/lib/axios/httpClient"
import {
  type IAppointment,
  type IBookAppointmentPayload,
  type IBookAppointmentResult,
  type IInitiatePaymentResult,
} from "@/types/appointment.types"

export const bookAppointment = async (payload: IBookAppointmentPayload) => {
  try {
    return await httpClient.post<IBookAppointmentResult>("/appointments/book-appointment", payload)
  } catch (error) {
    console.log("Error booking appointment:", error)
    throw error
  }
}

export const bookAppointmentWithPayLater = async (payload: IBookAppointmentPayload) => {
  try {
    return await httpClient.post<IBookAppointmentResult>(
      "/appointments/book-appointment-with-pay-later",
      payload,
    )
  } catch (error) {
    console.log("Error booking appointment with pay later:", error)
    throw error
  }
}

export const initiateAppointmentPayment = async (appointmentId: string) => {
  try {
    return await httpClient.post<IInitiatePaymentResult>(
      `/appointments/initiate-payment/${appointmentId}`,
      {},
    )
  } catch (error) {
    console.log("Error initiating appointment payment:", error)
    throw error
  }
}

export const getMyAppointments = async () => {
  try {
    return await httpClient.get<IAppointment[]>("/appointments/my-appointments")
  } catch (error) {
    console.log("Error fetching my appointments:", error)
    throw error
  }
}

export const getAllAppointments = async () => {
  try {
    return await httpClient.get<IAppointment[]>("/appointments/all-appointments")
  } catch (error) {
    console.log("Error fetching all appointments:", error)
    throw error
  }
}

export const changeAppointmentStatus = async (id: string, status: string) => {
  try {
    return await httpClient.patch<IAppointment>(`/appointments/change-appointment-status/${id}`, { status })
  } catch (error) {
    console.log("Error updating appointment status:", error)
    throw error
  }
}

export const getMySingleAppointment = async (appointmentId: string) => {
  try {
    return await httpClient.get<IAppointment>(`/appointments/my-single-appointment/${appointmentId}`)
  } catch (error) {
    console.log("Error fetching appointment details:", error)
    throw error
  }
}

export const verifyAppointmentPayment = async (appointmentId: string) => {
  try {
    return await httpClient.post<IAppointment>("/appointments/verify-payment", { appointmentId })
  } catch (error) {
    console.log("Error verifying appointment payment:", error)
    throw error
  }
}

export const getAppointmentByVideoCallId = async (videoCallingId: string) => {
  try {
    return await httpClient.get<IAppointment>(`/appointments/by-video-call-id/${videoCallingId}`)
  } catch (error) {
    console.log("Error fetching appointment for video call:", error)
    throw error
  }
}