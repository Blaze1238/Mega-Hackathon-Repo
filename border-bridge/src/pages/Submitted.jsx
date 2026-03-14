import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const REDIRECT_SECONDS = 3;

function Submitted() {
    const navigate = useNavigate();
    const [secondsRemaining, setSecondsRemaining] = useState(REDIRECT_SECONDS);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (secondsRemaining === 0) {
            navigate('/');
        }
    }, [navigate, secondsRemaining]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted</h1>
                <p className="text-gray-600 mb-6">
                    Your intake details were saved locally and submitted successfully.
                </p>
                <p className="text-sm text-gray-500">
                    Redirecting to home page in {secondsRemaining} second{secondsRemaining === 1 ? '' : 's'}...
                </p>
            </div>
        </div>
    );
}

export default Submitted;