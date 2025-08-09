import {ReactNode, useEffect, useState} from "react";

interface DelayProps {
    children: ReactNode;
    wait: number;
}

export default function Delay({children, wait}: DelayProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, wait)
    }, []);

    return (
        <div style={!show ? {display: 'none'} : {}}>
            {children}
        </div>
    );
}