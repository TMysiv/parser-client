import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const App = () => {
    const [file, setFile] = useState<File | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [error, setError] = useState('');


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                responseType: 'blob',
            });
            const newFile = new File([response.data], 'newFile.xls', {
                type: response.headers['content-type'],
            });
            setNewFile(newFile);
        } catch (err) {
            setError('Error, try again')
        }
    };

    return (
        <div className={'container'}>
            <form onSubmit={handleSubmit} className={'form'}>
                <input type="file"  onChange={handleFileChange} />
                <button type="submit" className={'button'}>XLS</button>
            </form>
            {newFile && (
                <a href={URL.createObjectURL(newFile)} download="newFile.xls">
                    Download new file
                </a>
            )}
            {error && <h5>{error}</h5>}
        </div>
    );
}

export default App;
