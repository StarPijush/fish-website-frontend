'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string; // Changed to string to accept dynamic values
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;
    const IconComponent = iconSet[name as keyof typeof iconSet] as React.ComponentType<any>;

    // Base animation classes for all icons
    const baseAnimationClasses = 'transition-all duration-300 ease-in-out';
    
    // Interactive animation classes
    const interactiveClasses = onClick && !disabled 
        ? 'cursor-pointer hover:scale-110 hover:rotate-6 active:scale-95' :'';
    
    // Disabled state
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    if (!IconComponent) {
        return (
            <QuestionMarkCircleIcon
                width={size}
                height={size}
                className={`text-gray-400 ${baseAnimationClasses} ${disabledClasses} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${baseAnimationClasses} ${interactiveClasses} ${disabledClasses} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        />
    );
}

export default Icon;