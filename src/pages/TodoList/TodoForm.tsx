import { Button } from '@paljs/ui/Button';
import { Card, CardBody } from '@paljs/ui/Card';
import Col from '@paljs/ui/Col';
import { InputGroup } from '@paljs/ui/Input';
import { List, ListItem } from '@paljs/ui/List';
import Row from '@paljs/ui/Row';
import apis from 'apis/cmsApi';
import Layout from 'Layouts';
import { todoListModels } from 'Models/todolist-models';
import { GetStaticProps } from 'next';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Error from '../ErrorCase/ErrorNotFoundCase';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

interface Props {
    dataApi: todoListModels[],
    summaryAmoutApi: number
}

export default function TodoForm({ dataApi,summaryAmoutApi }: Props): ReactElement {
    const [todoListState, setTodoListState] = useState({
        id: "",
        title: "",
        expList: "",
        importance: "",
        amount: 0
    })
    const [stateDateApi, setStateDateApi] = useState(dataApi)
    const [summaryAmout, setSummaryAmout] = useState(summaryAmoutApi)
    //console.log(summaryAmoutApi)

    async function getSummaryAmout(data: todoListModels[]) {
        var sum = 0
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            sum += element.amount
        }
        return sum
    }

    async function getTodoList() {
        try {
            const res: any = await apis.doserviceGetApi()
            setStateDateApi(res)
            const amountInput: any = await getSummaryAmout(res)
            setSummaryAmout(amountInput)
        } catch (error) {
            console.log("Error =>", error);
        }
    }

    async function postApi(data: any) {
        var apiData = data
        var dateId = +stateDateApi[stateDateApi.length - 1].id + 1
        apiData.id = '' + dateId
        try {
            //console.log(apiData)
            await apis.doservicePostApi(apiData)
            setTodoListState(
                {
                    id: "",
                    title: "",
                    expList: "",
                    importance: "",
                    amount: 0
                }
            )
            //console.log(res)
            await getTodoList()
        } catch (error) {
            console.log("Error =>", error);
        }

    }

    return (
        <Layout title="TodoList">
            {
                dataApi ?
                    <Row>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <Card>
                                <header>Add TodoList {summaryAmout}</header>
                                <CardBody>
                                    <div style={{ marginBottom: "10px" }} />
                                    <Input fullWidth size="Medium">
                                        <input value={todoListState.title}
                                            onChange={(e) => setTodoListState({ ...todoListState, title: e.target.value })}
                                            type="text"
                                            placeholder="Todo Title" />
                                    </Input>

                                    <Input fullWidth size="Medium">
                                        <input value={todoListState.expList}
                                            onChange={(e) => setTodoListState({ ...todoListState, expList: e.target.value })}
                                            type="text"
                                            placeholder="ExpList" />
                                    </Input>

                                    <Input fullWidth size="Medium">
                                        <input value={todoListState.importance}
                                            onChange={(e) => setTodoListState({ ...todoListState, importance: e.target.value })}
                                            type="text"
                                            placeholder="Importance" />
                                    </Input>

                                    <Input fullWidth size="Medium">
                                        <input
                                            value={todoListState.amount}
                                            onChange={(e) => setTodoListState({ ...todoListState, amount: +e.target.value })}
                                            type="text"
                                            placeholder="Amount" />
                                    </Input>

                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <div >
                                            <Button fullWidth appearance="hero" status={'Success'} onClick={() => postApi(todoListState)}>
                                                +
                                            </Button>
                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <Card size="Small">
                                <header>TodoList</header>
                                <List  >
                                    {stateDateApi.map((data) => (
                                        <ListItem key={data.id} style={{ justifyContent: "space-between" }}>
                                            <span>{data.importance}</span>
                                            <span>{data.title}</span>
                                            <span>{data.expList}</span>
                                            <span>{data.amount}</span>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Error />
            }
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    try {
        const dataApi: any = await apis.doserviceGetApi()
        //console.log("Api ===> ", dataApi)
        const summaryAmoutApi = apis.getSummaryAmout(dataApi)
        //console.log("summaryAmoutApi ===> ", summaryAmoutApi)
        return {
            props: {
                dataApi,
                summaryAmoutApi
            }
        }
    } catch (error) {
        return {
            props: {
            }
        }
    }
}
