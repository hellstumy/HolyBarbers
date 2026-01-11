import useStore from "../../../store/store.js";
import TableUI from "../../../UI/Sheets";
import edit from "../../../assets/icons/edit.svg"
import delbutton from '../../../assets/icons/delete.svg'
import MyModal from '../../../UI/Modal.jsx'
import TextInput from "../../../UI/Inputs/TextInput";
import Select from "../../../UI/Inputs/Select";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton";

export default function AdminAppointment(){
    const {openModal} = useStore()

    return (
      <div>
        <MyModal Tittle={"Редактировать запись"}>
          <Select>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </Select>
          <Select>
            <option value="1">Барбен</option>
            <option value="2">Барбер2</option>
            <option value="3">Барбер3</option>
            <option value="4">Барбер4</option>
          </Select>
          <TextInput placeholder={"Имя клиента"} />
          <TextInput placeholder={"Номер Клиента"} />
          <TextInput type="date" placeholder={"Дата"} />
          <TextInput type="time" placeholder={"Время"} />
          <PrimaryButton>Save</PrimaryButton>
        </MyModal>
        <div className="admin-appointment">
          <div className="admin-tittle">
            <h3>Управление услугами</h3>
            <p>Всего записей: 1</p>
          </div>
          <TableUI>
            <div className="table-tittle">
              <div>Услуга</div>
              <div>Имя Барбера</div>
              <div>Имя Клиента</div>
              <div>Номер Клиента</div>
              <div>Дата:Время</div>
              <div>Управление</div>
            </div>
            <div>
              <div>Стрижка</div>
              <div>Анатолий</div>
              <div>Дмитрий</div>
              <div>(883) 414 200</div>
              <div>14-01-2026 16:00</div>
              <div className="service-buttons">
                <button onClick={openModal}>
                  <img src={edit} alt="" />
                </button>

                <button>
                  <img src={delbutton} alt="" />
                </button>
              </div>
            </div>
          </TableUI>
        </div>
      </div>
    );
}