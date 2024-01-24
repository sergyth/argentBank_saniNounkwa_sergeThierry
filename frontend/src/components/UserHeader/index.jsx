import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {auth_service} from '../../services/auth';
import './userHeader.css'

/**
 * Creates header component
 * @returns { HTMLElement }
 */
const UserHeader = () => {
  const token= useSelector((state)=> state.login.token);
  const firstName= useSelector((state) => state.user.firstName);
  const lastName= useSelector((state) => state.user.lastName);
  const dispatch = useDispatch();
  const [edit, showEdit] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] =  useState('');

  const submit=(e)=>{
    e.preventDefault()
    dispatch(auth_service.updateProfile(editFirstName,editLastName,token));
    showEdit(false);
  }

  useEffect(()=>{
    if(token !==null ){
      dispatch(auth_service.userProfile(token))
    }
  },[token, dispatch])

  return (
    <div >
        <h1>Welcome back<br />{edit === false ? firstName + ' ' + lastName : ""}</h1>
        {
          edit === false ? 
            <button className="edit-button" onClick={()=>{showEdit(true)}}>Edit Name</button> 
          : 
          <form className='edit-inputs-buttons' onSubmit={submit}>
            <div className='edit-inputs'>
              <input type="text" className='edit-input' onChange={(e)=>{setEditFirstName(e.target.value)}} placeholder={'Tony'} required/>
              <input type="text" className='edit-input' onChange={(e)=>{setEditLastName(e.target.value)}} placeholder={'Stark'} required/>
            </div>
            <div className='edit-buttons'>
              <button className='edit-button-option' type='submit'>Save</button>
              <button className='edit-button-option' onClick={()=>{showEdit(false)}}>Cancel</button>
            </div>
          </form>
        }
    </div>
  )
}

export default UserHeader