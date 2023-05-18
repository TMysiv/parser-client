import {FC} from 'react';
import './style.css'
import logo from '../../images/Logo.png'
import help from '../../images/help_outline.png'

interface IProps {
    togglePopup: any
}
const Header: FC<IProps> = ({togglePopup}) => {
    return (
        <div className={'header'}>
            <div className={'logo'}>
                <img src={logo} alt="Logo"/>
            </div>
            <p className={'title'}>Edit a monthly report in a few clicks</p>
            <button className={'help'} onClick={togglePopup}>
                <img src={help} alt="Help"/>
            </button>
        </div>
    );
};

export default Header;
