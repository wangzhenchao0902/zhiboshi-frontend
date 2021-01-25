import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd';
import 'antd/dist/antd.css'

export type NewsListProps = {
  data: Array<{
      title: string;
      created_at: string;
      id: number;
      href: string;
    }>
  paginator?: {
    paginatorChange: (page: number) => Promise<{data: any, total: number}>;
    total: number;
  }
}

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 20px 25px;
  &>div {
    overflow:hidden;
    &>div {
      margin-top: -1px;
      &>div {
        width: 100%;
        padding: 0 128px;
        height: 64px;
      }
    }
    a {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      border-top: 1px solid rgb(216, 216, 216);
      align-items: center;
      height: inherit;
      position: relative;
    }
    title {
      font-weight: bold;
      margin-left: 10px;
    }
    title:hover {
      color: red;
    }
    span {
      position: absolute;
      right: 10px;
    }
    span, title {
      display: block;
    }
  }
`

const Paginator = styled.div`
  text-align: center;
  padding-top: 20px;
`

const NewsList: React.FC<NewsListProps> = (props: NewsListProps) => {
  const [data, setData] = useState(props.data)
  const [total, setTotal] = useState(props.paginator?.total)
  const HandlePaginatorChange = async (e: number) => {
    const res = await props.paginator.paginatorChange(e);
    setData(res.data);
    setTotal(res.total);
  }

  return <>
    <NewsListContainer>
      <div>
        <div>
        {data.map(item =>  (
          <div key={item.id}>
            <Link href={item.href}>
              <a>
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5225" width="20" height="20"><path d="M511.706311 959.470311c-247.27171 0-447.725114-200.452381-447.725114-447.725114 0-247.270686 200.452381-447.725114 447.725114-447.725114s447.725114 200.453405 447.725114 447.725114C959.431425 759.01793 758.978021 959.470311 511.706311 959.470311zM434.974719 343.019401l-122.709763-61.35437 0 398.806985 122.709763 61.35437L434.974719 343.019401zM572.984956 281.665031l-122.709763 61.35437 0 398.806985 122.709763-61.35437L572.984956 281.665031zM711.147666 343.019401l-122.709763-61.35437 0 398.806985 122.709763 61.35437L711.147666 343.019401z" p-id="5226"></path></svg>
                <title>{item.title}</title>
                <span>{item.created_at}</span>
              </a>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </NewsListContainer>
    {props.paginator && (<Paginator><Pagination defaultCurrent={1} onChange={HandlePaginatorChange} pageSize={10} total={total} /></Paginator>)}
  </>
}

export default NewsList;