'use client';

import { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(null);
    const [store, setStore] = useState<AppStore | null>(null);
    
    useEffect(() => {
        if (!storeRef.current) {
            // Create the store instance the first time this renders
            storeRef.current = makeStore();
        }
        setStore(storeRef.current);
    }, []);

    return store ? <Provider store={store}>{children}</Provider> : null;
}
