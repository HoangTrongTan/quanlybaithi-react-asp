import { Modal } from "antd";
import UpFiles from "../../UpFiles";

function FormFix({state}) {
    const [open,setOpen] = state;
    const handleClose = () => {
        setOpen( prev => {
            prev[0] = false;
            return [...prev];
        } )
    }
    return ( <>
        <Modal
            title="Sửa thông tin"
            open={open[0]}
            onCancel={handleClose}
            footer={null}
        >
            <UpFiles Objfiles={open[2]} state={state}/>
        </Modal>
    </> );
}

export default FormFix;