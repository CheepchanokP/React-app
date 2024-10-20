import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import './profile.scss';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImg: 'https://via.placeholder.com/150'
  });

  // ฟังก์ชันในการดึงข้อมูลจาก API
  const fetchProfileData = async () => {
    const token = 'your_api_token_here'; // แทนที่ด้วย token ของคุณ
    try {
      const response = await fetch('https://api.example.com/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ในส่วน header
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profileImg: data.profileImg || 'https://via.placeholder.com/150',
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
  const [imagePreview, setImagePreview] = useState(profileData.profileImg); // สำหรับแสดง preview รูปใหม่

   // ฟังก์ชันเปิด-ปิด modal
   const handleEditProfile = () => {
    setIsModalOpen(true); // เปิด modal
    setEditData(profileData); // โหลดข้อมูลปัจจุบันเข้า form
    setImagePreview(profileData.profileImg); // โหลดรูปภาพปัจจุบัน
  };

  // ฟังก์ชันบันทึกการแก้ไขข้อมูล
  const handleSaveChanges = async () => {
    const token = 'your_api_token_here'; // แทนที่ด้วย token ของคุณ
    try {
      const response = await fetch('https://api.example.com/profile', {
        method: 'PUT', // ใช้ PUT เพื่ออัปเดตข้อมูล
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...editData, profileImg: imagePreview }), // แปลงข้อมูลเป็น JSON
      });

      if (response.ok) {
        setProfileData({ ...editData, profileImg: imagePreview }); // อัปเดตข้อมูลใน state
        setIsModalOpen(false); // ปิด modal หลังบันทึก
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
              <img
                src={profileData.profileImg}
                alt='Profile'
                className='profileImg'
              />
            </div>
            <div className='center'>
              <h2 className='name'>Username : {profileData.name}</h2>
              <p className='email'>Email : {profileData.email}</p>
              <p className='phone'>Phone : {profileData.phone}</p>
              <p className='address'>Address : {profileData.address}</p>
            </div>
          </div>
          <button className='editBtn' onClick={handleEditProfile}>Edit Profile</button>
        </div>
      </div>
    </div>

    {/* Modal สำหรับแก้ไขข้อมูลโปรไฟล์ */}
    {isModalOpen && (
      <div className='modal'>
        <div className='modalContent'>
          <h2>Edit Profile</h2>
          <label>Username</label>
          <input
            type='text'
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type='email'
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <label>Phone</label>
          <input
            type='text'
            value={editData.phone}
            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
          />
          <label>Address</label>
          <input
            type='text'
            value={editData.address}
            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
          />

          {/* ส่วนอัปโหลดรูปภาพ */}
          <label>Profile Image</label>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
          <img src={imagePreview} alt='Profile Preview' className='profileImgPreview' />

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
