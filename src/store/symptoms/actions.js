import {
  ADD_NEW_SYMPTOMS,
  ADD_SYMPTOMS_FAIL,
  ADD_SYMPTOMS_SUCCESS,
  DELETE_SYMPTOMS,
  DELETE_SYMPTOMS_FAIL,
  DELETE_SYMPTOMS_SUCCESS,
  GET_SYMPTOMS_DETAIL,
  GET_SYMPTOMS_DETAIL_FAIL,
  GET_SYMPTOMS_DETAIL_SUCCESS,
  GET_SYMPTOMS_LIST,
  GET_SYMPTOMS_LIST_FAIL,
  GET_SYMPTOMS_LIST_SUCCESS,
  UPDATE_SYMPTOMS,
  UPDATE_SYMPTOMS_FAIL,
  UPDATE_SYMPTOMS_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET SYMPTOMS LIST 
================================================
*/
export const getSymptomsLists = () => ({
  type: GET_SYMPTOMS_LIST,
})

export const getSymptomsListsSuccess = symptoms => ({
  type: GET_SYMPTOMS_LIST_SUCCESS,
  payload: symptoms,
})

export const getSymptomsListsFail = error => ({
  type: GET_SYMPTOMS_LIST_FAIL,
  payload: error,
})

/*
================================================
GET SYMPTOMS DETAIL 
================================================
*/

export const getSymptomsDetails = symptomsId => ({
  type: GET_SYMPTOMS_DETAIL,
  symptomsId,
})

export const getSymptomsDetailsSuccess = symptomsDetails => ({
  type: GET_SYMPTOMS_DETAIL_SUCCESS,
  payload: symptomsDetails,
})

export const getSymptomsDetailsFail = error => ({
  type: GET_SYMPTOMS_DETAIL_FAIL,
  payload: error,
})

/*
================================================
ADD NEW SYMPTOMS
================================================
*/

export const addNewSymptoms = symptoms => ({
  type: ADD_NEW_SYMPTOMS,
  payload: symptoms,
})

export const addNewSymptomsSuccess = symptoms => ({
  type: ADD_SYMPTOMS_SUCCESS,
  payload: symptoms,
})

export const addNewSymptomsFail = error => ({
  type: ADD_SYMPTOMS_FAIL,
  payload: error,
})

/*
================================================
DELETE SYMPTOMS
================================================
*/

export const deleteSymptoms = symptoms => ({
  type: DELETE_SYMPTOMS,
  payload: symptoms,
})

export const deleteSymptomsSuccess = symptoms => ({
  type: DELETE_SYMPTOMS_SUCCESS,
  payload: symptoms,
})

export const deleteSymptomsError = error => ({
  type: DELETE_SYMPTOMS_FAIL,
  payload: error,
})

/*
================================================
UPDATE SYMPTOMS 
================================================
*/

export const updateSymptoms = symptoms => ({
  type: UPDATE_SYMPTOMS,
  payload: symptoms,
})

export const updateSymptomsSuccess = symptoms => ({
  type: UPDATE_SYMPTOMS_SUCCESS,
  payload: symptoms,
})

export const updateSymptomsFail = error => ({
  type: UPDATE_SYMPTOMS_FAIL,
  payload: error,
})
