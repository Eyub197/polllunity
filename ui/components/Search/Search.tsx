"use client"

import { PiMagnifyingGlassBold } from "react-icons/pi"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import styles from "@/ui/components/Search/Search.module.css"

const Search = ({ placeholder } : { placeholder: string }) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
  
    const handleSearch = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams)
        term ? params.set('query', term) : params.delete('query')
        replace(`${pathname}?${params.toString()}`,{scroll : false})
        console.log(params.toString())
    }, 300) 

    return(
        <div className={styles.search_container}>
            <label htmlFor="search">Търси</label>
            <input
            className={styles.search}
            onChange={e => handleSearch(e.target.value)} 
            placeholder={placeholder}
            defaultValue={searchParams.get('query')?.toString()}
            />
            <PiMagnifyingGlassBold className={styles.magnifying_glass} />
        </div>
    )

}

export default Search