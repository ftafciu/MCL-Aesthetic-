import { Checkbox, Col, Row } from "antd";

const RadioOptions = [
    { label: "cleaning", value: 'cleaning' },
    { label: 'mesotherapy', value: 'mesotherapy' },
    { label: 'dermopen', value: 'dermopen' },
    { label: 'fillers', value: 'fillers' },
    { label: 'botox', value: 'botox' }
];

function HeadSession({ defaultValues, onChangeInfo }: { defaultValues: any, onChangeInfo: any }) {
    const defaultCheckedValues = RadioOptions
        .filter(option => defaultValues[option.value])
        .map(option => option.value);

    return (
        <div>
            <p>Select the type of face treatment</p>
            <Checkbox.Group 
                value={defaultCheckedValues}
                onChange={(checkedValues) => {
                    RadioOptions.forEach(option => {
                        onChangeInfo(option.value, checkedValues.includes(option.value));
                    });
                }}
            >
                <Row>
                    {RadioOptions.map((options, index) => (
                        <Col span={8} key={index}>
                            <Checkbox value={options.value}>
                                {options.label}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    );
}

export default HeadSession;
