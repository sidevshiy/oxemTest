import server from '@/api/http';


export async function loadUsers(){
	let { data } = await server.get('manyData');

	return data;
}
