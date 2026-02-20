const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching candidate data');
    }
    return response.json();
};

export const getJobsList = async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) {
        throw new Error('Error fetching jobs list');
    }
    return response.json();
};

export const applyToJob = async (applicationData) => {
    console.log('Submitting application:', applicationData);
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
        let errorMessage = 'Error submitting application';
        try {
            const errorData = await response.json();

            // Handle specific "details" structure from Zod/API
            if (errorData.details && errorData.details.fieldErrors) {
                const fields = Object.keys(errorData.details.fieldErrors);
                if (fields.length > 0) {
                    const firstField = fields[0];
                    const issues = errorData.details.fieldErrors[firstField];
                    errorMessage = `${firstField}: ${issues.join(', ')}`;
                }
            } else {
                errorMessage = errorData.message || errorData.error || JSON.stringify(errorData) || errorMessage;
            }
        } catch (e) {
            try {
                const textError = await response.text();
                errorMessage = textError || errorMessage;
            } catch (textErr) { }
        }
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
    }


    return response.json();
};

