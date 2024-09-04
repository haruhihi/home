import { ProFormSelect } from "@ant-design/pro-components";
import { TOptions } from "@dtos/api";
import { EPlan, EUser } from "@dtos/db";
import { Button, Modal, Table } from "antd";
import { FormInstance } from "antd/lib";
import React, { useState } from "react";

interface Props {
    specialWorkerOptions: TOptions;
    form: FormInstance;
}

const App = ({specialWorkerOptions, form}: Props) => {
    const [open, setOpen] = useState(false);
    const [specialWorkers, setSpecialWorkers] = useState<{label:string; value:string|number; specialwRorker?: string;}[]>([]);
  
    const hideModal = () => {
        setOpen(false);
    };

    const showSpecialWorkers = () => {
        setOpen(true);
        const workers = form.getFieldsValue().SpecialWorkers || [];
        setSpecialWorkers(specialWorkerOptions.filter(v => workers.includes(v.value)) ) 
    }
    console.log('specialWorkers',specialWorkers)
    return <>
     <ProFormSelect
          width="md"
          name={EPlan.SpecialWorkers.Name}
          label={EPlan.SpecialWorkers.label}
          options={specialWorkerOptions}
          mode="multiple"
          extra={ <Button type="link" style={{marginLeft:-15}} onClick={showSpecialWorkers}>校验资质</Button>}
        />
        <Modal
            title="校验人员资质"
            open={open}
            width={1000}
            onCancel={hideModal}
            footer={[
                <Button type="primary" onClick={hideModal} key="confirm">确认</Button>
            ]}
        >
            <Table columns={[ 
                {
                    title: EPlan.SpecialWorkers.label,
                    width: 80,
                    dataIndex: "label",
                    key: "label",
                },
                {
                    title: "特种作业人员资质",
                    width: 80,
                    dataIndex: "specialWork",
                    key: "specialWork",
                },
            ]} dataSource={specialWorkers}/>
        </Modal>
    </>  
}

export default App;