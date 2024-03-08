import React, { useContext, createContext, ReactNode }  from  'react';
import useInput from '../hooks/useInput';

const MessageContext = createContext({} as any);

export const MessageProvider : React.FC<{children: ReactNode}> = ({ children }) => {
    const [inputMessage, setInputMessage] = useInput(''); 
    const value = { inputMessage, setInputMessage };

    return  (
        <MessageContext.Provider value={value}>
            { children }
        </MessageContext.Provider>
    )
}

export const useMessage = () => useContext(MessageContext);


