import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@material-tailwind/react";

type SearchBarProps = {
    containerClassNames?: string,
    inputClassNames?: string,
    setSearchTerm: (searchTerm: string) => void,
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
}

const SearchBarComponent = ({ containerClassNames, inputClassNames, setSearchTerm, onSubmit }: SearchBarProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (<form className={`w-full md:w-72 ${containerClassNames}`} onSubmit={onSubmit}>
        <Input label="Buscar" className={inputClassNames} onChange={handleSearchChange}
            icon={
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
                </button>
            } />
    </form>);
}

export default SearchBarComponent;