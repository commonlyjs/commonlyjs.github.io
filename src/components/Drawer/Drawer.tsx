import PropTypes from "prop-types"
import React, { ReactChild, ReactNode, useEffect, useRef, useState } from "react"


export interface Props {
    children?: ReactNode | ReactChild[]
    items: any
}

Drawer.propTypes = {
    children: PropTypes.node
}


function Drawer({ children, items }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    const ref3 = useRef<HTMLDivElement>(null)
    const [searchPhrase, setSearchPhrase] = useState<string>("")

    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement
        if (ref2.current && !ref2.current.contains(target) && ref3.current && !ref3.current.contains(target)) {
            const element = ref.current
            if (element) {
                element.classList.remove("opened")
                element.classList.add("closed")
            }
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClick = () => {
        const element = ref.current
        if (element) {
            element.classList.toggle("opened")
            element.classList.toggle("closed")
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const element: HTMLInputElement = event.target
        setSearchPhrase(element.value)
    }

    return (
        <>
            <div ref={ref} className="column static mobile-hidden drawer">
                <div className="sticky">
                    <div ref={ref2} className="card drawer-content" tabIndex={0}>
                        <div className="header">
                            <div className="input stretched">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="feather feather-search">
                                    <circle cx="11" cy="11" r="8"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                </svg>
                                <input id="search" type="text" autoComplete="off" onChange={handleSearch}/>
                                <label htmlFor="search">
                                    Search
                                </label>
                            </div>
                        </div>
                        <div className="content">
                            <div className="menu">
                                {Object.keys(items)
                                    .map((section) => {
                                        if (items[section].some((item: string) => item.includes(searchPhrase))) {
                                          return (
                                              <div className="item">
                                                <div className="header">
                                                  {section}
                                                </div>
                                                <div className="menu">
                                                  {items[section]
                                                      .filter((item: string) => item.includes(searchPhrase))
                                                      .map((item: string) => (
                                                          <a key={item} className="item"
                                                             href={`#${section.split("/")[1]}-${item}`}
                                                             onClick={handleClick}
                                                          >
                                                            {item}
                                                          </a>
                                                      ))}
                                                </div>
                                              </div>
                                          )
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={ref3} className="fab">
                <button className="action" tabIndex={-1}
                        onClick={handleClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className="feather feather-search">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

function useOutsideAlerter(ref: any) {
    /**
     * Alert if clicked on outside of element
     */

}

export default Drawer
