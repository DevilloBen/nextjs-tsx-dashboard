import React, { useState } from 'react';
import Layout from 'Layouts';
import { Button, Card, CardBody, Col, Row } from '@paljs/ui';

const style = { marginBottom: '1.5rem' };

const Home = () => {
  const [stateHook, setStateHook] = useState(10)

  return (

    <Layout title="Home">
      <Row>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card size="Tiny">
            <header>Hello world</header>
            <CardBody id="testapiScroll">
              <Row middle="xs">
                <Col style={style} breakPoint={{ xs: true }}>
                  {stateHook}
                </Col>
                <Col style={style} breakPoint={{ xs: true }}>
                  <Button size="Small" onClick={() => setStateHook(stateHook + 1)}>+</Button>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default Home;
