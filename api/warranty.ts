import {domain} from './proxy'
export async function queryWarranties(phone: string): Promise<Response> {
  const url = domain.concat('/api/warranty?phone='.concat(phone));
  return fetch(url)
}

export async function registerWarranties(params: {name: string, phone: string, sn: string}): Promise<Response> {
  const url = domain.concat('/api/warranty');
  return fetch(url, {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}