import { Checkbox, Col, Row } from "antd";

const bodyParts = ['face total', 'moustache', 'barseta', 'mjeker', 'barku', 'vithe', 'fundshpine', 'hands', '1/2 arms', 'arms', 'armpits', 'legs', '1/2 legs', 'bikini', 'back', 'total body'];

function LaserSession({ defaultValues, onChangeInfo }: { defaultValues: any, onChangeInfo: any }) {

    const defaultCheckedValues = bodyParts.filter(part => defaultValues[part]);

    return (
        <div>
            <p>Select the body parts to apply the laser</p>
            <Checkbox.Group
                style={{ width: '100%' }}
                value={defaultCheckedValues}
                onChange={(checkedValues) => {
                    bodyParts.forEach(part => {
                        onChangeInfo(part, checkedValues.includes(part));
                    });
                }}
            >
                <Row>
                    {bodyParts.map((option, index) => (
                        <Col span={8} key={index}>
                            <Checkbox value={option}>
                                {option !== 'abs' ? option : "abdominal area"}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    );
}

export default LaserSession;
