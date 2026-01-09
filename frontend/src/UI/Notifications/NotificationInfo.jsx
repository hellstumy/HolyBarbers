import info from "../../assets/icons/info.svg";
export default function NotificationInfo({ message }) {
    return (
        <div className='notification noti-info'>
            <img src={info} alt="Info" />
            <div >
                <h3>Information</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}