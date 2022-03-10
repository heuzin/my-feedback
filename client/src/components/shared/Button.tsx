import React from 'react';

type Props = {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset' | undefined;
    version?: string;
    isDisabled?: boolean;
};

const Button: React.FC<Props> = ({ children, version = 'primary', type, isDisabled = false }) => {
    return (
        <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
            {children}
        </button>
    );
};

export default Button;
