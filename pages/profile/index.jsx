import ProfileComponent from '@/Component/Profile/ProfileComponent'
import { getClinetProfile } from '@/redux/getClientProfileSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const ProfileGet = useSelector((state) => state.rootReducer.clientProfile.clientProfile
  )
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getClinetProfile())
  }, [dispatch])
  return (
  <ProfileComponent data={ProfileGet}/>
  )
}

export default Profile
