// Badge.js
import React from 'react';

const Badge = ({ type, label, rounded, outline, textType, children,color }) => {
    const badgeClass = `m-1 badge ${rounded ? 'rounded-pill ' : ''}${outline ? 'badge-outline ' : ''}${textType ? `text-${textType} ` : ''}bg-${type} color:${color}`;

    return (
        <span className={badgeClass}>
            {label && <span className="badge-label">{label}</span>}
            {children}
        </span>
    );
};

export default Badge;
