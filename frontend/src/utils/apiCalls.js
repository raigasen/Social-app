import axiosApiInstance from './axios';
import { useEffect, useRef, useState } from 'react';

export const BE_URL = 'http://localhost:4000';

export const useAxios = (url = null, param = null, method = 'POST') => {
	// const isCurrent = useRef(true);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');
	const [data, setData] = useState('');
	const operation = async (url, param = null, method = 'POST') => {
		if (method === 'GET') {
			await axiosApiInstance
				.get(`http://localhost:4000/${url}`, param)
				.then((response) => {
					// if (isCurrent.current)
					setData(response.data);
				})
				.catch((err) => {
					setError(err?.response?.data?.error);
					setLoading(false);
				});
		} else
			await axiosApiInstance
				.post(`http://localhost:4000/${url}`, param)
				.then((response) => {
					setData(response.data);
				})
				.catch((err) => {
					setError(err?.response?.data?.error);
					setLoading(false);
				});
	};

	useEffect(() => {
		url != null && operation(url, param, method);
	}, [loading]);

	return { data, error, setError, loading, operation, setLoading };
};

export function useAxiosGet(url, param) {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');
	const [data, setData] = useState('');

	const operation = async (url, param = null) => {
		await axiosApiInstance
			.get(`http://localhost:4000/${url}`, param)
			.then((response) => {
				// if (isCurrent.current)
				setData(response.data);
			})
			.catch((err) => {
				setError(err?.response?.data?.error);
				setLoading(false);
			});
	};

	useEffect(() => {
		operation(url, param);
	}, [loading]);

	return { error, data, loading, setLoading, setError, setData };
}
