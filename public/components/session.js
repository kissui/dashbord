'use strict';

export default {
	getFolderLists(){
		return JSON.parse(sessionStorage.getItem('SIDEBAR_LIST'));
	}
}