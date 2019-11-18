import './ProjectPagination.scss'

import React, { Fragment } from 'react'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

export default ({ pageCount, currentPage, menuItemActive }) =>
    <Location>
        {({ location }) => {
            let pageLoop = Array.from(Array(pageCount).keys())

            pageLoop = currentPage - 3 <= 0
                ? pageLoop.splice(0, 6)
                    : currentPage + 3 >= pageCount
                        ? pageLoop.splice(pageCount - 6, 6)
                        : pageLoop.splice(currentPage - 3, 6)

            const showFirst = !pageLoop.includes(1)
            const showLast = !pageLoop.includes(pageCount - 1)

            return <div className='project-pagination'>
                {showFirst &&
                    <Fragment>
                        <span
                            onClick={() => {
                                let url = location.href.replace(location.origin, '').replace(location.search, '')
                                const queryObj = qs.parse(location.search.replace('?', ''))
                                queryObj.page =  1
                                url += `?${qs.stringify(queryObj)}`

                                navigate(url, { state:{ menuItemActive} })
                            }}
                        >
                            1
                        </span>
                        <p>...</p>
                    </Fragment>
                }
                {pageLoop.map(page => {
                    return <span
                        key={page}
                        className={Number(currentPage) === (page + 1) ? 'active' : ''}
                        onClick={() => {
                            let url = location.href.replace(location.origin, '').replace(location.search, '')
                            const queryObj = qs.parse(location.search.replace('?', ''))
                            queryObj.page = page + 1
                            url += `?${qs.stringify(queryObj)}`

                            navigate(url, { state:{ menuItemActive} })

                        }}
                    >
                        {page + 1}
                    </span>
                })}
                {showLast &&
                    <Fragment>
                        <p>...</p>
                        <span
                            onClick={() => {
                                let url = location.href.replace(location.origin, '').replace(location.search, '')
                                const queryObj = qs.parse(location.search.replace('?', ''))
                                queryObj.page =  pageCount
                                url += `?${qs.stringify(queryObj)}`

                                navigate(url, { state: { menuItemActive} })

                            }}
                        >
                            {pageCount}
                        </span>
                    </Fragment>
                }
            </div>
        }}
    </Location>
