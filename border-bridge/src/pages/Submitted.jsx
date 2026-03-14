import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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

    const caseId = lastSubmission?.id || "CS-2024-NEW";
    const caseUrl = `${window.location.origin}/case/${caseId}`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h1>
                    <p className="text-gray-600">
                        {lastSubmission?.fullName ? `${lastSubmission.fullName}'s` : "The"} intake details were saved locally.
                    </p>
                </div>

                {/* QR Code Section */}
                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Case File Access</h2>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                        <QRCodeSVG 
                            value={caseUrl} 
                            size={160} 
                            level={"H"}
                            includeMargin={false}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mb-4 max-w-sm">
                        Scan this QR code with any mobile device to instantly access this person's secure Case File.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">ID: {caseId}</span>
                        <Link 
                            to={`/case/${caseId}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                            Open File <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link 
                        to="/"
                        className="inline-flex justify-center w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Submitted;