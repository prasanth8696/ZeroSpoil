import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
        {/* Avatar & Name */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">John Doe</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Web Developer</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-800 dark:text-white">Personal Information</h3>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">First Name</label>
            <input
              type="text"
              value="John"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              value="Doe"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Gender</label>
            <div className="flex space-x-4">
              <input type="radio" name="gender" value="Male" className="mr-2" checked readOnly /> Male
              <input type="radio" name="gender" value="Female" className="ml-4 mr-2" readOnly /> Female
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-800 dark:text-white">Contact Information</h3>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
            <input
              type="email"
              value="johndoe@example.com"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Mobile Number</label>
            <input
              type="text"
              value="+91 9876543210"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
