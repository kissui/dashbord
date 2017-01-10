'use strict';
import http from './http';
export default {
	getFolderList (cb) {
		http.get('/api/?c=table.folder&ac=tree')
			.then(data => (data.data))
			.then((data) => {
				if (data.errcode === 10000 && data.data) {
					cb(data.data);
					sessionStorage.setItem('SIDEBAR_LIST', JSON.stringify(data.data))
				} else {
					cb(data)
				}
			})
			.catch(data => {
				cb(data);
			})
	}
}