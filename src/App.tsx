import {FC, useState} from 'react';
import axios from 'axios';
import './style.css'
import Header from "./components/Header/Header";
import content from './images/content_copy.png';
import download from './images/save_alt (1).png';
import close from './images/close.png';

const App: FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [extension, setExtension] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                responseType: 'blob',
                headers: {Authorization: extension}
            });
            console.log(response)
            const newFile = new File([response.data], 'newFile', {
                type: response.headers['content-type'],
            });
            setNewFile(newFile);
            console.log(newFile)

            if (response.headers['content-type'].includes('pdf')) {
                setExtension('newFile.pdf')
            } else {
                setExtension('newFile.xls')
            }

        } catch (err) {
            setError('Error, try again');
            setNewFile(null);
        }
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={'container'}>
            <Header togglePopup={togglePopup}/>
            <div className={'file'}>
                <p>1. Attach a monthly report you want to edit</p>
                <input type="file" onChange={handleFileChange} id='file-input'/>
                <label htmlFor='file-input'>
                    <div className={'uploadFile'}>
                        <img src={content} alt="content"/>
                    </div>
                </label>
            </div>
            <div className={'typeOfFiles'}>
                <p>2. Select the format you need</p>
                <div className={'buttons'}>
                    <button type="submit" className={'button xls'} onClick={() => handleSubmit('xls')}>
                        Exsel format
                    </button>
                    <button type="submit" className={'button pdf'} onClick={() => handleSubmit('pdf')}>
                        PDF format
                    </button>
                </div>
            </div>
            <div className={'downloadFile'}>
                <p>3. Download the result</p>
                <button className={newFile ? 'newFile' : 'noFile'} disabled={!newFile}>
                    <img src={download} alt="Download"/>
                </button>
                {newFile && (
                    <a href={URL.createObjectURL(newFile)}
                       download={extension}>
                        <div className={'result'}>
                            <img src={download} alt="Download"/>
                        </div>
                    </a>
                )}
            </div>
            {error && <h5 className={'error'}>{error}</h5>}
            {isOpen && (
                <div className={'popup-container'}>
                    <div className={'popup-content'}>
                        <div className={'popup-title'}>
                            <div>How to use it</div>
                            <button onClick={togglePopup} className={'close'}>
                                <img src={close} alt="close"/>
                            </button>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est laborum. </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
