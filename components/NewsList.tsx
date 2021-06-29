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
  padding: 20px;
  background: #fafafa;
  border: 1px solid #f1f1f1;
  &>div {
    overflow:hidden;
    &>div {
      margin-top: -1px;
      &>div {
        width: 100%;
        padding: 0 20px;
        height: 64px;
      }
    }
    a {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      border-top: 1px dotted rgb(216, 216, 216);
      align-items: center;
      height: inherit;
      position: relative;
      color: #333;
      time{ color: #000; }
      &:hover{ color: #ee7500; }
      &:hover time{ color: #ee7500; }
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
              <a style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between',}}>
                <span>{item.title}</span>
                <time>{item.created_at}</time>
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