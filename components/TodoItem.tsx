import React from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Layout, Modal, Row, Select } from 'antd';
import { Collapse } from 'react-collapse';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';

const { Option } = Select;

interface TProps {
	data: any;
	toggleDone: (value: any) => void;
	onRemove: (id: number) => void;
}

const TodoItem: React.FC<TProps> = ({ data, toggleDone, onRemove }) => {

	const router = useRouter();

	const [isDetail, setIsDetail] = React.useState(false);
	const [dataView, setDataView] = React.useState(data);

	const PriorityArr = ['low', 'normal', 'high'];

	const { id, title, description, done, priority, date } = dataView;

	const onDetail = () => {
		setIsDetail(!isDetail);
	}

	const onFinish = async ( values: any ) => {
		values.done = done;
		const res = await axios.put(`http://localhost:3000/todo/${id}`, values);

		if (res.status === 200) {
			setDataView(values);
		}
	}

	const disabledDate = (current: any) => {
		return current && current < moment().endOf('day');
	}



	return (
		<Card>
			<div style={{ display: 'flex', flexDirection: 'row' }} >
				<Checkbox checked={done} onChange={() => toggleDone(data)} />
				<div style={{ paddingLeft: 20, width: '70%', textAlign: 'left' }} >{title}</div>
				<div>
					<Button type="primary" onClick={onDetail} >
						Detail
					</Button>
					<Button type="primary" danger onClick={() => onRemove(id)} >
						Remove
					</Button>
				</div>
			</div>
			<Collapse isOpened={isDetail}>
				<Form
					initialValues={{ data }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Layout style={{ padding: '24px 0' }}>
						<div style={{ padding: '0 50px', textAlign: 'left' }}>
							<Row>
								<br />
								<Col span={24}>
									<Form.Item
										name='title'
										initialValue={title}
									>
										<Input placeholder='Add new task...' />
									</Form.Item>
								</Col>
								<br />
								<Col span={24}>
									<p >Description</p>
									<Form.Item
										name='description'
										initialValue={description}
									>
										<TextArea />
									</Form.Item>
								</Col>
								<br />
								<Col span={12} style={{ paddingRight: 20 }} >
									<p>Due date</p>
									<Form.Item
										name='date'
										initialValue={moment(date, 'YYYY-MM-DD')}
									>
										<DatePicker style={{ width: '100%' }} disabledDate={disabledDate}  />
									</Form.Item>
								</Col>
								<br />
								<Col span={12}>
									<p>Priority</p>
									<Form.Item
										name='priority'
										initialValue={priority}
									>
										<Select style={{ width: '100%' }} >
											{PriorityArr.map((priority) => (
												<Option value={priority} >
													{priority}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12} offset={6} >
									<Form.Item>
										<Button type="primary" block htmlType="submit">
											Update
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</div>
					</Layout>
				</Form>
			</Collapse>
		</Card>
	)
}

export default TodoItem;