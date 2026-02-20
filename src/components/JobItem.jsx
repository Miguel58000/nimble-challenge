import { useState } from 'react';

function JobItem({ job, candidateData, onApply }) {
    const [repoUrl, setRepoUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!repoUrl) {
            setStatus('error');
            setMessage('Please enter your GitHub repository URL');
            return;
        }

        setIsSubmitting(true);
        setStatus(null);
        setMessage('');

        try {
            const applicationData = {
                uuid: candidateData.uuid,
                jobId: job.id,
                candidateId: candidateData.candidateId,
                applicationId: candidateData.applicationId,
                repoUrl: repoUrl,
            };


            console.log('Final data to be sent:', applicationData);
            await onApply(applicationData);

            setStatus('success');
            setMessage('Application submitted successfully!');
        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to submit application');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="job-item">
            <h3>{job.title}</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="url"
                        placeholder="GitHub Repo URL"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        disabled={isSubmitting || status === 'success'}
                    />
                    <button type="submit" disabled={isSubmitting || status === 'success' || !repoUrl.trim()}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                </div>
                {message && (
                    <p className={`status-message ${status}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default JobItem;
