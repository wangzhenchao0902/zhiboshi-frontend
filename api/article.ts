import {domain} from './proxy'

const handleUrlWithParams = (url: string, params: any): string => {
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }
  }
  return url
}

export async function queryCase(params?: any): Promise<Response> {
  const url = domain.concat('/api/article/case');
  return fetch(handleUrlWithParams(url, params))
}

export async function queryNews(params?: any): Promise<Response> {
  const url = domain.concat('/api/article/news');
  return fetch(handleUrlWithParams(url, params))
}

export async function showArticle(id: string | string[]): Promise<Response> {
  const url = domain.concat('/api/article/'.concat(id.toString()));
  return fetch(url)
}

export async function showAbout(path: string): Promise<Response> {
  const url = domain.concat('/api/article/'.concat(path));
  return fetch(url)
}

export async function allIds(category_id: number): Promise<Response> {
  const url = domain.concat('/api/article/allIds?category_id='.concat(category_id.toString()));
  return fetch(url)
}

export async function getTagCase(params?: any): Promise<Response> {
  const url = domain.concat('/api/article/case');
  return fetch(handleUrlWithParams(url, params))
}