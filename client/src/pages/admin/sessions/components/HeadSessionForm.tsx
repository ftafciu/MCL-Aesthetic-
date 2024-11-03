import { Radio } from "antd";

const RadioOptions = [
    { label: "cleaning", value: 'cleaning' },
    { label: 'mesotherapy', value: 'mesotherapy' },
    { label: 'dermopen', value: 'dermopen' },
    { label: 'fillers', value: 'fillers'},
    { label: 'botox', value: 'botox' }
]

function HeadSession() {
    return (
        <div>
            <p>Select the type of face treatment</p>
            <Radio.Group options={RadioOptions}/>
        </div>
    );
}

export default HeadSession;