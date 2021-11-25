import React from 'react';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Col, DatePicker, Form, Input, Layout, Row, Select } from 'antd';
import moment from 'moment';

const { Content } = Layout;

const { TextArea } = Input;

const { Option } = Select;

const AddTask: React.FC = () => {
	const router = useRouter();
	const PriorityArr = ['low', 'normal', 'high'];

	const onFinish = async (values: any) => {

		const res = await axios.post('http://localhost:3000/todo/add', values)

		if (res.status === 201) {
			router.push('/')
		}
	}

	const disabledDate = (current: any) => {
		return current && current < moment().endOf('day');
	}

	return (
		<Form
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<div className={styles.container}>
				<Layout style={{ padding: '24px 0' }}>
					<Content style={{ padding: '0 50px' }}>
						<div style={{ display: 'flex', justifyContent: 'center' }} >
							<h3>New task</h3>
						</div>
						<Row>
							<br />
							<Col span={12} offset={6}>
								<Form.Item
									name='title'
								>
									<Input placeholder='Add new task...' />
								</Form.Item>
							</Col>
							<br />
							<Col span={12} offset={6}>
								<p >Description</p>
								<Form.Item
									name='description'
								>
									<TextArea onChange={() => { }} />
								</Form.Item>
							</Col>
							<br />
							<Col span={6} offset={6} style={{ paddingRight: 20 }} >
								<p>Due date</p>
								<Form.Item
									name='date'
								>
									<DatePicker
										style={{ width: '100%' }}
										disabledDate={disabledDate}
										defaultPickerValue={moment().endOf('day')}
										defaultValue={moment().endOf('day')}
										format='YYYY-MM-DD'
									/>
								</Form.Item>
							</Col>
							<br />
							<Col span={6}>
								<p>Priority</p>
								<Form.Item
									name='priority'
									initialValue='normal'
								>
									<Select defaultValue="normal" style={{ width: '100%' }} >
										{PriorityArr.map((priority) => (
											<Option value={priority} >
												{priority}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={6} offset={9} >
								<Form.Item>
									<Button type="primary" block htmlType="submit">
										Add
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Content>
				</Layout>
			</div>
		</Form>
	)
}

export default AddTask;