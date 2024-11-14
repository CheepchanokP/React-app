import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import './profile.scss';

function Profile() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
  });

  // ฟังก์ชันในการดึงข้อมูลจาก API
  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          username: data.username,
          email: data.email,
        });
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []); // useEffect จะทำงานเมื่อคอมโพเนนต์ถูกโหลด

  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะเปิด-ปิดของ modal
  const [editData, setEditData] = useState(profileData); // สถานะสำหรับแก้ไขข้อมูล
  

   // ฟังก์ชันเปิด-ปิด modal
   const handleEditProfile = () => {
    setIsModalOpen(true); // เปิด modal
    setEditData(profileData); // โหลดข้อมูลปัจจุบันเข้า form
  };

  // ฟังก์ชันบันทึกการแก้ไขข้อมูล
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT', // Use PUT to update the data
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editData.username,
          email: editData.email,
          old_password: editData.old_password, // Include the old password
          new_password: editData.new_password // Include the new password
        }), // Convert the data to JSON
      });

      if (response.ok) {
        setProfileData(editData); // Update the state with the new data
        setIsModalOpen(false); // Close the modal after saving
      } else {
        console.error('Failed to update profile data');
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  // ฟังก์ชันจัดการการอัปโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // สร้าง URL ชั่วคราวสำหรับรูปภาพที่เลือก
      setImagePreview(imageUrl); // อัปเดต preview ของรูปภาพใน modal
    }
  };

  return (
    <div className='profile'>
    <Sidebar />
    <div className='profileContainer'>
      <Navbar />
      <div className='body'>
        <div className='content'>
          <h1 className='title'>Profile Information</h1>
          <div className='profileDetails'>
            <div className='left'>
            </div>
            <div className='center'>
              <h2 className='name'>Username : {profileData.username}</h2>
              <p className='email'>Email : {profileData.email}</p>
            </div>
          </div>
          <button className='editBtn' onClick={handleEditProfile}>Edit Profile</button>
        </div>
      </div>
    </div>

    {isModalOpen && (
      <div className='modal'>
        <div className='modalContent'>
          <h2>Edit Profile</h2>
          <label>Username</label>
          <input
            type='text'
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          />
          <label>Old Password</label>
          <input
            type='password'
            value={editData.old_password || ''}
            onChange={(e) => setEditData({ ...editData, old_password: e.target.value })}
          />
          <label>New Password</label>
          <input
            type='password'
            value={editData.new_password || ''}
            onChange={(e) => setEditData({ ...editData, new_password: e.target.value })}
          />
          <div className='modalActions'>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default Profile;
