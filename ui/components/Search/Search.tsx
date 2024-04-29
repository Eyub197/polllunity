"use client"

import { PiMagnifyingGlassBold } from "react-icons/pi"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import styles from "@/ui/components/Search/Search.module.css"

/**
 * Search component for the UI.
 *
 * @param placeholder {string} - the placeholder text for the search bar
 * @returns {JSX.Element} - The search bar component
 */
const Search = ({ placeholder } : { placeholder: string }) => {
    // useSearchParams hook to get the current search params
    const searchParams = useSearchParams()
    // usePathname hook to get the current pathname
    const pathname = usePathname()
    // useRouter hook to get the router object
    const { replace } = useRouter()

    // useDebouncedCallback hook to create a debounced search function
    /**
     * Search function that is debounced.
     *
     * @param term {string} - the search term
     */
    const handleSearch = useDebouncedCallback((term : string) => {
        // create a new URLSearchParams object
        const params = new URLSearchParams(searchParams)
        // if search term is not empty
        if (term) {
            // set the query parameter
            params.set('query', term)
        } else {
            // else delete the query parameter
            params.delete('query')
        }
        // replace the current route with the new search params
        replace(`${pathname}?${params.toString()}`, {scroll : false})
        // log the search params as a string
        console.log(params.toString())
    }, 300)

    return (
        <div className={styles.search_container}>
            {/* label element for the search bar */}
            <label htmlFor="search">Търси</label>
            {/* input element for the search bar */}
            <input
                className={styles.search}
                onChange={e => handleSearch(e.target.value)}
                placeholder={placeholder}
                defaultValue={searchParams.get('query')?.toString()}
            />
            {/* magnifying glass icon element */}
            <PiMagnifyingGlassBold className={styles.magnifying_glass} />
        </div>
    )
}


export default Search