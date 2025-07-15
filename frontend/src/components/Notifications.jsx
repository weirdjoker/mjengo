import React from 'react';

const notifications = [
    {id: 1 , title:'Project Update',message:'New project assigned.'},
    {id: 2, title:'Deadline', message:'Project deadline approaching'},
];

const Notifications = () => {
    return (
        <div className='p=4'>
            <h2 className='text-2xl font-bold mb-4'>Notifications</h2>
            {notifications.map((notification) => (
                <div key={notification.id} className='p-3 bg-blue-100 rounded mb-2'>
                    <h3 className='font-semibold'>{notification.title}</h3>
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Notifications;