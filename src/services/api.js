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
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error submitting application');
    }

    return response.json();
};
