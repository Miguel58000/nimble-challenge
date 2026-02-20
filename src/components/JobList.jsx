import JobItem from './JobItem';

function JobList({ jobs, candidateData, onApply }) {
    if (!jobs || jobs.length === 0) {
        return <p>No job positions available at the moment.</p>;
    }

    return (
        <div className="job-list">
            <h2>Available Positions</h2>
            <div className="jobs-container">
                {jobs.map((job) => (
                    <JobItem
                        key={job.id}
                        job={job}
                        candidateData={candidateData}
                        onApply={onApply}
                    />
                ))}
            </div>
        </div>
    );
}

export default JobList;
