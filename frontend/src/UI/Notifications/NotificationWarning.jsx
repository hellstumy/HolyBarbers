import warning from "../../assets/icons/warning.svg";
export default function NotificationWarning({ message }) {
    return (
        <div className='notification noti-warning'>
            <img src={warning} alt="Warning" />
            <div >
                <h3>Warning</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}