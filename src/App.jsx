import { useState, useEffect } from 'react';
import { getCandidateByEmail, getJobsList, applyToJob } from './services/api';
import JobList from './components/JobList';
import './App.css';

function App() {
    const [email] = useState('miguelrodriguezips36@gmail.com');
    const [candidateData, setCandidateData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initApp = async () => {
            try {
                setLoading(true);
                // Step 2 & 3: Fetch candidate and jobs
                const [candidate, jobsList] = await Promise.all([
                    getCandidateByEmail(email),
                    getJobsList()
                ]);

                setCandidateData(candidate);
                setJobs(jobsList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initApp();
    }, [email]);

    const handleApply = async (applicationData) => {
        return await applyToJob(applicationData);
    };

    if (loading) return <div className="loading">Cargando datos...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nimble Gravity Challenge</h1>
                {candidateData && (
                    <p className="welcome">
                        Bienvenido, <strong>{candidateData.firstName} {candidateData.lastName}</strong>
                    </p>
                )}
            </header>

            <main>
                <JobList
                    jobs={jobs}
                    candidateData={candidateData}
                    onApply={handleApply}
                />
            </main>

            <footer>
                <p>© 2026 Nimble Gravity Tech Challenge</p>
            </footer>
        </div>
    );
}

export default App;
