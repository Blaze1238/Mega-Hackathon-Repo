import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Database } from 'lucide-react';

function Submitted() {
    const [lastSubmission, setLastSubmission] = useState(null);

    useEffect(() => {
        const storageKey = 'borderBridgeIntakeSubmissions';
        const existingRaw = localStorage.getItem(storageKey);
        if (existingRaw) {
            try {
                const submissions = JSON.parse(existingRaw);
                if (Array.isArray(submissions) && submissions.length > 0) {
                    setLastSubmission(submissions[submissions.length - 1]);
                }
            } catch (e) {
                console.error("Failed to parse submissions", e);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h1>
                    <p className="text-gray-600">
                        Your intake details were saved locally.
                    </p>
                </div>

                {lastSubmission ? (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                        <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold border-b pb-2">
                            <Database className="w-5 h-5 text-gray-500" />
                            Latest LocalStorage Submission Data:
                        </div>
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-white p-4 rounded border border-gray-100 overflow-x-auto shadow-sm">
                            {JSON.stringify(lastSubmission, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mb-8 p-4 bg-gray-50 rounded-lg border border-dashed">
                        No local storage data found for 'borderBridgeIntakeSubmissions'.
                    </div>
                )}

                <div className="text-center">
                    <Link 
                        to="/"
                        className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Submitted;