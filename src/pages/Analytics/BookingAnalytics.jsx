import React from 'react';

const BookingAnalytics = () => {
    return (
        <div>
            <h3>Booking Analytics</h3>
            <iframe
                // src="https://lookerstudio.google.com/embed/reporting/9d2655aa-12df-48f2-9016-59553df8f0ae/page/0F36D"
                src="https://lookerstudio.google.com/embed/reporting/c4fb3024-6cb4-4e23-83b9-f6f6cba55061/page/0F36D"
                width="100%"
                height="650"
                style={{ border: 'none' }}
                title="Booking Analytics Report"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default BookingAnalytics;
