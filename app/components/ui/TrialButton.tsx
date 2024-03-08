'use client';

import React from 'react';

const TrialButton: React.FC<any> = ({ children, setTrial }) => {
    return (
        <button onClick={() => setTrial(children)} className="inline-block bg-gray-200 rounded-md px-4 py-4 text-3xl font-medium text-gray-700 mr-2 mb-9 ml-90">
            {children}
        </button>
    );
};


export default TrialButton;