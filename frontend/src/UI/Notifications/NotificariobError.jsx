import erorr from '../../assets/icons/errorr.svg';
export default function NotificationError({ message }) {
    return (
        <div className='notification noti-error'>
            <img src={erorr} alt="Error" />
            <div >
                <h3>Error</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}