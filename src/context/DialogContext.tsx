import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DialogContextType {
    isOpen : boolean
    toggleDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDialog = ()=>{
        setIsOpen(!isOpen);
    }
    return (
        <DialogContext.Provider value={{  isOpen, toggleDialog }}>
            {children}
        </DialogContext.Provider>
    );
}

export function useDialog() {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
}