import React, {useState} from 'react';
import axios from 'axios';
import './style.css'

const App = () => {
    const [file, setFile] = useState<File | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [extension, setExtension] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setError(null)
        }
    };

    const handleSubmit = async (extension: string) => {
        if (!file) {
            return;
        }
        setIsActive(false);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                responseType: 'blob',
                headers: {Authorization: extension}
            });
                const newFile = new File([response.data], 'newFile.xls', {
                    type: response.headers['content-type'],
                });
            setNewFile(newFile);

            if (response.headers['content-type'].includes('ls')){
                setExtension('newFile.xls')
            }else {
                setExtension('newFile.pdf')
            }

        } catch (err) {
            setError('Error, try again')
        }
    };

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={'container'}>
                <input type="file"  onChange={handleFileChange} />
            <div className={'buttons'}>
                <button type="submit" className={'button xls'} onClick={() => handleSubmit('xls')}>XLS</button>
                <button type="submit" className={'button pdf'} onClick={() => handleSubmit('pdf')}>PDF</button>
            </div>
            {newFile && (
                <a href={URL.createObjectURL(newFile)}
                   download={extension}
                   className={isActive ? 'active' : ''}
                   onClick={handleClick}>
                    Download new file
                </a>
            )}
            {error && <h5 className={'error'}>{error}</h5>}
        </div>
    );
}

export default App;
