import {domain} from './proxy'
export async function queryWarranties(phone: string): Promise<Response> {
    const url = domain.concat('/api/warranty?phone='.concat(phone));
    return fetch(url)
  }