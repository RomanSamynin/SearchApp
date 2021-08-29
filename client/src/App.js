import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import axios from "axios";
import Item from './item';

const App = observer( () => {
	const [selectList, setSelectList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadinResult, setloadinResult] = useState(true);
	const [value_Table_3, setValue_Table_3] = useState("")
	const [value_Table_2, setValue_Table_2] = useState("")
	const [value_Table_1, setValue_Table_1] = useState("")
	const [result, setResut] = useState([])

	useEffect(() => {
		const $host = axios.create({
			baseURL: 'http://localhost:5000'
		})
	
		const getData = async () => {
			const {data} = await $host.get('/')
			return data
		}

		getData().then((data) => {
			setSelectList(data); setLoading(false); 
		})

	},[setSelectList])

	useEffect( () => {
		const $host = axios.create({
			baseURL: 'http://localhost:5000'
		})
	
		const getResult = async (response) => {
			const {data} = await $host.post('/', response)
			return data
		}
		getResult({table_1: value_Table_1, table_2: value_Table_2, table_3: value_Table_3})
		.then(async (data) => await setResut(data), setloadinResult(false))
		
	}, [value_Table_1,value_Table_2,value_Table_3, setValue_Table_1, setValue_Table_2, setValue_Table_3,])

	
	let handleChange_Table_3 = event => {
		setValue_Table_3(event.target.value)
	}

	let handleChange_Table_2 = event => {
		setValue_Table_2(event.target.value)
	}

	let handleChange_Table_1 = event => {
		setValue_Table_1(event.target.value)
	}

// console.log(value_Table_1, value_Table_2, value_Table_3, result)
	
	return (
		<div>{loading ?
			<div>Загрузка данных ...</div>
			:
			<div>
				<select value={value_Table_1} onChange={handleChange_Table_1}>
					<option  value={""}></option>
					{selectList[0].map(data => 
						<option key={data.ID} value={data.ID}>{data.NAME}</option>
					)}
				</select>
				<select value={value_Table_2} onChange={handleChange_Table_2}>
					<option  value={""}></option>
					{selectList[1].map(data => 
						<option key={data.ID} value={data.ID}>{data.NAME}</option>
					)}
				</select>
				<select value={value_Table_3} onChange={handleChange_Table_3}>
					<option  value={""}></option>
					{selectList[2].map(data => 
						<option key={data.id} value={data.id}>{data.name_ru}</option>
					)}
				</select>
				<div>
					{!result.length ?
						<div> Данные не найдены..</div>
						:
						<Item loadinResult={loadinResult} result={result}></Item>
					}
				</div>
			</div>
			}
		</div>
	)
})

export default App
