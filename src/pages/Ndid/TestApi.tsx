import { Spinner } from '@paljs/ui';
import { Card, CardBody } from '@paljs/ui/Card';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import apis from 'apis/TestApiCheck';
import Layout from 'Layouts';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import Error from '../ErrorCase/ErrorNotFoundCase';

interface Props {
    dataApi: any,
    isLoading: boolean
}
var loadingState = true

export default function TestApi({ dataApi, isLoading }: Props): ReactElement {
    const dataInputState = dataApi
    console.log(`====> input ${new Date()}`, dataInputState)
    console.log("====> Spinner ", isLoading)
    loadingState = isLoading;
    console.log("====> Control ", loadingState)

    return (
        <Layout title="TestApi">
            {loadingState ?
                <div style={{ position: 'relative' }}>
                    <h1>Content 1</h1>
                    <Spinner size="Large" status="Danger" />
                </div>
                :
                dataInputState ?
                    <Row>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <Card size="Tiny">
                                <header>Hello world</header>
                                <CardBody id="testapiScroll">
                                    {dataInputState.result_desc}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Error />
            }
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const isLoading = false
    const data = {
        "function_id": "T10001",
        "app_user": "demo",
        "app_password": "tq9jGm8tUr",
        "req_transaction_id": "{{$randomUUID}}",
        "state_name": "",
        "req_parameters": [
            {
                "k": "user_email",
                "v": "am-nuay2010@hotmail.com"
            },
            {
                "k": "user_pwd",
                "v": "25d55ad283aa400af464c76d713c07ad"
            },
            {
                "k": "type",
                "v": "app"
            }
        ],
        "extra_xml": ""
    }
    try {
        const dataApi = await apis.doserviceUpdateAppUser(data)
        console.log(dataApi)
        return {
            props: {
                dataApi,
                isLoading
            }
        }
    } catch (error) {
        return {
            props: {
                isLoading
            }
        }
    }
}
