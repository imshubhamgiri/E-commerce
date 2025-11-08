import React, { useState, useEffect } from 'react';

// 1. Set the Target Date/Time
// This is set to roughly 5 days, 10 hours, 30 minutes from when the code runs.
const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 5); 
TARGET_DATE.setHours(TARGET_DATE.getHours() + 10);
TARGET_DATE.setMinutes(TARGET_DATE.getMinutes() + 30);
const TARGET_TIMESTAMP = TARGET_DATE.getTime(); 

/**
 * Calculates the time remaining and returns the parts (days, hours, minutes, seconds).
 */
const calculateTimeRemaining = (targetTime) => {
 const total = targetTime - new Date().getTime();
    
    if (total <= 0) {
        return { days: '00', hours: '00', minutes: '00', seconds: '00', isFinished: true };
    }

    // Calculations based on milliseconds
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    // Helper to ensure two digits (e.g., '05' instead of '5')
    const pad = (num) => String(num).padStart(2, '0');

    return {
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        isFinished: false,
    };
};

const Timestamp = () => {
  // 2. Initialize State
    const [time, setTime] = useState(calculateTimeRemaining(TARGET_TIMESTAMP));
    const isFinished = time.isFinished;

    // 3. Set up the Interval using useEffect
    useEffect(() => {
        if (isFinished) return;

        const interval = setInterval(() => {
            const newTime = calculateTimeRemaining(TARGET_TIMESTAMP);
            setTime(newTime);
            
            if (newTime.isFinished) {
                // Clear the interval when the countdown hits zero
                clearInterval(interval);
            }
        }, 1000); // Update every 1000ms (1 second)

        // Cleanup function runs when component unmounts
        return () => clearInterval(interval);
    }, [isFinished]);
    
    // 4. Minimal Render Output
    return (
        <div className="text-sm font-mono md:px-3 text-gray-800   border-gray-300 rounded-lg bg-white shadow-sm">
            {isFinished ? (
                <span className="text-red-600 font-bold">Countdown Complete!</span>
            ) : (
                <div className="flex items-center">
                    <div className="mr-2 flex flex-col items-center">D: <div className="font-bold text-xl">{time.days}</div></div> | 
                    <div className="mr-2 flex flex-col items-center">H: <div className="font-bold text-xl">{time.hours}</div></div> | 
                    <div className="mr-2 flex flex-col items-center">M: <div className="font-bold text-xl">{time.minutes}</div></div> | 
                    <div className="flex flex-col items-center">S: <div className="font-bold text-xl">{time.seconds}</div></div>
                </div>
            )}
        </div>
    );
}

export default Timestamp
