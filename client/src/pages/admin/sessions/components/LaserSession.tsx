import { Checkbox, Col, Row } from "antd";

function LaserSession() {

    const onChange = (checkedValues: any) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <div>
            <p>Select the body parts to apply the laser</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value="face">Face</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="arms">Arms</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="armpits">Armpits</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="legs">Legs</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="bikini">Bikini</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="back">Back</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="abs">Abdominal area</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
        </div>
    );
}

export default LaserSession;