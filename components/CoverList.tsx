import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd';
import 'antd/dist/antd.css'

export type CoverListProps = {
  data: Array<{
      src: string;
      href: string;
      id: number;
    }>,
  paginator?: {
    paginatorChange: (page: number) => Promise<{data: any, total: number}>;
    total: number;
  }
}

const CoverListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  &>div {
    width: 33.333333%;
    padding: 0 12px;
    margin-bottom: 14px;
    img {
      width: 100%;
      object-fit: fill;
      transition: transform 0.3s ease 0s, box-shadow 0.5s ease 0s;
    }
    img:hover {
      box-shadow: rgba(0, 0, 0, 0.637) 0 0 20px 0px;
    }
  }
`

const Paginator = styled.div`
  text-align: center;
  padding-top: 20px;
`


const CoverList: React.FC<CoverListProps> = (props: CoverListProps) => {

  const [data, setData] = useState(props.data)
  const [total, setTotal] = useState(props.paginator?.total)

  const HandlePaginatorChange = async (e: number) => {
    const res = await props.paginator.paginatorChange(e);
    setData(res.data);
    setTotal(res.total);
  }

  return <>
    <CoverListContainer>
      {data.map(item =>  (
        <div key={item.id}>
          <Link href={item.href}>
            <a>
              <img src={item.src} />
            </a>
          </Link>
        </div>
      ))}
    </CoverListContainer>
    {props.paginator && (<Paginator><Pagination defaultCurrent={1} onChange={HandlePaginatorChange} pageSize={9} total={total} /></Paginator>)}
  </>
}

export default CoverList;