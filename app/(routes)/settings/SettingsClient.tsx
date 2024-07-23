'use client'

import { SafeUser } from '@/app/types';
import React from 'react';
import SettingsInfo from '@/app/components/Settings/SettingsInfo';
import SettingsCarosel from '@/app/components/Settings/SettingsCarosel';

interface SettingsClientProps {
    currentUser?: SafeUser | null;
    partners?: number;
    services?: number;
    users?: SafeUser[] | null;
}

const SettingsClient: React.FC<SettingsClientProps> = ({ 
    users, 
    currentUser,
    partners,
    services
 }) => {

    if (!users || users.length === 0) {
        return <p>No users found.</p>;
    }
    
    return (
        <>
            <SettingsInfo 
                currentUser={currentUser}
                partners={partners}
                services={services}/>
            <SettingsCarosel 
                users={users}
                />
        </>
    );
};

export default SettingsClient;
