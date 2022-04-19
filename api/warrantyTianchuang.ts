import {domain} from './proxy'
export async function queryWarranties(phone: string): Promise<Response> {
  const url = domain.concat('/api/warrantytianchuang?phone='.concat(phone));
  return fetch(url)
}

export async function registerWarrantyTianchuangs(params: {name: string, phone: string, sn: string}): Promise<Response> {
  const url = domain.concat('/api/warrantytianchuang');
  return fetch(url, {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}