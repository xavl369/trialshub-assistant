import { useState, useEffect } from 'react';
import { get, set } from '@/app/services/localStorageService';
import { v4 as uuidv4 } from 'uuid';

export const useSessionId = () => {
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        let storedSessionId = get<string>('sessionId');

        if (!storedSessionId) {
            storedSessionId = uuidv4();
            set<string>('sessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
    }, []);

    return [sessionId, setSessionId];
};

